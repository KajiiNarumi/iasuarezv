(function () {
  const STEP = 1.2; // 20% más
  const KEY_FONT = 'fontScale';
  const KEY_THEME = 'siteTheme';
  const KEY_PANEL = 'panelCollapsed';

  let scale = parseFloat(localStorage.getItem(KEY_FONT)) || 1;

  const applyScale = () => {
    document.documentElement.style.fontSize = (scale * 100) + '%';
  };
  applyScale();

  const btnTheme = document.getElementById('btn-theme');
  const btnTop = document.getElementById('btn-top');
  const btnFont = document.getElementById('btn-font');
  const iconSun = document.getElementById('icon-sun');
  const iconMoon = document.getElementById('icon-moon');
  const panel = document.getElementById('floating-controls');
  const btnToggle = document.getElementById('panel-toggle');

  // Restaurar tema guardado
  const savedTheme = localStorage.getItem(KEY_THEME);
  if (savedTheme === 'dark') {
    document.body.classList.add('dark-mode');
    iconSun.style.display = 'inline';
    iconMoon.style.display = 'none';
  }

  // Restaurar estado del panel
  if (localStorage.getItem(KEY_PANEL) === 'false') {
    panel.classList.remove('collapsed');
    btnToggle.textContent = '>';
  }

  // Botón tema
  btnTheme.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');
    iconSun.style.display = isDark ? 'inline' : 'none';
    iconMoon.style.display = isDark ? 'none' : 'inline';
    localStorage.setItem(KEY_THEME, isDark ? 'dark' : 'light');
  });

  // Botón subir
  btnTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // Botón fuente
  btnFont.addEventListener('click', () => {
    if (scale === 1) {
      scale = STEP;
      btnFont.textContent = 'A-';
    } else {
      scale = 1;
      btnFont.textContent = 'A+';
    }
    applyScale();
    localStorage.setItem(KEY_FONT, scale);
  });

  // Botón mostrar/ocultar panel
  btnToggle.addEventListener('click', () => {
    panel.classList.toggle('collapsed');
    const collapsed = panel.classList.contains('collapsed');
    btnToggle.textContent = collapsed ? '<' : '>';
    localStorage.setItem(KEY_PANEL, collapsed);
  });
})();
