(function () {
  'use strict';

  // Yıl güncelle
  var yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // Navbar scroll efekti
  var nav = document.getElementById('mainNav');
  if (nav) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 50) {
        nav.classList.add('scrolled');
      } else {
        nav.classList.remove('scrolled');
      }
    });
  }

  // Aktif menü linki
  var sections = document.querySelectorAll('section[id], header[id]');
  var navLinks = document.querySelectorAll('#navMenu .nav-link');

  function setActiveNav() {
    var scrollPos = window.scrollY + 100;

    sections.forEach(function (section) {
      var top = section.offsetTop;
      var height = section.offsetHeight;
      var id = section.getAttribute('id');

      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach(function (link) {
          link.classList.remove('active');
          if (link.getAttribute('href') === '#' + id) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', setActiveNav);
  setActiveNav();

  // Hero arka plan videosu
  var heroVideo = document.querySelector('.hero-video');
  if (heroVideo) {
    heroVideo.play().catch(function () {
      /* Tarayıcı otomatik oynatmayı engellerse sessizce devam et */
    });
  }

  // Mobil menü: tıklayınca kapat
  navLinks.forEach(function (link) {
    link.addEventListener('click', function () {
      var collapse = document.getElementById('navMenu');
      if (collapse && collapse.classList.contains('show')) {
        var bsCollapse = bootstrap.Collapse.getInstance(collapse);
        if (bsCollapse) {
          bsCollapse.hide();
        }
      }
    });
  });
})();
