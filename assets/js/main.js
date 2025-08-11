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
  // BOTÓN FLOTANTE: modo oscuro/claro (compatible con tu sistema actual)
  var themeToggle = document.getElementById('theme-toggle');
  if (themeToggle) {
    // Refleja el estado actual al cargar
    if (document.body.classList.contains('dark-mode') || localStorage.getItem('darkmode') === 'true') {
      document.body.classList.add('dark-mode');
      themeToggle.setAttribute('aria-pressed', 'true');
    } else {
      document.body.classList.remove('dark-mode');
      themeToggle.setAttribute('aria-pressed', 'false');
    }
    themeToggle.addEventListener('click', function() {
      var isDark = document.body.classList.toggle('dark-mode');
      localStorage.setItem('darkmode', isDark ? 'true' : 'false');
      themeToggle.setAttribute('aria-pressed', isDark ? 'true' : 'false');
    });
  }
});
