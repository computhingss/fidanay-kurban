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

  // Galeri lightbox
  var galleryItems = document.querySelectorAll('.gallery-item');
  var lightbox = document.getElementById('galleryLightbox');
  var lightboxImage = document.getElementById('galleryLightboxImage');
  var lightboxCounter = document.getElementById('galleryLightboxCounter');
  var lightboxClose = lightbox ? lightbox.querySelector('.gallery-lightbox-close') : null;
  var lightboxPrev = lightbox ? lightbox.querySelector('.gallery-lightbox-prev') : null;
  var lightboxNext = lightbox ? lightbox.querySelector('.gallery-lightbox-next') : null;
  var galleryImages = [];
  var currentGalleryIndex = 0;

  galleryItems.forEach(function (item) {
    var img = item.querySelector('img');
    if (img) {
      galleryImages.push({
        src: img.getAttribute('src'),
        alt: img.getAttribute('alt') || ''
      });
    }
  });

  function showGalleryImage(index) {
    if (!lightbox || !lightboxImage || !galleryImages.length) {
      return;
    }

    currentGalleryIndex = (index + galleryImages.length) % galleryImages.length;
    var current = galleryImages[currentGalleryIndex];

    lightboxImage.src = current.src;
    lightboxImage.alt = current.alt;

    if (lightboxCounter) {
      lightboxCounter.textContent = (currentGalleryIndex + 1) + ' / ' + galleryImages.length;
    }
  }

  function openLightbox(index) {
    if (!lightbox) {
      return;
    }

    showGalleryImage(index);
    lightbox.hidden = false;
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    if (!lightbox) {
      return;
    }

    lightbox.hidden = true;
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    lightboxImage.src = '';
  }

  galleryItems.forEach(function (item) {
    item.addEventListener('click', function () {
      var index = parseInt(item.getAttribute('data-gallery-index'), 10) || 0;
      openLightbox(index);
    });
  });

  if (lightboxClose) {
    lightboxClose.addEventListener('click', closeLightbox);
  }

  if (lightboxPrev) {
    lightboxPrev.addEventListener('click', function () {
      showGalleryImage(currentGalleryIndex - 1);
    });
  }

  if (lightboxNext) {
    lightboxNext.addEventListener('click', function () {
      showGalleryImage(currentGalleryIndex + 1);
    });
  }

  if (lightbox) {
    lightbox.addEventListener('click', function (event) {
      if (event.target === lightbox) {
        closeLightbox();
      }
    });
  }

  document.addEventListener('keydown', function (event) {
    if (!lightbox || lightbox.hidden) {
      return;
    }

    if (event.key === 'Escape') {
      closeLightbox();
    } else if (event.key === 'ArrowLeft') {
      showGalleryImage(currentGalleryIndex - 1);
    } else if (event.key === 'ArrowRight') {
      showGalleryImage(currentGalleryIndex + 1);
    }
  });

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
