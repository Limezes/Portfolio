/* Kilo — каталог, фильтры, корзина, модалка товара */
(function () {
  'use strict';

  var CATS = {
    headphones: 'Наушники',
    keyboards: 'Клавиатуры',
    mice: 'Мыши',
    monitors: 'Мониторы'
  };

  var IMG = '../../images/';

  var PRODUCTS = [
    { id: 1, name: 'Наушники Air Plus', cat: 'headphones', price: 4990, img: IMG + 'shop-hp-1.jpg', desc: 'Беспроводные наушники с активным шумоподавлением, до 30 часов работы и быстрой зарядкой.' },
    { id: 2, name: 'Наушники Bass Pro', cat: 'headphones', price: 7490, img: IMG + 'shop-hp-2.jpg', desc: 'Студийный звук, глубокие басы, кожаные амбушюры и поддержка Hi-Res Audio.' },
    { id: 3, name: 'Механика TKL', cat: 'keyboards', price: 6590, img: IMG + 'shop-kb-1.jpg', desc: 'Механическая клавиатура 80% с hot-swap свитчами, RGB-подсветкой и алюминиевым корпусом.' },
    { id: 4, name: 'Компактная 60%', cat: 'keyboards', price: 4290, img: IMG + 'shop-kb-2.jpg', desc: 'Ультракомпактная клавиатура 60% для путешествий: Bluetooth + USB-C, тихие свитчи.' },
    { id: 5, name: 'Мышь Ergo MX', cat: 'mice', price: 3290, img: IMG + 'shop-mouse-1.jpg', desc: 'Эргономичная беспроводная мышь с тихими кнопками и сенсором 16 000 DPI.' },
    { id: 6, name: 'Мышь Gaming X', cat: 'mice', price: 3990, img: IMG + 'shop-mouse-2.jpg', desc: 'Игровая мышь 26 000 DPI, частота опроса 1000 Гц, 8 программируемых кнопок.' },
    { id: 7, name: 'Монитор 27" 4K', cat: 'monitors', price: 27900, img: IMG + 'shop-mon-1.jpg', desc: '27-дюймовый монитор 4K IPS, 100% sRGB, высокая частота 144 Гц.' },
    { id: 8, name: 'Монитор 24" FHD', cat: 'monitors', price: 11900, img: IMG + 'shop-mon-2.jpg', desc: 'Бюджетный 24-дюймовый монитор Full HD с тонкими рамками и режимом защиты глаз.' }
  ];

  var cart = [];
  var grid = document.getElementById('products');
  var cartItems = document.getElementById('cartItems');
  var cartCount = document.getElementById('cartCount');
  var cartTotal = document.getElementById('cartTotal');
  var cartPanel = document.getElementById('cartPanel');
  var cartOverlay = document.getElementById('cartOverlay');
  var cartSuccess = document.getElementById('cartSuccess');

  /* --- Рендер каталога --- */
  function render(filter) {
    var list = filter === 'all' ? PRODUCTS : PRODUCTS.filter(function (p) { return p.cat === filter; });
    grid.innerHTML = list.map(function (p) {
      return '' +
        '<article class="card" data-id="' + p.id + '">' +
          '<div class="card__art"><img src="' + p.img + '" alt="' + p.name + '" loading="lazy"></div>' +
          '<div class="card__body">' +
            '<span class="card__cat">' + CATS[p.cat] + '</span>' +
            '<h3>' + p.name + '</h3>' +
            '<div class="card__row">' +
              '<span class="card__price">' + fmt(p.price) + '</span>' +
              '<button class="card__add" data-add="' + p.id + '" aria-label="В корзину">+</button>' +
            '</div>' +
          '</div>' +
        '</article>';
    }).join('');
  }

  function fmt(n) {
    return n.toLocaleString('ru-RU') + ' ₽';
  }

  /* --- Фильтры --- */
  document.querySelectorAll('.filter').forEach(function (btn) {
    btn.addEventListener('click', function () {
      document.querySelectorAll('.filter').forEach(function (b) { b.classList.remove('is-active'); });
      btn.classList.add('is-active');
      render(btn.dataset.filter);
    });
  });

  /* --- Корзина --- */
  function updateCart() {
    var count = cart.reduce(function (s, i) { return s + i.qty; }, 0);
    var total = cart.reduce(function (s, i) { return s + i.qty * i.price; }, 0);
    cartCount.textContent = count;

    if (!cart.length) {
      cartItems.innerHTML = '<div class="cart__empty">Корзина пуста.<br>Добавьте товары из каталога.</div>';
    } else {
      cartItems.innerHTML = cart.map(function (i) {
        return '' +
          '<div class="cart-item">' +
            '<div class="cart-item__art"><img src="' + i.img + '" alt="' + i.name + '"></div>' +
            '<div class="cart-item__info"><b>' + i.name + '</b><span>' + i.qty + ' × ' + fmt(i.price) + '</span></div>' +
            '<button class="cart-item__rm" data-rm="' + i.id + '" aria-label="Убрать">' +
              '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>' +
            '</button>' +
          '</div>';
      }).join('');
    }
    cartTotal.textContent = fmt(total);
  }

  function addToCart(id) {
    var p = PRODUCTS.find(function (x) { return x.id === id; });
    if (!p) return;
    var found = cart.find(function (i) { return i.id === id; });
    if (found) { found.qty++; } else { cart.push({ id: p.id, name: p.name, price: p.price, img: p.img, qty: 1 }); }
    cartSuccess.hidden = true;
    updateCart();
    openCart();
  }

  /* Делегирование кликов по сетке */
  grid.addEventListener('click', function (e) {
    var add = e.target.closest('[data-add]');
    if (add) { e.stopPropagation(); addToCart(parseInt(add.dataset.add, 10)); return; }
    var card = e.target.closest('.card');
    if (card) openModal(parseInt(card.dataset.id, 10));
  });

  cartItems.addEventListener('click', function (e) {
    var rm = e.target.closest('[data-rm]');
    if (!rm) return;
    var id = parseInt(rm.dataset.rm, 10);
    cart = cart.filter(function (i) { return i.id !== id; });
    cartSuccess.hidden = true;
    updateCart();
  });

  /* --- Модалка товара --- */
  var modal = document.getElementById('productModal');
  var activeModalId = null;

  function openModal(id) {
    var p = PRODUCTS.find(function (x) { return x.id === id; });
    if (!p) return;
    activeModalId = id;
    var art = document.getElementById('modalArt');
    art.innerHTML = '<img src="' + p.img + '" alt="' + p.name + '">';
    document.getElementById('modalCat').textContent = CATS[p.cat];
    document.getElementById('modalName').textContent = p.name;
    document.getElementById('modalDesc').textContent = p.desc;
    document.getElementById('modalPrice').textContent = fmt(p.price);
    modal.hidden = false;
  }
  function closeModal() { modal.hidden = true; activeModalId = null; }

  document.querySelectorAll('[data-close]').forEach(function (el) { el.addEventListener('click', closeModal); });
  document.getElementById('modalAdd').addEventListener('click', function () {
    if (activeModalId) addToCart(activeModalId);
    closeModal();
  });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') { closeModal(); closeCart(); } });

  /* --- Панель корзины --- */
  function openCart() { cartPanel.classList.add('is-open'); cartOverlay.hidden = false; cartPanel.setAttribute('aria-hidden', 'false'); }
  function closeCart() { cartPanel.classList.remove('is-open'); cartOverlay.hidden = true; cartPanel.setAttribute('aria-hidden', 'true'); }
  document.getElementById('cartBtn').addEventListener('click', openCart);
  document.getElementById('cartClose').addEventListener('click', closeCart);
  cartOverlay.addEventListener('click', closeCart);

  document.getElementById('cartCheckout').addEventListener('click', function () {
    if (!cart.length) return;
    cartSuccess.hidden = false;
  });

  /* --- Мобильное меню --- */
  var burger = document.getElementById('navBurger');
  var navLinks = document.getElementById('navLinks');
  burger.addEventListener('click', function () { navLinks.classList.toggle('is-open'); });
  navLinks.querySelectorAll('a').forEach(function (l) { l.addEventListener('click', function () { navLinks.classList.remove('is-open'); }); });

  /* --- Старт --- */
  render('all');
  updateCart();
})();
