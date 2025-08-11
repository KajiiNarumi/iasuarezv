(function () {
  const STEP = 1.2; // 20% más
  const KEY_FONT = 'fontScale';
  const KEY_THEME = 'siteTheme';
  let scale = parseFloat(localStorage.getItem(KEY_FONT)) || 1;
  let menuOpen = false;

  const applyScale = () => {
    document.documentElement.style.fontSize = (scale * 100) + '%';
    const fontBtn = document.getElementById('btn-font');
    if (fontBtn) fontBtn.textContent = (scale === 1) ? 'A+' : 'A-';
  };
  applyScale();

  if (!document.getElementById('floating-controls')) {
    const panel = document.createElement('div');
    panel.id = 'floating-controls';
    panel.innerHTML = `
      <button id="btn-menu" title="Menú" aria-label="Menú">&lt;</button>
      <div id="menu-items" class="hidden">
        <button id="btn-top" title="Ir arriba" aria-label="Ir arriba">^</button>
        <button id="btn-theme" title="Cambiar tema" aria-label="Cambiar tema">
          <svg id="theme-icon" width="18" height="18" viewBox="0 0 24 24" fill="none"
               stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></svg>
        </button>
        <button id="btn-font" title="Ajustar fuente" aria-label="Ajustar fuente">A+</button>
      </div>
    `;
    document.body.appendChild(panel);
  }

  const themeIcon = document.getElementById('theme-icon');
  const setThemeIcon = (isDark) => {
    themeIcon.innerHTML = isDark
      ? `<path d="M21 12.79A9 9 0 1 1 11.21 3
            a7 7 0 0 0 9.79 9.79z"></path>` // luna
      : `<circle cx="12" cy="12" r="5"></circle>
         <line x1="12" y1="1" x2="12" y2="3"></line>
         <line x1="12" y1="21" x2="12" y2="23"></line>
         <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
         <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
         <line x1="1" y1="12" x2="3" y2="12"></line>
         <line x1="21" y1="12" x2="23" y2="12"></line>
         <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
         <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>`; // sol
  };

  // Restaurar tema
  const savedTheme = localStorage.getItem(KEY_THEME);
  const isDarkSaved = savedTheme === 'dark';
  if (isDarkSaved) document.body.classList.add('dark-mode');
  setThemeIcon(isDarkSaved);

  // Evento menú desplegable
  document.getElementById('btn-menu').addEventListener('click', () => {
    menuOpen = !menuOpen;
    document.getElementById('menu-items').classList.toggle('hidden', !menuOpen);
    document.getElementById('btn-menu').innerHTML = menuOpen ? '&gt;' : '&lt;';
  });

  // Tema
  document.getElementById('btn-theme').addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');
    localStorage.setItem(KEY_THEME, isDark ? 'dark' : 'light');
    setThemeIcon(isDark);
  });

  // Subir
  document.getElementById('btn-top').addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // Fuente
  document.getElementById('btn-font').addEventListener('click', () => {
    scale = (scale === 1) ? STEP : 1;
    applyScale();
    localStorage.setItem(KEY_FONT, scale);
  });
})();
