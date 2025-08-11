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



(function() {
  let currentSize = 100; // porcentaje inicial
  const html = document.documentElement;

  document.getElementById('increase-font').addEventListener('click', () => {
    currentSize += 10;
    html.style.fontSize = currentSize + '%';
  });

  document.getElementById('decrease-font').addEventListener('click', () => {
    currentSize -= 10;
    html.style.fontSize = currentSize + '%';
  });
})();

