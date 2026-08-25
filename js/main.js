/* Портфолио Lime — reveal, параллакс, счётчики, меню, форма */
(function () {
  'use strict';

  var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* --- Состояние шапки при скролле --- */
  var nav = document.getElementById('nav');
  if (nav) {
    var onScrollHeader = function () {
      nav.classList.toggle('is-scrolled', window.scrollY > 8);
    };
    window.addEventListener('scroll', onScrollHeader, { passive: true });
    onScrollHeader();
  }

  /* --- Мобильное меню --- */
  var burger = document.getElementById('navBurger');
  var navLinks = document.getElementById('navLinks');
  if (burger && navLinks) {
    burger.addEventListener('click', function () {
      var open = navLinks.classList.toggle('is-open');
      burger.classList.toggle('is-open', open);
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        navLinks.classList.remove('is-open');
        burger.classList.remove('is-open');
        burger.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* --- Появление при скролле со stagger внутри групп --- */
  var revealEls = Array.prototype.slice.call(document.querySelectorAll('[data-reveal]'));
  if (prefersReduced || !('IntersectionObserver' in window) || !revealEls.length) {
    document.body.classList.add('reveal');
    revealEls.forEach(function (el) { el.classList.add('is-visible'); });
  } else {
    document.body.classList.add('reveal');

    /* Задержка внутри групп: каждый следующий элемент группы чуть позже */
    document.querySelectorAll('[data-reveal-group]').forEach(function (group) {
      var items = group.querySelectorAll(':scope [data-reveal]');
      items.forEach(function (el, i) {
        el.style.transitionDelay = (i * 90) + 'ms';
      });
    });

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.14, rootMargin: '0px 0px -6% 0px' });

    revealEls.forEach(function (el) { io.observe(el); });
  }

  /* --- Анимированные счётчики --- */
  var counters = Array.prototype.slice.call(document.querySelectorAll('[data-count]'));
  if (counters.length && !prefersReduced && 'IntersectionObserver' in window) {
    var counterIO = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var el = entry.target;
        counterIO.unobserve(el);
        var target = parseInt(el.getAttribute('data-count'), 10);
        var start = null;
        var duration = 1300;
        function step(ts) {
          if (!start) start = ts;
          var p = Math.min((ts - start) / duration, 1);
          var eased = 1 - Math.pow(1 - p, 3); /* easeOutCubic */
          el.textContent = Math.round(target * eased);
          if (p < 1) requestAnimationFrame(step);
          else el.textContent = target;
        }
        requestAnimationFrame(step);
      });
    }, { threshold: 0.6 });
    counters.forEach(function (el) { counterIO.observe(el); });
  } else {
    counters.forEach(function (el) { el.textContent = el.getAttribute('data-count'); });
  }

  /* --- Лёгкий параллакс для hero-арта --- */
  var heroArt = document.querySelector('[data-parallax]');
  if (heroArt && !prefersReduced) {
    var ticking = false;
    var maxShift = 26;
    function update() {
      var rect = heroArt.getBoundingClientRect();
      var vh = window.innerHeight || 1;
      /* Прогресс прохождения арта через центр экрана: -1 .. 1 */
      var progress = (rect.top + rect.height / 2 - vh / 2) / (vh / 2 + rect.height / 2);
      var shift = Math.max(-1, Math.min(1, progress)) * maxShift;
      heroArt.style.transform = 'translateY(' + shift.toFixed(1) + 'px)';
      ticking = false;
    }
    function onScroll() {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    update();
  }

  /* --- Форма контактов --- */
  var form = document.getElementById('contactForm');
  var note = document.getElementById('contactNote');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var name = form.elements.name.value.trim();
      var contact = form.elements.contact.value.trim();
      var msg = form.elements.message.value.trim();
      if (!name || !contact || !msg) {
        var first = form.elements.name;
        if (!name) first = form.elements.name;
        else if (!contact) first = form.elements.contact;
        else first = form.elements.message;
        first.focus();
        first.style.borderColor = '#f87171';
        return;
      }
      form.querySelectorAll('input, textarea').forEach(function (f) { f.style.borderColor = ''; });
      note.hidden = false;
      form.reset();
      if (!prefersReduced) note.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
  }
})();
