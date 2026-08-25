/* PULSE — аккордеон расписания, форма записи, мобильное меню */
(function () {
  'use strict';

  /* Аккордеон расписания */
  document.querySelectorAll('.sch-card').forEach(function (card) {
    card.addEventListener('click', function () {
      var wasOpen = card.classList.contains('is-open');
      document.querySelectorAll('.sch-card').forEach(function (c) { c.classList.remove('is-open'); });
      if (!wasOpen) card.classList.add('is-open');
    });
  });

  /* Форма записи */
  var form = document.getElementById('signupForm');
  var success = document.getElementById('signupSuccess');
  var fields = form.querySelectorAll('input, select');
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var name = form.elements.name.value.trim();
    var phone = form.elements.phone.value.trim();
    if (!name || !phone) {
      success.hidden = true;
      fields.forEach(function (f) { f.style.borderColor = ''; });
      if (!name) { form.elements.name.style.borderColor = '#f87171'; form.elements.name.focus(); }
      else { form.elements.phone.style.borderColor = '#f87171'; form.elements.phone.focus(); }
      return;
    }
    fields.forEach(function (f) { f.style.borderColor = ''; });
    success.hidden = false;
    form.reset();
    success.scrollIntoView({ behavior: 'smooth', block: 'center' });
  });

  /* Мобильное меню */
  var burger = document.getElementById('navBurger');
  var links = document.getElementById('navLinks');
  burger.addEventListener('click', function () { links.classList.toggle('is-open'); });
  links.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () { links.classList.remove('is-open'); });
  });

  /* Появление блоков при скролле */
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var targets = document.querySelectorAll('.section, .sch-card, .coach, .price-card');
  if (!reduced && 'IntersectionObserver' in window && targets.length) {
    document.body.classList.add('reveal');
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    targets.forEach(function (el) { io.observe(el); });
  }
})();
