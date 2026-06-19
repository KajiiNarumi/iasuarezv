let session = null;
let currentRkey = null;
let currentTasks = [];
let sessionCheckInterval = null;

const userStatus = document.getElementById('userStatus');
const navMenuModal = document.getElementById('navMenuModal');

// ==================== MENÚ ====================
function openNavMenu() { navMenuModal.style.display = "flex"; }
function closeNavMenu() { navMenuModal.style.display = "none"; }
window.onclick = function(event) {
    if (event.target == navMenuModal) closeNavMenu();
};

// ==================== VERIFICACIÓN DE SESIÓN ====================
async function checkSession(silent = false) {
    if (!session || !session.jwt) {
        handleSessionExpired();
        return false;
    }
    try {
        const resp = await fetch(`https://bsky.social/xrpc/com.atproto.server.getSession`, {
            headers: { 'Authorization': `Bearer ${session.jwt}` }
        });
        if (!resp.ok) throw new Error();
        return true;
    } catch (e) {
        if (!silent) handleSessionExpired();
        return false;
    }
}

function handleSessionExpired() {
    userStatus.innerHTML = `<span style="color:#ff6666;">Sesión expirada</span>
    <button onclick="renewSession()" style="margin-left:10px; padding:5px 10px; font-size:0.9rem;">Renovar Sesión</button>`;
}

window.renewSession = function() {
    const tempData = {
        projectTitle: document.getElementById('projectTitle').value,
        description: document.getElementById('description').value,
        category: document.getElementById('category').value,
        startDate: document.getElementById('startDate').value,
        endDate: document.getElementById('endDate').value,
        tasks: currentTasks
    };
    localStorage.setItem('kronTempForm', JSON.stringify(tempData));
    localStorage.removeItem('atprotoSession');
    window.location.href = '../../';
};

function loadTempFormData() {
    const saved = localStorage.getItem('kronTempForm');
    if (saved) {
        const data = JSON.parse(saved);
        document.getElementById('projectTitle').value = data.projectTitle || '';
        document.getElementById('description').value = data.description || '';
        document.getElementById('category').value = data.category || '';
        document.getElementById('startDate').value = data.startDate || '';
        document.getElementById('endDate').value = data.endDate || '';
        currentTasks = data.tasks || [];
        renderCurrentTasks();
        localStorage.removeItem('kronTempForm');
    }
}

// ==================== INICIALIZACIÓN ====================
window.onload = () => {
    const saved = localStorage.getItem('atprotoSession');
    if (saved) {
        session = JSON.parse(saved);
        userStatus.textContent = `Conectado como: ${session.handle}`;
        loadTempFormData();
        loadActiveProjects();
        loadArchive();

        if (sessionCheckInterval) clearInterval(sessionCheckInterval);
        sessionCheckInterval = setInterval(() => checkSession(true), 300000);
    } else {
        alert("No hay sesión activa. Redirigiendo...");
        window.location.href = '../../';
    }
};

// ==================== LIMPIAR ====================
function clearEditor() {
    currentRkey = null;
    currentTasks = [];
    document.getElementById('projectTitle').value = '';
    document.getElementById('description').value = '';
    document.getElementById('category').value = '';
    document.getElementById('startDate').value = '';
    document.getElementById('endDate').value = '';
    document.getElementById('currentTasksList').innerHTML = '';
}

// ==================== ETIQUETAS (ARREGLOS INDEPENDIENTES) ====================
function processTags(currentCats, tagToRemove, tagToAdd) {
    let tags = [];

    // 1. Convertir a array sin importar si antes era string o ya era array
    if (typeof currentCats === 'string') {
        tags = currentCats.split(/\s+/).filter(t => t.trim() !== '');
    } else if (Array.isArray(currentCats)) {
        tags = [...currentCats];
    }

    // 2. Remover etiqueta vieja (ignorando mayúsculas/minúsculas)
    if (tagToRemove) {
        tags = tags.filter(t => t.toLowerCase() !== tagToRemove.toLowerCase());
    }

    // 3. Agregar nueva etiqueta si no existe ya
    if (tagToAdd) {
        const exists = tags.some(t => t.toLowerCase() === tagToAdd.toLowerCase());
        if (!exists) {
            tags.push(tagToAdd);
        }
    }

    return tags;
}

// ==================== TIEMPO Y VENCIMIENTO ====================
function getLocalEndOfDay(dateString) {
    if (!dateString) return null;
    const [year, month, day] = dateString.split('-').map(Number);
    return new Date(year, month - 1, day, 23, 59, 59, 999);
}

function isExpired(endDate) {
    if (!endDate) return false;
    const end = getLocalEndOfDay(endDate);
    return new Date() > end;
}

function daysRemaining(endDate, isFinished = false, finishDateStr = null) {
    if (!endDate) return "—";
    const end = getLocalEndOfDay(endDate);
    const now = (isFinished && finishDateStr) ? new Date(finishDateStr) : new Date();
    const diff = end - now;
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24));

    if (days > 0) return `${days} día${days > 1 ? 's' : ''}`;
    if (days === 0) return "Último día";
    return "Vencido";
}

// ==================== TAREAS ====================
function addTaskToList() {
    const name = document.getElementById('taskName').value.trim();
    const date = document.getElementById('taskDate').value;
    if (!name) return alert("Escribe el nombre de la tarea");
    currentTasks.push({ nombre: name, fecha: date, completada: false });
    renderCurrentTasks();
    document.getElementById('taskName').value = '';
    document.getElementById('taskDate').value = '';
}

function renderCurrentTasks() {
    const container = document.getElementById('currentTasksList');
    container.innerHTML = '';
    currentTasks.forEach((task, i) => {
        const div = document.createElement('div');
        div.style.margin = '8px 0';
        div.style.display = 'flex';
        div.style.gap = '8px';
        div.innerHTML = `
        <input type="text" class="input" style="margin:0; flex:2; padding:8px;" value="${task.nombre}" onchange="updateTaskField(${i}, 'nombre', this.value)">
        <input type="date" class="date-input" style="margin:0; flex:1; padding:8px;" value="${task.fecha || ''}" onchange="updateTaskField(${i}, 'fecha', this.value)">
        <button onclick="moveTask(${i}, -1)">↑</button>
        <button onclick="moveTask(${i}, 1)">↓</button>
        <button onclick="removeTask(${i})">✕</button>
        `;
        container.appendChild(div);
    });
}

window.updateTaskField = function(i, field, value) {
    currentTasks[i][field] = value;
};

window.moveTask = function(i, dir) {
    const newI = i + dir;
    if (newI < 0 || newI >= currentTasks.length) return;
    [currentTasks[i], currentTasks[newI]] = [currentTasks[newI], currentTasks[i]];
    renderCurrentTasks();
};

window.removeTask = function(i) {
    currentTasks.splice(i, 1);
    renderCurrentTasks();
};

function calculateProgress(tasks) {
    if (!tasks || tasks.length === 0) return 0;
    const done = tasks.filter(t => t.completada).length;
    return Math.round((done / tasks.length) * 100);
}

// ==================== GUARDAR ====================
async function saveProject() {
    if (!(await checkSession())) return;
    const motivo = document.getElementById('projectTitle').value.trim() || "Sin título";
    const descripcion = document.getElementById('description').value.trim();
    const catInput = document.getElementById('category').value.trim();
    const fechaInicio = document.getElementById('startDate').value;
    const fechaFin = document.getElementById('endDate').value;

    // Procesamos a array de forma limpia
    let tagsArray = processTags(catInput, "", "");

    // Forzar etiqueta #activos si es un proyecto nuevo
    if (!currentRkey) {
        tagsArray = processTags(tagsArray, "", "#activos");
    }

    const rkey = currentRkey || Date.now().toString(36) + Math.random().toString(36).substr(2);

    try {
        await fetch('https://bsky.social/xrpc/com.atproto.repo.putRecord', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${session.jwt}` },
            body: JSON.stringify({
                repo: session.did,
                collection: "com.alba.kron",
                rkey: rkey,
                record: {
                    $type: "com.alba.kron",
                    activo: true,
                    estado: "activo",
                    motivo: motivo,
                    descripcion: descripcion,
                    categoria: tagsArray, // Ahora se guarda como un Array real
                    fechaInicio: fechaInicio,
                    fechaFin: fechaFin,
                    tareas: currentTasks,
                    porcentaje: calculateProgress(currentTasks),
                                 createdAt: new Date().toISOString(),
                                 updatedAt: new Date().toISOString()
                }
            })
        });
        alert("Proyecto guardado correctamente");
        clearEditor();
        loadActiveProjects();
        loadArchive();
    } catch (e) { alert("Error al guardar: " + e.message); }
}

// ==================== AUTO ARCHIVAR ====================
async function autoExpireProject(rkey, record) {
    record.activo = false;
    record.estado = "vencido";
    record.categoria = processTags(record.categoria, "#activos", "#vencidos");
    record.updatedAt = new Date().toISOString();

    try {
        await fetch('https://bsky.social/xrpc/com.atproto.repo.putRecord', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${session.jwt}` },
            body: JSON.stringify({ repo: session.did, collection: "com.alba.kron", rkey, record })
        });
    } catch (e) {
        console.error("Error auto-archivando vencido", e);
    }
}

// ==================== CARGAR ACTIVOS ====================
async function loadActiveProjects() {
    const container = document.getElementById('activeProjects');
    container.innerHTML = "<p>Cargando...</p>";
    try {
        const resp = await fetch(`https://bsky.social/xrpc/com.atproto.repo.listRecords?repo=${session.did}&collection=com.alba.kron&limit=50`, {
            headers: { 'Authorization': `Bearer ${session.jwt}` }
        });
        const data = await resp.json();

        const activeRaw = data.records.filter(r => r.value.activo === true);
        const validActive = [];
        let archivedCount = 0;

        for (const rec of activeRaw) {
            const rkey = rec.uri.split('/').pop();
            const p = rec.value;

            if (p.fechaFin && isExpired(p.fechaFin)) {
                await autoExpireProject(rkey, p);
                archivedCount++;
            } else {
                validActive.push(rec);
            }
        }

        if (archivedCount > 0) loadArchive();

        container.innerHTML = '';
        if (validActive.length === 0) {
            container.innerHTML = "<p>No tienes proyectos activos.</p>";
            return;
        }

        validActive.forEach(rec => {
            const rkey = rec.uri.split('/').pop();
            const p = rec.value;
            const total = p.tareas ? p.tareas.length : 0;
            const pending = total - (p.tareas ? p.tareas.filter(t => t.completada).length : 0);
            const progress = p.porcentaje || calculateProgress(p.tareas);

            // Renderizamos el array visualmente como string con espacios
            const catDisplay = Array.isArray(p.categoria) ? p.categoria.join(' ') : (p.categoria || '');

            const card = document.createElement('div');
            card.className = 'project-card';
            card.innerHTML = `
            <div class="project-header" onclick="toggleExpand(this)">
            <div class="project-info">
            <strong>${p.motivo}</strong>
            <span>${catDisplay}</span>
            <span>${progress}% • ${pending} pendientes</span>
            <span>Vence en: ${daysRemaining(p.fechaFin)}</span>
            </div>
            <span class="toggle-btn">+</span>
            </div>
            <div class="project-details">
            <p><strong>Descripción:</strong> ${p.descripcion || 'Sin descripción'}</p>
            <div class="checklist">
            ${p.tareas ? p.tareas.map((t, i) => `
                <label>
                <input type="checkbox" ${t.completada ? 'checked' : ''} onchange="toggleTaskDone('${rkey}', ${i}, this.checked)">
                ${t.nombre} ${t.fecha ? `— ${t.fecha}` : ''}
                </label>`).join('') : ''}
                </div>
                <div class="actions">
                <button onclick="editProject('${rkey}')">Editar</button>
                <button onclick="finishProject('${rkey}')">Terminar</button>
                <button onclick="deleteProject('${rkey}')">Eliminar</button>
                <button onclick="publishProject('${rkey}', '${p.motivo}')">Publicar</button>
                </div>
                </div>`;
                container.appendChild(card);
        });
    } catch (e) { container.innerHTML = "<p>Error al cargar.</p>"; }
}

window.toggleExpand = function(header) {
    const card = header.parentElement;
    card.classList.toggle('expanded');
    header.querySelector('.toggle-btn').textContent = card.classList.contains('expanded') ? '−' : '+';
};

window.toggleTaskDone = async function(rkey, taskIndex, isDone) {
    if (!(await checkSession())) return;
    try {
        const getResp = await fetch(`https://bsky.social/xrpc/com.atproto.repo.getRecord?repo=${session.did}&collection=com.alba.kron&rkey=${rkey}`, {
            headers: { 'Authorization': `Bearer ${session.jwt}` }
        });
        const data = await getResp.json();
        const record = data.value;
        record.tareas[taskIndex].completada = isDone;
        record.porcentaje = calculateProgress(record.tareas);
        record.updatedAt = new Date().toISOString();

        await fetch('https://bsky.social/xrpc/com.atproto.repo.putRecord', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${session.jwt}` },
            body: JSON.stringify({ repo: session.did, collection: "com.alba.kron", rkey, record })
        });
        loadActiveProjects();
    } catch (e) { alert("Error al actualizar tarea"); }
};

// ==================== TERMINAR ====================
window.finishProject = async function(rkey) {
    if (!(await checkSession())) return;
    if (!confirm("¿Marcar proyecto como terminado y enviarlo al archivo?")) return;
    try {
        const getResp = await fetch(`https://bsky.social/xrpc/com.atproto.repo.getRecord?repo=${session.did}&collection=com.alba.kron&rkey=${rkey}`, {
            headers: { 'Authorization': `Bearer ${session.jwt}` }
        });
        const data = await getResp.json();
        const record = data.value;

        // Limpia #activos y agrega #terminados
        record.categoria = processTags(record.categoria, "#activos", "#terminados");

        record.activo = false;
        record.estado = "terminado";
        record.fechaCompletado = new Date().toISOString();
        record.porcentaje = calculateProgress(record.tareas);
        record.updatedAt = new Date().toISOString();

        await fetch('https://bsky.social/xrpc/com.atproto.repo.putRecord', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${session.jwt}` },
            body: JSON.stringify({ repo: session.did, collection: "com.alba.kron", rkey, record })
        });
        loadActiveProjects();
        loadArchive();
    } catch (e) { alert("Error al terminar"); }
};

// ==================== ARCHIVO ====================
async function loadArchive() {
    const container = document.getElementById('archiveList');
    container.innerHTML = "<p>Cargando archivo...</p>";
    try {
        const resp = await fetch(`https://bsky.social/xrpc/com.atproto.repo.listRecords?repo=${session.did}&collection=com.alba.kron&limit=50`, {
            headers: { 'Authorization': `Bearer ${session.jwt}` }
        });
        const data = await resp.json();
        container.innerHTML = '';
        const archived = data.records.filter(r => r.value.activo === false);

        if (archived.length === 0) {
            container.innerHTML = "<p>El archivo está vacío.</p>";
            return;
        }

        archived.forEach(rec => {
            const rkey = rec.uri.split('/').pop();
            const p = rec.value;
            const progress = p.porcentaje || 0;
            const catDisplay = Array.isArray(p.categoria) ? p.categoria.join(' ') : (p.categoria || '');

            let statusText = "⛔ Vencido";
            if (p.estado === "terminado") {
                const sobrante = daysRemaining(p.fechaFin, true, p.fechaCompletado);
                statusText = sobrante !== "Vencido" ? `✅ Terminado (Sobró tiempo: ${sobrante})` : `✅ Terminado (Justo a tiempo)`;
            }

            const card = document.createElement('div');
            card.className = 'project-card';
            card.innerHTML = `
            <div class="project-header" onclick="toggleExpand(this)">
            <div class="project-info">
            <strong>${p.motivo}</strong>
            <span>${catDisplay}</span>
            <span>${p.fechaInicio} → ${p.fechaFin}</span>
            <span>${progress}%</span>
            <span>${statusText}</span>
            </div>
            <span class="toggle-btn">+</span>
            </div>
            <div class="project-details">
            <p><strong>Descripción:</strong> ${p.descripcion || 'Sin descripción'}</p>
            <div class="actions">
            <button onclick="cloneToEditor('${rkey}')">Clonar</button>
            <button onclick="deleteProject('${rkey}')">Eliminar</button>
            <button onclick="publishProject('${rkey}', '${p.motivo}')">Publicar</button>
            </div>
            </div>`;
            container.appendChild(card);
        });
    } catch (e) { container.innerHTML = "<p>Error al cargar archivo.</p>"; }
};

// ==================== EDITAR Y CLONAR ====================
window.editProject = async function(rkey) {
    if (!(await checkSession())) return;
    try {
        const getResp = await fetch(`https://bsky.social/xrpc/com.atproto.repo.getRecord?repo=${session.did}&collection=com.alba.kron&rkey=${rkey}`, {
            headers: { 'Authorization': `Bearer ${session.jwt}` }
        });
        const data = await getResp.json();
        const p = data.value;
        currentRkey = rkey;
        loadDataToEditor(p);
    } catch (e) { alert("Error al editar"); }
};

window.cloneToEditor = async function(rkey) {
    if (!(await checkSession())) return;
    try {
        const getResp = await fetch(`https://bsky.social/xrpc/com.atproto.repo.getRecord?repo=${session.did}&collection=com.alba.kron&rkey=${rkey}`, {
            headers: { 'Authorization': `Bearer ${session.jwt}` }
        });
        const data = await getResp.json();
        const p = data.value;
        currentRkey = null;

        if (p.tareas) {
            p.tareas = p.tareas.map(t => ({ ...t, completada: false }));
        }

        // Limpiamos etiquetas de estado finalizadas para el clon
        let cleanTags = processTags(p.categoria, "#terminados", "");
        cleanTags = processTags(cleanTags, "#vencidos", "");
        p.categoria = cleanTags;

        loadDataToEditor(p);
    } catch (e) { alert("Error al clonar"); }
};

function loadDataToEditor(p) {
    document.getElementById('projectTitle').value = p.motivo || '';
    document.getElementById('description').value = p.descripcion || '';

    // Al cargarlo de vuelta al editor lo unimos con espacios para que sea fácil seguir tecleando
    document.getElementById('category').value = Array.isArray(p.categoria) ? p.categoria.join(' ') : (p.categoria || '');

    document.getElementById('startDate').value = p.fechaInicio || '';
    document.getElementById('endDate').value = p.fechaFin || '';
    currentTasks = JSON.parse(JSON.stringify(p.tareas || []));
    renderCurrentTasks();
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

window.deleteProject = async function(rkey) {
    if (!(await checkSession())) return;
    if (!confirm("¿Eliminar permanentemente?")) return;
    try {
        await fetch('https://bsky.social/xrpc/com.atproto.repo.deleteRecord', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${session.jwt}` },
            body: JSON.stringify({ repo: session.did, collection: "com.alba.kron", rkey })
        });
        loadActiveProjects();
        loadArchive();
    } catch (e) { alert("Error al eliminar"); }
};

window.publishProject = function(rkey, motivo) {
    const shareUrl = `${window.location.origin}/Kron/?${session.handle}&rkey=${rkey}`;
    const text = `🕰️ ${motivo}\n\n${shareUrl}`;
    window.open(`https://bsky.app/intent/compose?text=${encodeURIComponent(text)}`, '_blank');
};
