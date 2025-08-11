(function () {
  const STEP = 1.2; // 20% más
  const KEY_FONT = 'fontScale';
  const KEY_THEME = 'siteTheme';
  let scale = parseFloat(localStorage.getItem(KEY_FONT)) || 1;

  const applyScale = () => {
    document.documentElement.style.fontSize = (scale * 100) + '%';
  };
  applyScale();

  // Crear panel flotante
  if (!document.getElementById('floating-controls')) {
    const panel = document.createElement('div');
    panel.id = 'floating-controls';
panel.innerHTML = `
  <button id="btn-theme" title="Cambiar tema" aria-label="Cambiar tema">
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
         stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="12" cy="12" r="5"></circle>
      <line x1="12" y1="1" x2="12" y2="3"></line>
      <line x1="12" y1="21" x2="12" y2="23"></line>
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
      <line x1="1" y1="12" x2="3" y2="12"></line>
      <line x1="21" y1="12" x2="23" y2="12"></line>
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
    </svg>
  </button>
  <button id="btn-top" title="Ir arriba" aria-label="Ir arriba">⬆</button>
  <button id="btn-font" title="Ajustar fuente" aria-label="Ajustar fuente">A±</button>
`;

    document.body.appendChild(panel);
  }

  // Botón tema (toggle body.dark-mode)
  const btnTheme = document.getElementById('btn-theme');
  btnTheme.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');
    localStorage.setItem(KEY_THEME, isDark ? 'dark' : 'light');
  });

  // Restaurar tema guardado
  const savedTheme = localStorage.getItem(KEY_THEME);
  if (savedTheme === 'dark') {
    document.body.classList.add('dark-mode');
  }

  // Botón arriba
  document.getElementById('btn-top').addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // Botón fuente
  document.getElementById('btn-font').addEventListener('click', () => {
    if (scale === 1) {
      scale = STEP;
    } else {
      scale = 1;
    }
    applyScale();
    localStorage.setItem(KEY_FONT, scale);
  });
})();
