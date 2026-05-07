/* Configuración de Idioma */
const lang = navigator.language.slice(0, 2);
const i18n = {
    es: {
        search: "Buscar",
        profile: "Perfil",
        share: "Compartir",
        followers: "Seguidores",
        following: "Siguiendo",
        post: "Ver publicación",
        images: "imágenes",
        all: "Todo",
        copyMsg: "Copia el enlace:"
    },
    en: {
        search: "Search",
        profile: "Profile",
        share: "Share",
        followers: "Followers",
        following: "Following",
        post: "View post",
        images: "images",
        all: "All",
        copyMsg: "Copy the link:"
    },
    ja: {
        search: "検索",
        profile: "プロフィール",
        share: "共有",
        followers: "フォロワー",
        following: "フォロー中",
        post: "投稿を見る",
        images: "画像",
        all: "すべて",
        copyMsg: "リンクをコピー:"
    },
    ru: {
        search: "Поиск",
        profile: "Профиль",
        share: "Поделиться",
        followers: "Подписчики",
        following: "Подписки",
        post: "Пост",
        images: "изображений",
        all: "Все",
        copyMsg: "Скопируйте ссылку:"
    }
};

const t = i18n[lang] || i18n.en;

/* Variables Globales */
let images = [], filtered = [], index = 0, currentHandle = "";

/* --- Lógica de URL Limpia (?) --- */
const parseHandle = (input) => {
    if (!input) return "";
    let h = input.trim().toLowerCase();
    if (h.includes("bsky.app/profile/")) {
        h = h.split("bsky.app/profile/")[1].split("/")[0].split("?")[0];
    }
    return h.replace("@", "");
};

// Obtenemos el usuario de la URL (el string después del ?) o del localStorage
const getInitialUser = () => {
    const query = location.search.substring(1); // Quita el "?" inicial
    // Si hay un parámetro con "=", intentamos extraer el valor (por compatibilidad)
    if (query.includes("=")) {
        const p = new URLSearchParams(location.search);
        return parseHandle(p.get("u") || p.get("user") || "");
    }
    // Si no hay "=", el query entero es el handle
    return parseHandle(query || localStorage.getItem("user") || "");
};

const user = getInitialUser();

// Traducir elementos iniciales
userInput.value = user;
goBtn.innerText = t.search;
postLink.innerText = t.post;

if (user) load(user);

/* Lógica de Búsqueda */
const handleSearch = () => {
    const u = parseHandle(userInput.value);
    if (!u) return;
    localStorage.setItem("user", u);
    history.pushState({}, "", "?" + u); // URL limpia: ?usuario.com
    load(u);
};

goBtn.onclick = handleSearch;
userInput.onkeydown = (e) => { if (e.key === "Enter") handleSearch(); };

/* Función Principal de Carga */
async function load(handle) {
    currentHandle = handle;
    history.replaceState({}, "", "?" + handle);

    gallery.innerHTML = '<div class="card skeleton"></div>'.repeat(9);
    profile.innerHTML = '<div class="profile skeleton" style="height:100px; border:none;"></div>';
    albums.innerHTML = '';

    try {
        const didRes = await fetch(`https://public.api.bsky.app/xrpc/com.atproto.identity.resolveHandle?handle=${handle}`);
        const { did } = await didRes.json();

        const prof = await (await fetch(`https://public.api.bsky.app/xrpc/app.bsky.actor.getProfile?actor=${did}`)).json();
        const data = await (await fetch(`https://public.api.bsky.app/xrpc/app.bsky.feed.getAuthorFeed?actor=${did}&limit=100`)).json();

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

            imgs.forEach(img => {
                const cid = img.image?.ref?.$link || img.image?.$link;
                if (!cid) return;

                const imageObj = {
                    thumb: `https://cdn.bsky.app/img/feed_thumbnail/plain/${did}/${cid}@jpeg`,
                    full: `https://cdn.bsky.app/img/feed_fullsize/plain/${did}/${cid}@jpeg`,
                    text,
                    likes: p.likeCount || 0,
                    uri: p.uri,
                    tags
                };

                images.push(imageObj);
                tags.forEach(tag => {
                    if (!tagMap[tag]) tagMap[tag] = [];
                    tagMap[tag].push(imageObj);
                });
            });
        });

        // Filtrar imágenes rotas
        images = (await Promise.all(images.map(img => {
            return new Promise(resolve => {
                const test = new Image();
                test.src = img.thumb;
                test.onload = () => resolve(img);
                test.onerror = () => resolve(null);
            });
        }))).filter(Boolean);

        profile.innerHTML = `
        <div class="profile">
            <img src="${prof.avatar || ''}">
            <div class="profile-info">
                <h2>${prof.displayName || handle}</h2>
                <p>${prof.description || ""}</p>
                <div class="count">${images.length} ${t.images}</div>
            </div>
            <div class="profile-actions">
                <a class="btn" href="https://bsky.app/profile/${handle}" target="_blank">${t.profile}</a>
                <button class="btn" onclick="share()">${t.share}</button>
                <button class="btn" onclick="followers('${did}')">${t.followers}</button>
                <button class="btn" onclick="follows('${did}')">${t.following}</button>
            </div>
        </div>`;

        renderAlbums(tagMap);
        filtered = [...images];
        render();

    } catch (err) {
        gallery.innerHTML = "Usuario no encontrado. Asegúrate de usar el handle correcto.";
    }
}

/* Renderizado */
function renderAlbums(tagMap) {
    albums.innerHTML = "";
    const allBtn = document.createElement("div");
    allBtn.className = "album-btn active";
    allBtn.innerText = t.all;
    allBtn.onclick = () => { filtered = [...images]; setActive(allBtn); render(); };
    albums.appendChild(allBtn);

    Object.keys(tagMap).forEach(tag => {
        const b = document.createElement("div");
        b.className = "album-btn";
        b.innerText = tag.replace("#", "");
        b.onclick = () => { filtered = tagMap[tag]; setActive(b); render(); };
        albums.appendChild(b);
    });
}

function setActive(el) {
    document.querySelectorAll(".album-btn").forEach(b => b.classList.remove("active"));
    el.classList.add("active");
}

function render() {
    gallery.innerHTML = "";
    filtered.forEach((img, i) => {
        const d = document.createElement("div");
        d.className = "card";
        d.innerHTML = `<img src="${img.thumb}" loading="lazy">`;
        d.onclick = () => open(i);
        gallery.appendChild(d);
    });
}

/* Modal */
function open(i) {
    index = i;
    const d = filtered[i];
    mImg.src = d.full;
    mText.innerText = d.text;
    mLikes.innerText = "❤️ " + d.likes;
    const id = d.uri.split("/").pop();
    postLink.href = `https://bsky.app/profile/${currentHandle}/post/${id}`;
    
    // Restaurar estilos por si venimos del modal de apoyo
    prevBtn.style.display = "flex";
    nextBtn.style.display = "flex";
    postLink.style.background = "";
    postLink.style.borderColor = "";
    postLink.innerText = t.post;
    
    modal.classList.add("active");
}

prevBtn.onclick = e => { e.stopPropagation(); if (index > 0) open(index - 1); };
nextBtn.onclick = e => { e.stopPropagation(); if (index < filtered.length - 1) open(index + 1); };
closeBtn.onclick = () => modal.classList.remove("active");
modal.onclick = e => { if (e.target === modal) modal.classList.remove("active"); };

/* Usuarios y Compartir */
async function followers(did) {
    const res = await fetch(`https://public.api.bsky.app/xrpc/app.bsky.graph.getFollowers?actor=${did}`);
    const data = await res.json();
    showUsers(data.followers);
}

async function follows(did) {
    const res = await fetch(`https://public.api.bsky.app/xrpc/app.bsky.graph.getFollows?actor=${did}`);
    const data = await res.json();
    showUsers(data.follows);
}

function showUsers(list) {
    userList.innerHTML = "";
    list.forEach(u => {
        const d = document.createElement("div");
        d.className = "user";
        d.innerHTML = `<img src="${u.avatar || ''}"><span>${u.handle}</span>`;
        d.onclick = () => { userModal.classList.remove("active"); load(u.handle); };
        userList.appendChild(d);
    });
    userModal.classList.add("active");
}

function share() {
    const url = `${window.location.origin}${window.location.pathname}?${currentHandle}`;
    navigator.clipboard.writeText(url).then(() => alert("Enlace copiado")).catch(() => prompt(t.copyMsg, url));
}

brand.onclick = () => { if (currentHandle) { load(currentHandle); window.scrollTo({ top: 0, behavior: 'smooth' }); } };

/* --- Lógica del Botón de Apoyo --- */
const infoBtn = document.getElementById("infoBtn");
infoBtn.onclick = () => {
    mImg.src = "iasv.jpg"; 
    mText.innerHTML = `
    <div style="font-size: 16px; line-height: 1.6; color: #fff;">
        <strong style="font-size: 18px;">¡Gracias por ser parte de Alba!</strong><br><br>
        Este es un proyecto <strong>independiente y gratuito</strong> para la comunidad de Bluesky.<br><br>
        <strong>¿Cómo crear álbumes?</strong><br>
        Usa un hashtag en tus posts (ej: <span style="color: #29abe0;">#Portafolio</span>). Alba los agrupará automáticamente.<br><br>
        <hr style="border: 0; border-top: 1px solid #333; margin: 15px 0;">
        <p style="color: #aaa; font-size: 14px;">Tu apoyo con un café permite mantener los servidores activos y sin publicidad.</p>
    </div>`;

    mLikes.innerHTML = `<a href="https://ko-fi.com/iasuarezv" target="_blank" style="color:inherit; text-decoration:none;">☕ Invitame un café ☕</a>`;
    postLink.innerText = "Conocer al desarrollador";
    postLink.href = "https://iasuarezv.com/Alba/?iasuarezv.com";
    postLink.style.background = "#222";
    postLink.style.borderColor = "#444";

    prevBtn.style.display = "none";
    nextBtn.style.display = "none";
    modal.classList.add("active");
};
