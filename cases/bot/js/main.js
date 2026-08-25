/* LimeBot — анимированный чат, reveal, меню, форма */
(function () {
  'use strict';

  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* --- Анимированный диалог в телефоне --- */
  var chat = document.getElementById('phoneChat');
  var script = [
    { dir: 'in',  text: 'Здравствуйте! Нужен бот для приёма заявок.', time: '14:02' },
    { dir: 'out', text: 'Привет! Я LimeBot. Приму заявку, отвечу на вопросы и оформлю оплату прямо в чате.', time: '14:02' },
    { dir: 'in',  text: 'Отлично. Как запустить?', time: '14:03' },
    { dir: 'out', text: 'Напишите @lime_dev — соберу бота за 5–10 дней.', time: '14:03' },
    { dir: 'out', text: 'Готов принимать заявки 24/7.', time: '14:04' }
  ];

  function makeMsg(m) {
    var el = document.createElement('div');
    el.className = 'msg msg--' + m.dir;
    var t = document.createElement('span');
    t.className = 'msg__time';
    t.textContent = m.time;
    el.textContent = m.text;
    el.appendChild(t);
    return el;
  }

  var typing = null;
  function showTyping() {
    if (typing) return;
    typing = document.createElement('div');
    typing.className = 'typing';
    typing.innerHTML = '<i></i><i></i><i></i>';
    chat.appendChild(typing);
  }
  function hideTyping() {
    if (typing) { typing.remove(); typing = null; }
  }

  function runSequence() {
    var i = 0;
    function next() {
      if (i >= script.length) {
        setTimeout(reset, 2800);
        return;
      }
      var m = script[i];
      if (m.dir === 'out') {
        showTyping();
        setTimeout(function () {
          hideTyping();
          chat.appendChild(makeMsg(m));
          i++;
          setTimeout(next, 1000);
        }, 1200);
      } else {
        chat.appendChild(makeMsg(m));
        i++;
        setTimeout(next, 1000);
      }
    }
    next();
  }

  function reset() {
    hideTyping();
    chat.innerHTML = '';
    runSequence();
  }

  if (chat) {
    if (reduced || !window.requestAnimationFrame) {
      script.forEach(function (m) { chat.appendChild(makeMsg(m)); });
    } else {
      runSequence();
    }
  }

  /* --- Появление при скролле --- */
  var targets = document.querySelectorAll('[data-reveal]');
  if (!reduced && 'IntersectionObserver' in window && targets.length) {
    document.body.classList.add('reveal');
    document.querySelectorAll('[data-reveal-group]').forEach(function (group) {
      var items = group.querySelectorAll(':scope [data-reveal]');
      items.forEach(function (el, i) { el.style.transitionDelay = (i * 90) + 'ms'; });
    });
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.14 });
    targets.forEach(function (el) { io.observe(el); });
  } else {
    document.body.classList.add('reveal');
    targets.forEach(function (el) { el.classList.add('is-visible'); });
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

  /* --- Состояние шапки --- */
  var nav = document.getElementById('nav');
  if (nav) {
    var onScroll = function () { nav.classList.toggle('is-scrolled', window.scrollY > 8); };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* --- Форма CTA --- */
  var form = document.getElementById('ctaForm');
  var success = document.getElementById('ctaSuccess');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var name = form.elements.name.value.trim();
      var contact = form.elements.contact.value.trim();
      var msg = form.elements.message.value.trim();
      if (!name || !contact || !msg) {
        success.hidden = true;
        form.querySelectorAll('input, textarea').forEach(function (f) { f.style.borderColor = ''; });
        if (!name) { form.elements.name.style.borderColor = '#f87171'; form.elements.name.focus(); }
        else if (!contact) { form.elements.contact.style.borderColor = '#f87171'; form.elements.contact.focus(); }
        else { form.elements.message.style.borderColor = '#f87171'; form.elements.message.focus(); }
        return;
      }
      form.querySelectorAll('input, textarea').forEach(function (f) { f.style.borderColor = ''; });
      success.hidden = false;
      form.reset();
      if (!reduced) success.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
  }
})();
