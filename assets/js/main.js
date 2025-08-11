$(document).ready(function() {
  // main menu toggle
  var toggleButton = document.getElementById("menu-toggle");
  var menu = document.getElementById("primary-nav");

  if (toggleButton && menu) {
    toggleButton.addEventListener("click", function() {
      menu.classList.toggle("js-menu-is-open");
    });
  }

  // initialize smooth scroll
  $("a").smoothScroll({ offset: -20 });

  // add lightbox class to all image links
  $("a[href$='.jpg'], a[href$='.png'], a[href$='.gif']").attr("data-lity", "");
});






(function () {
  const STEP = 0.1;
  const MIN = 0.7;
  const MAX = 1.5;
  const KEY = 'siteFontScale';

  let scale = parseFloat(localStorage.getItem(KEY)) || 1;
  const apply = s => {
    document.documentElement.style.fontSize = (s * 100) + '%';
  };
  apply(scale);

  // Insertar botones + y − dentro de #theme-toggle
  const themeToggle = document.getElementById('theme-toggle');
  if (themeToggle) {
    const minusBtn = document.createElement('span');
    minusBtn.textContent = '−';
    minusBtn.className = 'font-btn';
    minusBtn.title = 'Reducir letra';

    const plusBtn = document.createElement('span');
    plusBtn.textContent = '+';
    plusBtn.className = 'font-btn';
    plusBtn.title = 'Aumentar letra';

    // Guardamos el texto original del enlace Theme
    const label = document.createElement('span');
    label.textContent = themeToggle.textContent.trim();
    themeToggle.textContent = '';
    
    themeToggle.append(minusBtn, label, plusBtn);

    // Eventos
    minusBtn.addEventListener('click', e => {
      e.stopPropagation();
      e.preventDefault();
      scale = Math.max(MIN, +(scale - STEP).toFixed(2));
      apply(scale);
      localStorage.setItem(KEY, scale);
    });

    plusBtn.addEventListener('click', e => {
      e.stopPropagation();
      e.preventDefault();
      scale = Math.min(MAX, +(scale + STEP).toFixed(2));
      apply(scale);
      localStorage.setItem(KEY, scale);
    });
  }
})();
