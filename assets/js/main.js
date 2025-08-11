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
  // Tamaño de fuente: alterna entre grande y normal
  const html = document.documentElement;
  const fontBtn = document.getElementById('font-toggle');
  const bigFont = 20; // px (ajusta si quieres más grande)
  const normalFont = 16; // px
  let big = false;

  if (fontBtn) {
    fontBtn.addEventListener('click', function() {
      big = !big;
      html.style.fontSize = (big ? bigFont : normalFont) + 'px';
      fontBtn.setAttribute('aria-pressed', big);
      // Opcional: guarda preferencia en localStorage
      localStorage.setItem('fontBig', big ? '1' : '0');
    });
    // Inicializa según preferencia
    big = localStorage.getItem('fontBig') === '1';
    html.style.fontSize = (big ? bigFont : normalFont) + 'px';
    fontBtn.setAttribute('aria-pressed', big);
  }

  // Tema (modo claro/oscuro)
  const themeBtn = document.getElementById('theme-toggle');
  if (themeBtn) {
    themeBtn.addEventListener('click', function() {
      document.body.classList.toggle('dark-mode');
      themeBtn.setAttribute('aria-pressed', document.body.classList.contains('dark-mode'));
      // Opcional: guarda preferencia en localStorage
      localStorage.setItem('darkMode', document.body.classList.contains('dark-mode') ? '1' : '0');
    });
    // Inicializa tema según preferencia previa
    if (localStorage.getItem('darkMode') === '1') {
      document.body.classList.add('dark-mode');
      themeBtn.setAttribute('aria-pressed', 'true');
    }
  }
});
