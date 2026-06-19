let session = null;
let currentRkey = null;

const titleInput = document.getElementById('title');
const categoryInput = document.getElementById('category');
const synopsisInput = document.getElementById('synopsis');
const synopsisCounter = document.getElementById('synopsisCounter');
const contentInput = document.getElementById('content');
const previewDiv = document.getElementById('preview');
const recordsList = document.getElementById('recordsList');
const userStatus = document.getElementById('userStatus');
const navMenuModal = document.getElementById('navMenuModal');

// ==================== MENÚ DE NAVEGACIÓN MODAL ====================
function openNavMenu() {
    navMenuModal.style.display = "flex";
}

function closeNavMenu() {
    navMenuModal.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == navMenuModal) {
        closeNavMenu();
    }
}

// ==================== EDITOR EN VIVO ====================
contentInput.addEventListener('input', () => {
    const markdown = contentInput.value;
    previewDiv.innerHTML = typeof marked !== 'undefined' ? marked.parse(markdown) : markdown.replace(/\n/g, '<br>');
});

synopsisInput.addEventListener('input', () => {
    const len = synopsisInput.value.length;
    synopsisCounter.textContent = `${len} / 120`;
});

// ==================== INICIALIZACIÓN Y SESIÓN ====================
window.onload = () => {
    const saved = localStorage.getItem('atprotoSession');
    if (saved) {
        session = JSON.parse(saved);
        document.getElementById('mainSection').style.display = 'block';
        userStatus.textContent = `Conectado como: ${session.handle}`;
        listTexts();
    } else {
        alert("No hay sesión activa. Por favor, inicia sesión desde la página principal o configuraciones.");
        window.location.href = '../../'; // Redirigir si no hay sesión
    }
};

function logout() {
    localStorage.removeItem('atprotoSession');
    window.location.href = '../../';
}

// ==================== GUARDAR Y RECUPERAR ====================
async function saveText() {
    if (!session) return;

    const title = titleInput.value.trim() || "Sin título";
    const category = categoryInput.value.trim();
    const synopsis = synopsisInput.value.trim();
    const text = contentInput.value.trim();

    if (!text) return alert("Escribe algo en el contenido");

    const rkey = currentRkey || Date.now().toString(36) + Math.random().toString(36).substr(2);

    try {
        const resp = await fetch('https://bsky.social/xrpc/com.atproto.repo.putRecord', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${session.jwt}`
            },
            body: JSON.stringify({
                repo: session.did,
                collection: "com.antuansv.longtext",
                rkey: rkey,
                record: {
                    $type: "com.antuansv.longtext",
                    title: title,
                    category: category,
                    synopsis: synopsis,
                    text: text,
                    createdAt: new Date().toISOString()
                }
            })
        });

        if (resp.ok) {
            alert("Escrito guardado correctamente");
            currentRkey = null;
            clearForm();
            listTexts();
        } else {
            const errData = await resp.json();
            alert("Error del servidor: " + (errData.message || "Desconocido"));
        }
    } catch (e) {
        alert("Error al guardar: " + e.message);
    }
}

async function listTexts() {
    if (!session) return;
    recordsList.innerHTML = "<p>Cargando archivo...</p>";

    try {
        const resp = await fetch(`https://bsky.social/xrpc/com.atproto.repo.listRecords?repo=${session.did}&collection=com.antuansv.longtext&limit=50`, {
            headers: { 'Authorization': `Bearer ${session.jwt}` }
        });

        const data = await resp.json();
        recordsList.innerHTML = '';

        if (!data.records || data.records.length === 0) {
            recordsList.innerHTML = "<p>Aún no tienes escritos.</p>";
            return;
        }

        data.records.forEach(rec => {
            const rkey = rec.uri.split('/').pop();
            const val = rec.value;

            const safeTitle = (val.title || '').replace(/'/g,"\\'");
            const safeCat = (val.category || '').replace(/'/g,"\\'");
            const safeSyn = (val.synopsis || '').replace(/'/g,"\\'");
            const safeText = (val.text || '').replace(/`/g,'\\`');
            const createdAtStr = val.createdAt;

            const div = document.createElement('div');
            div.className = 'record';
            div.innerHTML = `
            <strong>${val.title}</strong>
            <div class="record-tags">${val.category || 'Sin categoría'} | ${new Date(val.createdAt).toLocaleDateString()}</div>
            <p style="font-size: 0.9rem; color: #aaa;">${val.synopsis || 'Sin sinopsis'}</p>
            <div class="actions">
            <button onclick="editText('${rkey}', '${safeTitle}', '${safeCat}', '${safeSyn}', \`${safeText}\`)">Editar</button>
            <button onclick="deleteText('${rkey}')">Eliminar</button>
            <button class="btn-publish" onclick="publishToBluesky('${rkey}', '${safeTitle}', '${createdAtStr}', '${safeSyn}', '${safeCat}')">Publicar en Bluesky</button>
            </div>
            `;
            recordsList.appendChild(div);
        });
    } catch (e) {
        recordsList.innerHTML = "<p>Error al cargar los textos.</p>";
    }
}

// ==================== INTERACCIONES ====================
window.editText = function(rkey, title, category, synopsis, text) {
    currentRkey = rkey;
    titleInput.value = title;
    categoryInput.value = category;
    synopsisInput.value = synopsis;
    contentInput.value = text;

    synopsisCounter.textContent = `${synopsis.length} / 120`;

    const markdown = text;
    previewDiv.innerHTML = typeof marked !== 'undefined' ? marked.parse(markdown) : markdown.replace(/\n/g, '<br>');

    window.scrollTo({ top: 0, behavior: 'smooth' });
};

window.deleteText = async function(rkey) {
    if (!confirm("¿Eliminar este escrito permanentemente?")) return;

    try {
        await fetch('https://bsky.social/xrpc/com.atproto.repo.deleteRecord', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${session.jwt}`
            },
            body: JSON.stringify({
                repo: session.did,
                collection: "com.antuansv.longtext",
                rkey: rkey
            })
        });
        listTexts();
    } catch (e) {
        alert("Error al eliminar");
    }
};

window.publishToBluesky = function(rkey, title, createdAt, synopsis, category) {
    // Formatear la fecha a MM DD, YYYY
    const dateObj = new Date(createdAt);
    const mm = String(dateObj.getMonth() + 1).padStart(2, '0');
    const dd = String(dateObj.getDate()).padStart(2, '0');
    const yyyy = dateObj.getFullYear();
    const formattedDate = `${mm} ${dd}, ${yyyy}`;

    // Construir la URL hacia el visor (ej: tusitio.com/Ink/?handle&rkey=...)
    // Como estamos en /Ink/Editor/, el visor está un nivel arriba.
    const baseUrl = window.location.origin + window.location.pathname.replace('Editor/', '').replace('index.html', '');
    const shareUrl = `${baseUrl}?${session.handle}&rkey=${rkey}`;

    // Construir los hashtags
    const hashtags = category ? category.split(/\s+/).map(t => t.startsWith('#') ? t : `#${t}`).join(' ') : '';

    // Ensamblar texto
    const textToShare = `${title} + ${formattedDate}\n\n${synopsis} ${hashtags}\n\n${shareUrl}`;

    // Abrir intent
    const intentUrl = `https://bsky.app/intent/compose?text=${encodeURIComponent(textToShare)}`;
    window.open(intentUrl, '_blank');
};

function clearForm() {
    currentRkey = null;
    titleInput.value = '';
    categoryInput.value = '';
    synopsisInput.value = '';
    contentInput.value = '';
    synopsisCounter.textContent = '0 / 120';
    previewDiv.innerHTML = '';
}
