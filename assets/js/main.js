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



document.addEventListener("DOMContentLoaded", function() {
  // --- Botón de tamaño de fuente global ---
  var fontToggle = document.getElementById('font-toggle');
  var html = document.documentElement;
  // Guardamos el tamaño ORIGINAL
  var originalFontSize = getComputedStyle(html).fontSize;
  var originalPx = parseInt(originalFontSize, 10);
  // Si el usuario ya usó el widget, respetar su preferencia:
  var big = localStorage.getItem('fontBig') === '1';
  var newPx = originalPx + 4;
  if (big) html.style.fontSize = newPx + 'px';

  if(fontToggle) {
    fontToggle.setAttribute('aria-pressed', big);
    fontToggle.addEventListener('click', function() {
      var actualPx = parseInt(getComputedStyle(html).fontSize, 10);
      // Si está en original, sube +4px. Si está grande, regresa.
      if(actualPx === originalPx) {
        html.style.fontSize = newPx + 'px';
        localStorage.setItem('fontBig', '1');
        fontToggle.setAttribute('aria-pressed', true);
      } else {
        html.style.fontSize = originalPx + 'px';
        localStorage.setItem('fontBig', '0');
        fontToggle.setAttribute('aria-pressed', false);
      }
    });
  }

  // --- Botón de tema claro/oscuro usando tu clase y localStorage ---
  var themeToggle = document.getElementById('theme-toggle');
  if(themeToggle) {
    // Inicial: respeta la preferencia guardada
    if(localStorage.getItem('darkmode') === 'true') {
      document.body.classList.add('dark-mode');
      themeToggle.setAttribute('aria-pressed', true);
    } else {
      themeToggle.setAttribute('aria-pressed', false);
    }
    themeToggle.addEventListener('click', function() {
      var isDark = document.body.classList.toggle('dark-mode');
      localStorage.setItem('darkmode', isDark ? 'true' : 'false');
      themeToggle.setAttribute('aria-pressed', isDark);
    });
  }
});
