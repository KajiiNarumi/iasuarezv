document.addEventListener("DOMContentLoaded", () => {

    // Referencias del DOM
    const authTrigger = document.getElementById('authTrigger');
    const loginModal = document.getElementById('loginModal');
    const closeModalBtn = document.getElementById('closeModalBtn');
    const loginBtn = document.getElementById('loginBtn');

    const identifierInput = document.getElementById('identifier');
    const passwordInput = document.getElementById('password');

    // 1. Verificar el estado de la sesión al cargar
    const checkSession = () => {
        const savedSession = localStorage.getItem('atprotoSession');

        if (savedSession) {
            // Usuario conectado
            authTrigger.textContent = 'Logout';
            authTrigger.onclick = logout;
        } else {
            // Usuario no conectado
            authTrigger.textContent = 'Login';
            authTrigger.onclick = toggleModal;
        }
    };

    // 2. Controladores del Modal
    const toggleModal = () => {
        loginModal.classList.toggle('active');
    };

    closeModalBtn.addEventListener('click', toggleModal);

    // Cerrar el modal al hacer clic fuera de la caja de contenido
    loginModal.addEventListener('click', (e) => {
        if (e.target === loginModal) {
            toggleModal();
        }
    });

    // 3. Lógica de Autenticación con AT Protocol
    const login = async () => {
        const identifier = identifierInput.value.trim();
        const password = passwordInput.value.trim();

        if (!identifier || !password) {
            alert("Por favor, completa tu Handle y App Password.");
            return;
        }

        // Cambiar texto del botón para feedback visual
        const originalBtnText = loginBtn.textContent;
        loginBtn.textContent = "Conectando...";
        loginBtn.disabled = true;

        try {
            const resp = await fetch('https://bsky.social/xrpc/com.atproto.server.createSession', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({ identifier, password })
            });

            const data = await resp.json();

            if (!resp.ok) {
                throw new Error(data.message || "Credenciales incorrectas");
            }

            // Guardar credenciales de forma global
            const sessionData = {
                did: data.did,
                jwt: data.accessJwt,
                handle: data.handle
            };

            localStorage.setItem('atprotoSession', JSON.stringify(sessionData));

            // Éxito: Limpiar inputs, cerrar modal y actualizar UI
            identifierInput.value = '';
            passwordInput.value = '';
            toggleModal();
            checkSession();

            console.log(`Sesión iniciada con éxito para ${data.handle}`);

        } catch (error) {
            alert("Error al iniciar sesión: " + error.message);
        } finally {
            // Restaurar estado del botón
            loginBtn.textContent = originalBtnText;
            loginBtn.disabled = false;
        }
    };

    // Asignar evento de clic al botón del modal
    loginBtn.addEventListener('click', login);

    // Permitir "Enter" en los campos de texto para iniciar sesión
    passwordInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') login();
    });

        // 4. Lógica de Cierre de Sesión
        const logout = () => {
            if(confirm("¿Estás seguro de que deseas cerrar sesión?")) {
                localStorage.removeItem('atprotoSession');
                checkSession();
                console.log("Sesión cerrada");
                // Opcional: location.reload(); si quieres forzar una recarga total
            }
        };

        // Inicializar estado de la cabecera
        if (authTrigger) {
            checkSession();
        }

});


// ==================== REGISTRO DE PWA ====================
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('./sw.js')
        .then(() => console.log('Alba PWA registrada correctamente.'))
        .catch(err => console.error('Error al registrar Service Worker:', err));
    });
}
