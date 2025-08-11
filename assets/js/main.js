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

<script>
(function() {
  const html = document.documentElement;
  const minScale = -2;
  const maxScale = 3;
  const baseSize = 16; // px
  let scale = Number(localStorage.getItem('fontScale')) || 0;

  function applyFontSize() {
    html.style.fontSize = (baseSize + scale * 2) + 'px';
  }

  function saveScale() {
    localStorage.setItem('fontScale', scale);
  }

  // Busca los elementos por ID
  const inc = document.getElementById('font-increase');
  const dec = document.getElementById('font-decrease');

  if (inc && dec) {
    inc.addEventListener('click', function(e) {
      e.preventDefault();
      if (scale < maxScale) {
        scale++;
        applyFontSize();
        saveScale();
      }
    });
    dec.addEventListener('click', function(e) {
      e.preventDefault();
      if (scale > minScale) {
        scale--;
        applyFontSize();
        saveScale();
      }
    });

    // Aplica la fuente al cargar la página
    applyFontSize();
  }
})();
</script>
