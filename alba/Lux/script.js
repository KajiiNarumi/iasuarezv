/* ==========================================================================
 * ESTADO GLOBAL Y CACHÉ DE ELEMENTOS DOM
 * ========================================================================== */
let currentHandle = "";
let currentDid = "";
let images = [];
let filtered = [];
let index = 0;
let loggedInHandle = null;

const userInput = document.getElementById('userInput');
const goBtn = document.getElementById('goBtn');
const profileDiv = document.getElementById('profile');
const albumsDiv = document.getElementById('albums');
const gallery = document.getElementById('gallery');
const navMenuModal = document.getElementById('navMenuModal');
const brandMe = document.getElementById('brand-me');
const brandMeSeparator = document.getElementById('brand-me-separator');

// Referencias a los botones de navegación del visor de imágenes
const mImg = document.getElementById('mImg');
const mText = document.getElementById('mText');
const mLikes = document.getElementById('mLikes');
const postLink = document.getElementById('postLink');
const modal = document.getElementById('modal');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const userList = document.getElementById('userList');

/* ==========================================================================
 * MENÚ DE NAVEGACIÓN MODAL Y "ME"
 * ========================================================================== */
function openNavMenu() { navMenuModal.style.display = "flex"; }
function closeNavMenu() { navMenuModal.style.display = "none"; }

function loadMyProfile() {
    if (loggedInHandle) {
        userInput.value = loggedInHandle;
        loadUser(loggedInHandle, 'push');
    }
}

/* ==========================================================================
 * LÓGICA DE URL Y CONTROL DE SESIÓN EN RED
 * ========================================================================== */
function getUrlParams() {
    const search = window.location.search.substring(1);
    const params = new URLSearchParams(search);

    let handle = params.get('handle') || params.get('usuario');

    if (!handle && search) {
        const firstPart = search.split('&')[0];
        if (firstPart && !firstPart.includes('=')) {
            handle = decodeURIComponent(firstPart);
        }
    }
    return { handle: handle || "" };
}

function checkSession() {
    const savedSession = localStorage.getItem('atprotoSession');
    console.log("Lux - Buscando sesión:", savedSession);

    if (savedSession) {
        try {
            const sessionData = JSON.parse(savedSession);
            loggedInHandle = sessionData.handle || sessionData.session?.handle;

            if (loggedInHandle) {
                // Activamos ambos elementos usando sus IDs reales
                if (brandMe) brandMe.style.display = "inline";
                if (brandMeSeparator) brandMeSeparator.style.display = "inline";

                console.log("Lux - Sesión detectada para:", loggedInHandle);
            }
        } catch (e) {
            console.error("Error leyendo sesión:", e);
        }
    } else {
        console.log("Lux - No se encontró sesión en localStorage");
    }
}

function showEmptyState() {
    userInput.value = "";
    currentHandle = "";
    currentDid = "";
    images = [];
    filtered = [];

    profileDiv.innerHTML = "";
    albumsDiv.innerHTML = "";
    gallery.innerHTML = `<div style="grid-column: 1 / -1; text-align: center; color: var(--dim); padding: 50px 20px;">Usa el buscador para explorar una galería.</div>`;
}

/* ==========================================================================
 * NAVEGACIÓN Y GESTIÓN DEL HISTORIAL DEL SISTEMA
 * ========================================================================== */
window.onpopstate = () => {
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

/* ==========================================================================
 * CARGAR DATOS DE ACTOR AT PROTOCOL
 * ========================================================================== */
async function loadUser(rawInput, historyMode = 'push') {
    if (!rawInput) return;

    let handle = rawInput.trim();
    if (handle.startsWith('@')) handle = handle.substring(1);
    if (handle.includes('bsky.app/profile/')) {
        const parts = handle.split('bsky.app/profile/');
        if (parts[1]) handle = parts[1].split('/')[0].split('?')[0];
    }
    if (!handle) return;

    currentHandle = handle;

    localStorage.setItem('alba_shared_user', handle);

    if (historyMode === 'push') {
        history.pushState({ handle }, "", `?${handle}`);
    } else if (historyMode === 'replace') {
        history.replaceState({ handle }, "", `?${handle}`);
    }

    userInput.value = handle;
    gallery.innerHTML = '<div class="card skeleton"></div>'.repeat(9);
    profileDiv.innerHTML = '<div class="profile skeleton" style="height:100px; border:none;"></div>';
    albumsDiv.innerHTML = '';

    let did = handle.startsWith('did:') ? handle : null;
    if (!did) {
        try {
            const res = await fetch(`https://bsky.social/xrpc/com.atproto.identity.resolveHandle?handle=${encodeURIComponent(handle)}`);
            if (!res.ok) throw new Error("Handle no encontrado");
            const data = await res.json();
            did = data.did;
        } catch (e) {
            profileDiv.innerHTML = "<h2 style='text-align:center;padding:20px;color:#fff;'>USUARIO NO ENCONTRADO</h2>";
            albumsDiv.innerHTML = "";
            gallery.innerHTML = "";
            return;
        }
    }
    currentDid = did;

    try {
        const profRes = await fetch(`https://public.api.bsky.app/xrpc/app.bsky.actor.getProfile?actor=${did}`);
        const prof = await profRes.json();

        const dataRes = await fetch(`https://public.api.bsky.app/xrpc/app.bsky.feed.getAuthorFeed?actor=${did}&limit=100`);
        const data = await dataRes.json();

        images = [];
        const tagMap = {};

        data.feed.forEach(item => {
            const p = item.post;
            if (p.record?.reply || item.reason?.$type === "app.bsky.feed.defs#reasonRepost" || p.embed?.record) return;
            const text = p.record?.text || "";
            const tags = (text.match(/#\w+/g) || []).map(t => t.toLowerCase());
            let imgs = [];
            if (p.embed?.images) imgs.push(...p.embed.images);
            if (p.embed?.media?.images) imgs.push(...p.embed.media.images);
            if (p.record?.embed?.images) imgs.push(...p.record.embed.images);
            if (p.record?.embed?.media?.images) imgs.push(...p.record.embed.media.images);

            imgs.forEach(img => {
                const cid = img.image?.ref?.$link || img.image?.$link;
                if (!cid) return;
                images.push({
                    thumb: `https://cdn.bsky.app/img/feed_thumbnail/plain/${did}/${cid}@jpeg`,
                    full: `https://cdn.bsky.app/img/feed_fullsize/plain/${did}/${cid}@jpeg`,
                    text, likes: p.likeCount || 0, uri: p.uri, tags
                });
            });
        });

        renderProfile(prof, handle, images.length);

        images.forEach(img => {
            img.tags.forEach(tag => {
                if (!tagMap[tag]) tagMap[tag] = [];
                tagMap[tag].push(img);
            });
        });

        renderAlbums(tagMap);
        filtered = [...images];
        render();
    } catch (err) {
        showEmptyState();
    }
}

/* ==========================================================================
 * RENDERIZADO DE COMPONENTES DE LA GALERÍA
 * ========================================================================== */
function renderProfile(profile, handle, count) {
    profileDiv.innerHTML = `
    <div class="profile">
    <img src="${profile.avatar || ''}">
    <div class="profile-info">
    <h2>${profile.displayName || handle}</h2>
    <p>${profile.description || ""}</p>
    <div class="count">${count} imágenes</div>
    </div>
    <div class="profile-actions">
    <a class="btn" href="https://bsky.app/profile/${handle}" target="_blank">Perfil</a>
    <button class="btn" onclick="share()">Compartir</button>
    <button class="btn" onclick="loadFollowers('${currentDid}')">Seguidores</button>
    <button class="btn" onclick="loadFollowing('${currentDid}')">Siguiendo</button>
    </div>
    </div>`;
}

function renderAlbums(tagMap) {
    albumsDiv.innerHTML = "";
    const allBtn = document.createElement("div");
    allBtn.className = "album-btn active";
    allBtn.innerText = "Todo";
    allBtn.onclick = () => { filtered = [...images]; setActive(allBtn); render(); };
    albumsDiv.appendChild(allBtn);

    Object.keys(tagMap).forEach(tag => {
        const b = document.createElement("div");
        b.className = "album-btn";
        b.innerText = tag.replace("#", "");
        b.onclick = () => { filtered = tagMap[tag]; setActive(b); render(); };
        albumsDiv.appendChild(b);
    });
}

function setActive(el) {
    document.querySelectorAll(".album-btn").forEach(b => b.classList.remove("active"));
    el.classList.add("active");
}

function render() {
    gallery.innerHTML = "";
    if (filtered.length === 0) {
        gallery.innerHTML = `<div style="grid-column: 1 / -1; text-align: center; color: var(--dim); padding: 40px;">No se encontraron imágenes.</div>`;
        return;
    }
    filtered.forEach((img, i) => {
        const d = document.createElement("div");
        d.className = "card";
        d.innerHTML = `<img src="${img.thumb}" loading="lazy">`;
        d.onclick = () => openImg(i);
        gallery.appendChild(d);
    });
}

/* ==========================================================================
 * VISOR MODAL DE IMÁGENES
 * ========================================================================== */
function openImg(i) {
    index = i;
    const d = filtered[i];

    mImg.style.display = "block";
    mImg.src = d.full;
    mText.innerText = d.text;
    mLikes.innerText = "❤️ " + d.likes;

    const id = d.uri.split("/").pop();
    postLink.href = `https://bsky.app/profile/${currentHandle}/post/${id}`;
    postLink.style.display = "inline-block";
    postLink.innerText = "Ver publicación";

    prevBtn.style.display = "flex";
    nextBtn.style.display = "flex";
    modal.classList.add("active");
}

prevBtn.onclick = e => { e.stopPropagation(); if (index > 0) openImg(index - 1); };
nextBtn.onclick = e => { e.stopPropagation(); if (index < filtered.length - 1) openImg(index + 1); };
closeBtn.onclick = () => modal.classList.remove("active");
modal.onclick = e => { if (e.target === modal) modal.classList.remove("active"); };

/* ==========================================================================
 * GRAPH API (Seguidores y Siguiendo)
 * ========================================================================== */
async function loadFollowers(did) {
    const modalTitle = document.getElementById('modalTitle');
    if (modalTitle) modalTitle.textContent = "Seguidores";
    userList.innerHTML = "<p style='text-align:center;color:#666'>Cargando...</p>";
    document.getElementById('userModal').classList.add("active");
    try {
        const res = await fetch(`https://public.api.bsky.app/xrpc/app.bsky.graph.getFollowers?actor=${did}&limit=50`);
        const data = await res.json();
        renderUserList(data.followers);
    } catch (e) {
        userList.innerHTML = "<p style='text-align:center;'>Error al cargar seguidores.</p>";
    }
}

async function loadFollowing(did) {
    const modalTitle = document.getElementById('modalTitle');
    if (modalTitle) modalTitle.textContent = "Siguiendo";
    userList.innerHTML = "<p style='text-align:center;color:#666'>Cargando...</p>";
    document.getElementById('userModal').classList.add("active");
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
        div.className = 'user';
        div.innerHTML = `
        <img src="${user.avatar || 'https://via.placeholder.com/48'}">
        <div>
        <strong>${user.displayName || user.handle}</strong><br>
        <small style="color:#888">@${user.handle}</small>
        </div>`;
        div.onclick = () => { closeModal(); loadUser(user.handle, 'push'); };
        userList.appendChild(div);
    });
}

function closeModal() { document.getElementById('userModal').classList.remove("active"); }

function share() {
    navigator.clipboard.writeText(window.location.href);
    alert("✅ Enlace del perfil copiado");
}

/* ==========================================================================
 * MANEJO DE EVENTOS DE VENTANA GLOBAL
 * ========================================================================== */
window.onclick = function(event) {
    if (event.target == document.getElementById('userModal')) closeModal();
    if (event.target == navMenuModal) closeNavMenu();
};
