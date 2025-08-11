(function () {
  const STEP = 1.2; // 20% más
  const KEY = 'fontScale';
  let scale = parseFloat(localStorage.getItem(KEY)) || 1;

  const applyScale = () => {
    document.documentElement.style.fontSize = (scale * 100) + '%';
  };
  applyScale();

  // Crear el panel si no existe
  if (!document.getElementById('floating-controls')) {
    const panel = document.createElement('div');
    panel.id = 'floating-controls';
    panel.innerHTML = `
      <button id="btn-theme" title="Cambiar tema">🌗</button>
      <button id="btn-top" title="Ir arriba">⬆</button>
      <button id="btn-font" title="Ajustar fuente">A±</button>
    `;
    document.body.appendChild(panel);
  }

  // Botón tema
  document.getElementById('btn-theme').addEventListener('click', () => {
    const html = document.documentElement;
    const current = html.getAttribute('data-theme') || 'light';
    html.setAttribute('data-theme', current === 'light' ? 'dark' : 'light');
    localStorage.setItem('theme', html.getAttribute('data-theme'));
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
    localStorage.setItem(KEY, scale);
  });

  // Mantener tema guardado
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    document.documentElement.setAttribute('data-theme', savedTheme);
  }
})();
