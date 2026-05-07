/* Configuración de Idioma */
const lang = navigator.language.slice(0, 2);
const i18n = {
    es: {
        search: "Buscar", profile: "Perfil", share: "Compartir",
        followers: "Seguidores", following: "Siguiendo", post: "Ver publicación",
        images: "imágenes", all: "Todo", copyMsg: "Copia el enlace:",
        visit: "Visitar enlace",
        b1_t: "¿Alba?", b1_d: "Es un visualizador de imágenes diseñado para el protocolo AT. Su objetivo es ofrecerte una experiencia limpia, minimalista y centrada exclusivamente en el contenido visual de Bluesky, sin algoritmos que decidan qué debes ver.",
        b2_t: "Buscar", b2_d: "Localiza cualquier perfil rápidamente. Solo necesitas ingresar el nombre de usuario (ejemplo: usuario.bsky.social) con o sin el @. No hace falta copiar y pegar la dirección URL completa del perfil.",
        b3_t: "Publicar", b3_d: "Alba es actualmente un visualizador. Para que tus fotos aparezcan aquí, solo tienes que publicarlas desde tu cuenta de Bluesky. Al instante estarán disponibles para ser vistas en esta galería.",
        b4_t: "Álbumes", b4_d: "Organiza tu galería usando etiquetas. Cada # que incluyas en tus posts se convierte automáticamente en un álbum. Tip: puedes esconder los # dentro del Texto ALT de tus imágenes para mantener la estética limpia",
        b5_t: "Gratis", b5_d: "Alba es un proyecto de código abierto desarrollado por una sola persona. Es gratuito, sin anuncios y sin fines de lucro. Si valoras el tiempo y el esfuerzo invertido en crear esta herramienta, puedes invitarme a un café para apoyar mi trabajo.",
        b6_t: "Próximas", b6_d: "El desarrollo sigue activo. Estoy trabajando para que pronto puedas iniciar sesión directamente aquí para reaccionar a publicaciones, gestionar favoritos y publicar contenido sin salir de Alba."
    },
    en: {
        search: "Search", profile: "Profile", share: "Share",
        followers: "Followers", following: "Following", post: "View post",
        images: "images", all: "All", copyMsg: "Copy link:", visit: "Visit link"
    }
};

const t = i18n[lang] || i18n.en;

/* Variables Globales */
let images = [], filtered = [], index = 0, currentHandle = "";

/* Escuchar el botón atrás del navegador */
window.onpopstate = () => {
    const handle = window.location.search.replace("?", "");
    if (handle) {
        load(handle);
    } else {
        resetAlba();
    }
};

/* Función para mostrar información (Cuadrícula Inicial) */
function showAbout() {
    profile.innerHTML = "";
    albums.innerHTML = "";
    gallery.innerHTML = "";
    const blocks = [
        { title: t.b1_t, desc: t.b1_d },
        { title: t.b2_t, desc: t.b2_d },
        { title: t.b3_t, desc: t.b3_d },
        { title: t.b4_t, desc: t.b4_d, link: "?iasuarezv.com" },
        { title: t.b5_t, desc: t.b5_d, link: "https://ko-fi.com/iasuarezv" },
        { title: t.b6_t, desc: t.b6_d, link: "https://bsky.app/profile/iasuarezv.com" }
    ];
    blocks.forEach(b => {
        const d = document.createElement("div");
        d.className = "card";
        d.style.cssText = "padding: 0; display: flex; align-items: center; justify-content: center; border: 1px solid var(--line); cursor: pointer;";
        d.innerHTML = `<strong style="color:#fff; font-size: 1.2rem;">${b.title}</strong>`;

        d.onclick = () => openInfoModal(b);
        gallery.appendChild(d);
    });
}

/* Función para abrir información en el Modal (SOLO TEXTO) */
function openInfoModal(block) {
    const modalImgCont = document.querySelector(".modal-img");

    // Ocultar contenedor de imagen para que el texto use todo el espacio
    modalImgCont.style.display = "none";

    let linkHTML = "";
    if (block.link) {
        const isInternal = block.link.startsWith("?");
        const linkText = isInternal ? "Ver un perfil en Alba" : t.visit;
        linkHTML = `<br><br><a href="${block.link}" id="infoLink" target="_blank" style="color:#0085ff; text-decoration:none; font-weight:bold;">${linkText}</a>`;
    }

    mText.innerHTML = `
    <h2 style="color:#fff; margin-bottom:10px;">${block.title}</h2>
    <p style="color:var(--dim); font-size:1.1rem; line-height:1.5;">${block.desc}${linkHTML}</p>
    `;

    // Lógica para links internos (Perfil del creador)
    const infoLink = document.getElementById("infoLink");
    if (infoLink && block.link.startsWith("?")) {
        infoLink.onclick = (e) => {
            e.preventDefault();
            modal.classList.remove("active");
            load(block.link.replace("?", ""));
        };
    }

    // Ocultar elementos de galería
    postLink.style.display = "none";
    mLikes.innerText = "";
    prevBtn.style.display = "none";
    nextBtn.style.display = "none";
    modal.classList.add("active");
}

/* Lógica de Búsqueda */
const handleSearch = () => {
    const u = userInput.value.trim().replace("@", "");
    if (!u) {
        resetAlba();
        return;
    }
    load(u);
};

goBtn.onclick = handleSearch;
userInput.onkeydown = (e) => { if (e.key === "Enter") handleSearch(); };

function resetAlba() {
    userInput.value = "";
    currentHandle = "";
    const cleanURL = window.location.origin + window.location.pathname;
    if (window.location.search) window.history.pushState({}, '', cleanURL);
    showAbout();
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

brand.onclick = resetAlba;

async function load(handle) {
    if (!handle) { showAbout(); return; }
    currentHandle = handle;
    userInput.value = handle;

    if (window.location.search !== "?" + handle) {
        history.pushState({}, "", "?" + handle);
    }

    localStorage.setItem("user", handle);

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

        images.forEach(img => {
            img.tags.forEach(tag => {
                if (!tagMap[tag]) tagMap[tag] = [];
                tagMap[tag].push(img);
            });
        });

        renderAlbums(tagMap);
        filtered = [...images];
        render();
    } catch (err) { resetAlba(); }
}

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

/* Función para abrir fotos (RESTAURA EL DISEÑO) */
function open(i) {
    index = i;
    const d = filtered[i];
    const modalImgCont = document.querySelector(".modal-img");

    // Volver a mostrar contenedor de imagen
    modalImgCont.style.display = "flex";
    mImg.style.display = "block";
    mImg.src = d.full;
    mText.innerText = d.text;
    mLikes.innerText = "❤️ " + d.likes;

    const id = d.uri.split("/").pop();
    postLink.href = `https://bsky.app/profile/${currentHandle}/post/${id}`;
    postLink.style.display = "inline-block";
    postLink.onclick = null;
    postLink.innerText = t.post;

    prevBtn.style.display = "flex";
    nextBtn.style.display = "flex";
    modal.classList.add("active");
}

prevBtn.onclick = e => { e.stopPropagation(); if (index > 0) open(index - 1); };
nextBtn.onclick = e => { e.stopPropagation(); if (index < filtered.length - 1) open(index + 1); };
closeBtn.onclick = () => modal.classList.remove("active");
modal.onclick = e => { if (e.target === modal) modal.classList.remove("active"); };

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
    navigator.clipboard.writeText(window.location.href).then(() => alert("Copiado!"));
}

/* Inicialización */
const params = new URLSearchParams(window.location.search);
const initQuery = params.get("usuario") || window.location.search.replace("?", "");
goBtn.innerText = t.search;

if (initQuery) {
    load(initQuery);
} else {
    // Si no hay URL, intentamos cargar el último del localStorage
    const lastUser = localStorage.getItem("user");
    if (lastUser) {
        load(lastUser);
    } else {
        showAbout();
    }
}
