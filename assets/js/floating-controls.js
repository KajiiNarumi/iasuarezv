(function () {
  const STEP = 1.2; // 20% más
  const KEY_FONT = 'fontScale';
  const KEY_THEME = 'siteTheme';
  let scale = parseFloat(localStorage.getItem(KEY_FONT)) || 1;

  const applyScale = () => {
    document.documentElement.style.fontSize = (scale * 100) + '%';
    document.getElementById('btn-font').textContent = (scale === 1) ? 'A+' : 'A-';
  };
  applyScale();

  // Crear panel flotante
  if (!document.getElementById('floating-controls')) {
    const panel = document.createElement('div');
    panel.id = 'floating-controls';
    panel.innerHTML = `
      <button id="btn-top" title="Ir arriba" aria-label="Ir arriba">^</button>
      <button id="btn-theme" title="Cambiar tema" aria-label="Cambiar tema">
        <span id="icon-sun" style="display:none;">☀️</span>
        <span id="icon-moon" style="display:none;">🌙</span>
      </button>
      <button id="btn-font" title="Ajustar fuente" aria-label="Ajustar fuente">A+</button>
    `;
    document.body.appendChild(panel);
  }

  const btnTheme = document.getElementById('btn-theme');
  const iconSun = document.getElementById('icon-sun');
  const iconMoon = document.getElementById('icon-moon');

  // Restaurar tema guardado
  const savedTheme = localStorage.getItem(KEY_THEME);
  if (savedTheme === 'dark') {
    document.body.classList.add('dark-mode');
    iconMoon.style.display = 'inline';
  } else {
    iconSun.style.display = 'inline';
  }

  // Botón tema
  btnTheme.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');
    localStorage.setItem(KEY_THEME, isDark ? 'dark' : 'light');
    if (isDark) {
      iconSun.style.display = 'none';
      iconMoon.style.display = 'inline';
    } else {
      iconSun.style.display = 'inline';
      iconMoon.style.display = 'none';
    }
  });

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
