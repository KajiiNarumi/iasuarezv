let currentHandle = "";
let currentDid = "";
let allPosts = [];
let loggedInHandle = null;

const userInput = document.getElementById('userInput');
const goBtn = document.getElementById('goBtn');
const profileDiv = document.getElementById('profile');
const albumsDiv = document.getElementById('albums');
const postsContainer = document.getElementById('postsContainer');
const userModal = document.getElementById('userModal');
const modalTitle = document.getElementById('modalTitle');
const userList = document.getElementById('userList');
const navMenuModal = document.getElementById('navMenuModal');
const navMe = document.getElementById('navMe');

// ==================== MENÚ DE NAVEGACIÓN MODAL Y "ME" ====================
function openNavMenu() {
    navMenuModal.style.display = "flex";
}

function closeNavMenu() {
    navMenuModal.style.display = "none";
}

function loadMe() {
    if (loggedInHandle) {
        userInput.value = loggedInHandle;
        loadUser(loggedInHandle, 'push');
    }
}

// ==================== LÓGICA DE URL CORTA Y SESIÓN EN RED ====================
function getUrlParams() {
    const search = window.location.search.substring(1);
    const params = new URLSearchParams(search);

    let handle = params.get('handle') || params.get('usuario');
    let rkey = params.get('rkey');

    if (!handle && search) {
        const firstPart = search.split('&')[0];
        if (firstPart && !firstPart.includes('=')) {
            handle = decodeURIComponent(firstPart);
        }
    }

    return { handle: handle || "", rkey };
}

function checkSession() {
    const savedSession = localStorage.getItem('atprotoSession');
    if (savedSession) {
        try {
            const sessionData = JSON.parse(savedSession);
            loggedInHandle = sessionData.handle || sessionData.session?.handle;
            if (loggedInHandle) {
                navMe.style.display = "inline";
            }
        } catch (e) {
            console.error("Error leyendo sesión:", e);
        }
    }
}

function showEmptyState() {
    profileDiv.innerHTML = "";
    albumsDiv.innerHTML = "";
    postsContainer.innerHTML = `<p style="text-align:center; padding:80px; color:#666;">Busca un usuario por Handle, @ o URL para ver sus escritos.</p>`;
    userInput.value = "";
}

// ==================== NAVEGACIÓN Y HISTORIAL DEL SISTEMA ====================
window.onpopstate = (event) => {
    const { handle } = getUrlParams();

    if (handle) {
        userInput.value = handle;
        loadUser(handle, 'none');
    } else {
        if (loggedInHandle) {
            userInput.value = loggedInHandle;
            loadUser(loggedInHandle, 'none');
        } else {
            showEmptyState();
        }
    }
};

goBtn.onclick = () => loadUser(userInput.value, 'push');
userInput.addEventListener('keypress', e => {
    if (e.key === 'Enter') loadUser(userInput.value, 'push');
});

window.onload = () => {
    checkSession();

    const { handle } = getUrlParams();
    const sharedUser = localStorage.getItem('alba_shared_user');

    if (handle) {
        userInput.value = handle;
        loadUser(handle, 'none');
    } else if (sharedUser) {
        userInput.value = sharedUser;
        loadUser(sharedUser, 'replace');
    } else if (loggedInHandle) {
        userInput.value = loggedInHandle;
        loadUser(loggedInHandle, 'replace');
    } else {
        showEmptyState();
    }
};

// ==================== CARGAR DATOS DE ACTOR AT PROTOCOL ====================
async function loadUser(rawInput, historyMode = 'push') {
    if (!rawInput) return;

    let handle = rawInput.trim();
    if (handle.startsWith('@')) handle = handle.substring(1);
    if (handle.includes('bsky.app/profile/')) {
        handle = handle.split('bsky.app/profile/')[1].split('/')[0].split('?')[0];
    }
    if (!handle) return;

    currentHandle = handle;
    localStorage.setItem('alba_shared_user', handle);

    if (historyMode === 'push') {
        const { rkey } = getUrlParams();
        let newUrl = `?${handle}`;
        if(rkey) newUrl += `&rkey=${rkey}`;
        history.pushState({ handle }, "", newUrl);
    } else if (historyMode === 'replace') {
        const { rkey } = getUrlParams();
        let newUrl = `?${handle}`;
        if(rkey) newUrl += `&rkey=${rkey}`;
        history.replaceState({ handle }, "", newUrl);
    }

    profileDiv.innerHTML = "<p style='text-align:center;color:#666'>Cargando perfil...</p>";
    albumsDiv.innerHTML = "";
    postsContainer.innerHTML = "<p style='text-align:center;color:#666'>Cargando escritos...</p>";

    let did = handle.startsWith('did:') ? handle : null;
    if (!did) {
        try {
            const res = await fetch(`https://bsky.social/xrpc/com.atproto.identity.resolveHandle?handle=${encodeURIComponent(handle)}`);
            if (!res.ok) throw new Error();
            const data = await res.json();
            did = data.did;
        } catch (e) {
            profileDiv.innerHTML = "<p style='text-align:center;padding:20px;'>Usuario no encontrado o error de resolución.</p>";
            albumsDiv.innerHTML = "";
            postsContainer.innerHTML = "";
            return;
        }
    }
    currentDid = did;

    try {
        const profRes = await fetch(`https://public.api.bsky.app/xrpc/app.bsky.actor.getProfile?actor=${did}`);
        const profile = await profRes.json();

        let recordsData = { records: [] };
        try {
            const recordsRes = await fetch(`https://bsky.social/xrpc/com.atproto.repo.listRecords?repo=${did}&collection=com.antuansv.longtext&limit=100`);
            if (recordsRes.ok) recordsData = await recordsRes.json();
        } catch (e) {
            console.log("Error o repositorio vacío.");
        }

        allPosts = recordsData.records || [];

        renderProfile(profile, handle, allPosts.length);
        renderAlbums(allPosts);
        renderPosts(allPosts);

        // Auto-apertura y scroll al escrito específico usando su rkey
        const { rkey } = getUrlParams();
        if (rkey) {
            setTimeout(() => {
                const targetPost = document.getElementById(`post-${rkey}`);
                if (targetPost) {
                    const toggleBtn = targetPost.querySelector('.post-title');
                    // Solo lo abre si no está abierto ya
                    const content = targetPost.querySelector('.post-content');
                    if (content && content.style.display !== 'block') {
                        togglePost(toggleBtn);
                    }
                    targetPost.scrollIntoView({ behavior: "smooth", block: "start" });
                }
            }, 400); // Un margen sutil de tiempo extra por si el Markdown es muy extenso
        }

    } catch (e) {
        postsContainer.innerHTML = "<p style='text-align:center;padding:20px;'>Error al conectar con la infraestructura del repositorio.</p>";
    }
}

// ==================== RENDERIZADO DE COMPONENTES DOM ====================
function renderProfile(profile, handle, count) {
    const avatarUrl = profile.avatar || 'https://via.placeholder.com/80x80/111/444?text=•';

    profileDiv.innerHTML = `
    <div class="profile">
    <img src="${avatarUrl}" alt="Avatar">
    <div class="profile-info">
    <h2>${profile.displayName || handle}</h2>
    <p>${profile.description || ''}</p>
    <p style="color:#888">${count} escritos</p>
    </div>
    <div class="profile-actions">
    <a class="btn" href="https://bsky.app/profile/${handle}" target="_blank" style="text-decoration:none;">Perfil</a>
    <button class="btn" onclick="shareProfile()">Compartir</button>
    <button class="btn" onclick="loadFollowers('${currentDid}')">Seguidores</button>
    <button class="btn" onclick="loadFollowing('${currentDid}')">Siguiendo</button>
    </div>
    </div>`;
}

function renderAlbums(records) {
    albumsDiv.innerHTML = '';

    const allBtn = document.createElement('div');
    allBtn.className = 'album-btn active';
    allBtn.textContent = 'Todo';
    allBtn.onclick = () => {
        document.querySelectorAll('.album-btn').forEach(b => b.classList.remove('active'));
        allBtn.classList.add('active');
        renderPosts(records);
    };
    albumsDiv.appendChild(allBtn);

    const tagMap = {};

    records.forEach(rec => {
        const catString = rec.value.category || '';
        const tags = catString.split(/\s+/).filter(t => t);

        tags.forEach(tag => {
            const clean = tag.replace('#', '').toLowerCase();
            if (!clean) return;
            if (!tagMap[clean]) tagMap[clean] = [];
            tagMap[clean].push(rec);
        });
    });

    Object.keys(tagMap).sort().forEach(tag => {
        const btn = document.createElement('div');
        btn.className = 'album-btn';
        btn.textContent = tag;
        btn.onclick = () => {
            document.querySelectorAll('.album-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            renderPosts(tagMap[tag]);
        };
        albumsDiv.appendChild(btn);
    });
}

function renderPosts(records) {
    if (records.length === 0) {
        postsContainer.innerHTML = `<p style="text-align:center; padding:80px; color:#666;">Todavía no hay escritos publicados por este autor.</p>`;
        return;
    }

    const sorted = records.sort((a,b) => new Date(b.value.createdAt) - new Date(a.value.createdAt));

    let html = '';
    sorted.forEach(rec => {
        const val = rec.value;
        const date = new Date(val.createdAt);
        const rkey = rec.uri.split('/').pop();

        // Enlace directo al escrito exacto
        const shareUrl = `${window.location.origin}${window.location.pathname}?${currentHandle}&rkey=${rkey}`;
        const dateStr = date.toLocaleDateString('es-ES', {year:'numeric', month:'long', day:'numeric'});
        const displayCat = (val.category || '').split(/\s+/).map(t => t.replace('#', '')).join(', ');

        html += `
        <div class="post" id="post-${rkey}">
        <div class="post-header">
        <div class="post-title" onclick="togglePost(this)">
        <span class="toggle-btn">+</span> ${val.title || 'Sin título'}
        </div>
        <button class="btn" onclick="sharePostUrl('${shareUrl}')">Compartir</button>
        </div>
        <div class="post-date">${dateStr}</div>
        ${val.synopsis ? `<div class="post-synopsis">${val.synopsis}</div>` : ''}
        ${displayCat ? `<div class="post-category-label">Categorías: ${displayCat}</div>` : ''}

        <div class="post-content">${marked.parse(val.text || '')}</div>
        </div>`;
    });

    postsContainer.innerHTML = html;
}

function togglePost(el) {
    const content = el.parentElement.parentElement.querySelector('.post-content');
    const toggle = el.querySelector('.toggle-btn');

    if (content.style.display === 'block') {
        content.style.display = 'none';
        toggle.textContent = '+';
    } else {
        content.style.display = 'block';
        toggle.textContent = '−';
    }
}

// ==================== INTERACCIONES INTERNAS Y COPIADO ====================
function shareProfile() {
    navigator.clipboard.writeText(window.location.href);
    alert("✅ Enlace del autor copiado");
}

// Nueva función quirúrgica para el portapapeles
function sharePostUrl(url) {
    navigator.clipboard.writeText(url);
    alert("✅ Enlace al escrito copiado al portapapeles");
}

// ==================== GRAPH EN AT PROTOCOL (SOCIAL MODALS) ====================
async function loadFollowers(did) {
    modalTitle.textContent = "Seguidores";
    userList.innerHTML = "<p style='text-align:center;color:#666'>Cargando...</p>";
    userModal.style.display = "flex";

    try {
        const res = await fetch(`https://public.api.bsky.app/xrpc/app.bsky.graph.getFollowers?actor=${did}&limit=50`);
        const data = await res.json();
        renderUserList(data.followers);
    } catch (e) {
        userList.innerHTML = "<p style='text-align:center;'>Error al cargar seguidores.</p>";
    }
}

async function loadFollowing(did) {
    modalTitle.textContent = "Siguiendo";
    userList.innerHTML = "<p style='text-align:center;color:#666'>Cargando...</p>";
    userModal.style.display = "flex";

    try {
        const res = await fetch(`https://public.api.bsky.app/xrpc/app.bsky.graph.getFollows?actor=${did}&limit=50`);
        const data = await res.json();
        renderUserList(data.follows);
    } catch (e) {
        userList.innerHTML = "<p style='text-align:center;'>Error al cargar seguidos.</p>";
    }
}

function renderUserList(users) {
    userList.innerHTML = '';
    users.forEach(user => {
        const div = document.createElement('div');
        div.className = 'user-item';
        div.innerHTML = `
        <img src="${user.avatar || 'https://via.placeholder.com/48'}">
        <div>
        <strong>${user.displayName || user.handle}</strong><br>
        <small style="color:#888">@${user.handle}</small>
        </div>
        `;
        div.onclick = () => {
            closeModal();
            loadUser(user.handle, 'push');
        };
        userList.appendChild(div);
    });
}

function closeModal() {
    userModal.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == userModal) {
        closeModal();
    }
    if (event.target == navMenuModal) {
        closeNavMenu();
    }
}
