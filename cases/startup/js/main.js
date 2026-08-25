/* Nimbus — интерактив: табы, бургер-меню */
(function () {
  'use strict';

  /* Табы в блоке «Возможности» */
  var tabs = document.querySelectorAll('.tabs__btn');
  tabs.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var name = btn.dataset.tab;

      tabs.forEach(function (b) { b.classList.remove('is-active'); });
      btn.classList.add('is-active');

      document.querySelectorAll('.tab-panel').forEach(function (panel) {
        panel.classList.toggle('is-active', panel.id === 'tab-' + name);
      });
    });
  });

  /* Мобильное меню */
  var burger = document.getElementById('navBurger');
  var links = document.getElementById('navLinks');
  if (burger && links) {
    burger.addEventListener('click', function () {
      links.classList.toggle('is-open');
    });
    links.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () { links.classList.remove('is-open'); });
    });
  }

  /* Появление блоков при скролле */
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var revealTargets = document.querySelectorAll('.section, .mockup, .price-card, .faq__item');
  if (!reduced && 'IntersectionObserver' in window && revealTargets.length) {
    document.body.classList.add('reveal');
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealTargets.forEach(function (el) { io.observe(el); });
  }
})();
