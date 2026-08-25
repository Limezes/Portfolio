/* Lime — переключение языков RU/EN (главная страница) */
(function () {
  'use strict';

  var I18N = {
    ru: {
      metaTitle: 'Lime — разработка сайтов и Telegram-ботов',
      metaDescription: 'Lime — CEO и основатель студии разработки. Лендинги, интернет-магазины, корпоративные сайты и Telegram-боты под ключ. Фронтенд и бэкенд — как единое целое.',

      navWorks: 'Работы', navAbout: 'Обо мне', navServices: 'Услуги', navContact: 'Контакты',
      navCta: 'Обсудить проект',

      heroAvatar: 'CEO · основатель студии',
      heroBadge: 'Открыт к новым проектам',
      heroTitle: 'Сайты и боты,<br>которые <span class="accent">работают</span> на&nbsp;вас',
      heroSub: 'Лендинги, интернет-магазины, корпоративные сайты и Telegram-боты под ключ. Я — CEO и основатель студии, веду проект от идеи до запуска.',
      heroCollageTag: '// живые демо — откройте сами',
      heroCta: 'Обсудить проект',
      statProjects: 'проектов',
      statDays: 'дня до запуска',
      statAdaptive: 'адаптивность',
      statSupport: 'поддержка',

      tickerSites: 'Сайты', tickerLanding: 'Лендинги', tickerShops: 'Интернет-магазины',
      tickerCorp: 'Корпоративные сайты', tickerBots: 'Telegram-боты', tickerBackend: 'Бэкенд',
      tickerCode: 'Помощь в коде',

      worksEyebrow: 'Портфолио',
      worksTitle: 'Живые <span class="accent">проекты</span>',
      worksSub: 'Каждый кейс — работающее демо. Откройте и посмотрите в действии.',
      caseOpen: 'Открыть демо',
      case1Tag1: 'Стартап · SaaS', case1Name: 'Nimbus — облачная платформа для команд',
      case1Desc: 'Тёмный сайт в стиле glassmorphism для IT-продукта: интерактивные табы возможностей, тарифы и FAQ.',
      case2Tag1: 'Интернет-магазин', case2Name: 'Kilo — магазин техники с корзиной',
      case2Desc: 'Светлый магазин: каталог с фильтрами, рабочая корзина на JavaScript и модалка товара.',
      case3Tag1: 'Фитнес-студия', case3Name: 'PULSE — сайт студии с расписанием',
      case3Desc: 'Энергичный тёмный сайт с неоновым акцентом: расписание, тренеры и форма записи.',
      case4Tag1: 'Telegram-бот', case4Name: 'LimeBot — бот для заявок и продаж',
      case4Desc: 'Принимает заявки, отвечает на вопросы и продаёт без участия человека.',

      aboutEyebrow: 'Обо мне',
      aboutTitle: 'Привет, я <span class="accent">Lime</span>',
      aboutP1: 'Делаю проекты под ключ: от макета и вёрстки до бэкенда и запуска. Работаю напрямую, без менеджеров — вы всегда знаете, что происходит с проектом.',
      aboutP2: 'Я основатель и CEO студии — поэтому фронтенд и серверная часть собираются как единое целое.',
      aboutLi1: 'Фронтенд и бэкенд под ключ', aboutLi2: 'Telegram-боты и интеграции',
      aboutLi3: 'Чистый код без конструкторов', aboutLi4: 'Быстрый запуск и поддержка',
      aboutStatProjects: 'проектов', aboutStatDays: 'дней до запуска', aboutStatAdaptive: 'адаптивность',

      stackEyebrow: 'Стек', stackTitle: 'Мой инструментарий',
      stackP: 'Веду проекты под ключ: от идеи до запуска. Без менеджеров и лишних звонков.',
      stackFront: 'Фронтенд', stackBack: 'Бэкенд и боты', stackProcess: 'Процесс',
      stackAdaptive: 'Адаптивная вёрстка', stackIntegrations: 'Интеграции', stackSeo: 'SEO-основы',

      servicesEyebrow: 'Услуги',
      servicesTitle: 'Что я <span class="accent">делаю</span>',
      servicesSub: 'Фиксированная стоимость — без «доплат по ходу».',
      serviceLanding: 'Лендинг', serviceLandingP: 'Продающая страница для продукта, услуги или события.',
      serviceLandingPrice: 'от 5 000 ₽', serviceLandingTerm: 'до 5 дней',
      serviceShop: 'Интернет-магазин', serviceShopP: 'Каталог, корзина, фильтры и удобное оформление заказа.',
      serviceShopPrice: 'от 8 000 ₽', serviceShopTerm: 'до 7 дней',
      serviceCorp: 'Корпоративный сайт', serviceCorpP: 'Многостраничный сайт, который представляет компанию и услуги.',
      serviceCorpPrice: 'от 6 000 ₽', serviceCorpTerm: 'до 7 дней',
      serviceBot: 'Telegram-бот', serviceBotNew: 'новинка',
      serviceBotP: 'Заявки, рассылки, оплата и уведомления — бот, который продаёт без вас.',
      serviceBotPrice: 'от 3 000 ₽', serviceBotTerm: 'до 4 дней',
      serviceHelp: 'Помощь в коде', serviceHelpP: 'Бэкенд и интеграции, доработка существующих проектов, решение задач.',
      serviceHelpPrice: 'от 1 000 ₽ за проект', serviceHelpTerm: 'в зависимости от масштаба',
      serviceSupport: 'Поддержка и доработки', serviceSupportP: 'Правки, новые блоки и обновления уже готового сайта или бота.',
      serviceSupportPrice: '500 ₽/мес', serviceSupportTerm: 'месяц',

      reviewsEyebrow: 'Отзывы',
      reviewsTitle: 'Что <span class="accent">говорят</span>',
      reviewsSub: 'Первое место уже зарезервировано — за вами.',
      reviewsEmptyStamp: '// reserved #001',
      reviewsEmptySlotName: 'ваше_имя_здесь',
      reviewsEmptyTitle: 'Первое место — ваше',
      reviewsEmptyText: 'Отзывов ещё нет, и место №1 уже зарезервировано — за вами. Расскажите, как прошла работа, и ваше имя появится здесь первым.',
      reviewsEmptyCta: 'Зарезервировать место',

      faqTitle: 'Частые <span class="accent">вопросы</span>',
      faq1q: 'Сколько стоит сайт?',
      faq1a: 'Лендинг — от 5 000 ₽, интернет-магазин — от 8 000 ₽, корпоративный сайт — от 6 000 ₽, Telegram-бот — от 3 000 ₽. Помощь в коде — от 1 000 ₽ за проект.',
      faq2q: 'Какие сроки?',
      faq2a: 'Лендинг — до 5 дней, бот — до 4 дней, магазин и корпоративный сайт — до 7 дней. Сроки фиксирую в договорённости до старта.',
      faq3q: 'Делаете боты и бэкенд?',
      faq3a: 'Да. Приём заявок, рассылки, оплата и интеграции — боты, которые работают без вашего участия.',
      faq4q: 'Что нужно от меня для старта?',
      faq4a: 'Обычно достаточно пары предложений о задаче, примеров и контактов. Макеты и тексты обсудим на старте — помогу и с этим.',
      faq5q: 'Поддерживаете после запуска?',
      faq5a: 'Да. После запуска — бесплатные правки, дальше поддержка и доработки по договору 500 ₽/мес.',

      contactEyebrow: 'Контакты',
      contactTitle: 'Давайте <span class="accent">обсудим</span> ваш проект',
      contactSub: 'Расскажите о задаче — отвечу в течение дня и предложу решение со сроками и ценой.',
      formNamePh: 'Ваше имя', formContactPh: 'Email или Telegram',
      formMsgPh: 'Что нужно сделать? Опишите проект в пару строк.',
      formSubmit: 'Отправить заявку',
      formNote: 'Заявка отправлена. Напишите мне напрямую в Telegram или на почту — кнопки ниже.'
    },

    en: {
      metaTitle: 'Lime — websites & Telegram bots',
      metaDescription: 'Lime — CEO and founder of a web studio. Landing pages, online stores, corporate sites and Telegram bots, done end to end. Frontend and backend built as one.',

      navWorks: 'Work', navAbout: 'About', navServices: 'Services', navContact: 'Contacts',
      navCta: 'Discuss a project',

      heroAvatar: 'CEO · studio founder',
      heroBadge: 'Open to new projects',
      heroTitle: 'Websites and bots<br>that <span class="accent">work</span> for&nbsp;you',
      heroSub: 'Landing pages, online stores, corporate sites and Telegram bots — done end to end. I\'m the CEO and founder of the studio, and I run projects from idea to launch.',
      heroCollageTag: '// live demos — open them yourself',
      heroCta: 'Discuss a project',
      statProjects: 'projects',
      statDays: 'day to launch',
      statAdaptive: 'responsive',
      statSupport: 'support',

      tickerSites: 'Websites', tickerLanding: 'Landing pages', tickerShops: 'Online stores',
      tickerCorp: 'Corporate sites', tickerBots: 'Telegram bots', tickerBackend: 'Backend',
      tickerCode: 'Code help',

      worksEyebrow: 'Portfolio',
      worksTitle: 'Live <span class="accent">projects</span>',
      worksSub: 'Every case is a working demo. Open one and see it in action.',
      caseOpen: 'Open demo',
      case1Tag1: 'Startup · SaaS', case1Name: 'Nimbus — cloud platform for teams',
      case1Desc: 'A dark glassmorphism site for an IT product: interactive feature tabs, pricing and FAQ.',
      case2Tag1: 'Online store', case2Name: 'Kilo — tech store with a cart',
      case2Desc: 'A light store: filterable catalog, working JavaScript cart and product modal.',
      case3Tag1: 'Fitness studio', case3Name: 'PULSE — studio site with schedule',
      case3Desc: 'An energetic dark site with a neon accent: schedule, coaches and signup form.',
      case4Tag1: 'Telegram bot', case4Name: 'LimeBot — bot for leads and sales',
      case4Desc: 'Takes leads, answers questions and sells with no human involvement.',

      aboutEyebrow: 'About',
      aboutTitle: 'Hi, I\'m <span class="accent">Lime</span>',
      aboutP1: 'I build projects end to end: from layout and markup to backend and launch. I work directly, without managers — you always know what\'s happening with your project.',
      aboutP2: 'I\'m the founder and CEO of a studio — that\'s why the frontend and the server side are built as one.',
      aboutLi1: 'Frontend and backend, end to end', aboutLi2: 'Telegram bots and integrations',
      aboutLi3: 'Clean code, no site builders', aboutLi4: 'Fast launch and support',
      aboutStatProjects: 'projects', aboutStatDays: 'days to launch', aboutStatAdaptive: 'responsive',

      stackEyebrow: 'Stack', stackTitle: 'My toolkit',
      stackP: 'I run projects end to end: from idea to launch. No managers, no unnecessary calls.',
      stackFront: 'Frontend', stackBack: 'Backend & bots', stackProcess: 'Process',
      stackAdaptive: 'Responsive layout', stackIntegrations: 'Integrations', stackSeo: 'SEO basics',

      servicesEyebrow: 'Services',
      servicesTitle: 'What I <span class="accent">do</span>',
      servicesSub: 'Fixed pricing — no \'extras along the way\'.',
      serviceLanding: 'Landing page', serviceLandingP: 'A selling page for a product, service or event.',
      serviceLandingPrice: 'from 5,000 ₽', serviceLandingTerm: 'up to 5 days',
      serviceShop: 'Online store', serviceShopP: 'Catalog, cart, filters and easy checkout.',
      serviceShopPrice: 'from 8,000 ₽', serviceShopTerm: 'up to 7 days',
      serviceCorp: 'Corporate website', serviceCorpP: 'A multi-page site that presents the company and its services.',
      serviceCorpPrice: 'from 6,000 ₽', serviceCorpTerm: 'up to 7 days',
      serviceBot: 'Telegram bot', serviceBotNew: 'new',
      serviceBotP: 'Leads, mailings, payments and notifications — a bot that sells without you.',
      serviceBotPrice: 'from 3,000 ₽', serviceBotTerm: 'up to 4 days',
      serviceHelp: 'Code help', serviceHelpP: 'Backend and integrations, improving existing projects, solving problems.',
      serviceHelpPrice: 'from 1,000 ₽ per project', serviceHelpTerm: 'depending on scope',
      serviceSupport: 'Support & improvements', serviceSupportP: 'Edits, new blocks and updates to an existing site or bot.',
      serviceSupportPrice: '500 ₽/month', serviceSupportTerm: 'per month',

      reviewsEyebrow: 'Reviews',
      reviewsTitle: 'What they <span class="accent">say</span>',
      reviewsSub: 'The first slot is already reserved — for you.',
      reviewsEmptyStamp: '// reserved #001',
      reviewsEmptySlotName: 'your_name_here',
      reviewsEmptyTitle: 'The first spot is yours',
      reviewsEmptyText: 'No reviews yet, and slot #1 is already reserved — for you. Tell us how the work went, and your name will appear here first.',
      reviewsEmptyCta: 'Reserve your spot',

      faqTitle: 'Frequently asked <span class="accent">questions</span>',
      faq1q: 'How much does a website cost?',
      faq1a: 'Landing — from 5,000 ₽, online store — from 8,000 ₽, corporate site — from 6,000 ₽, Telegram bot — from 3,000 ₽. Code help — from 1,000 ₽ per project.',
      faq2q: 'What are the timelines?',
      faq2a: 'Landing — up to 5 days, bot — up to 4 days, store and corporate site — up to 7 days. I lock timelines in an agreement before we start.',
      faq3q: 'Do you build bots and backend?',
      faq3a: 'Yes. Lead capture, mailings, payments and integrations — bots that work without you.',
      faq4q: 'What do you need from me to start?',
      faq4a: 'Usually a couple of sentences about the task, examples and contacts are enough. We\'ll discuss mockups and copy at the start — I\'ll help with those too.',
      faq5q: 'Do you provide support after launch?',
      faq5a: 'Yes. Free fixes after launch, then support and improvements under an agreement for 500 ₽/month.',

      contactEyebrow: 'Contacts',
      contactTitle: 'Let\'s <span class="accent">discuss</span> your project',
      contactSub: 'Tell me about the task — I\'ll reply within a day with a solution, timeline and price.',
      formNamePh: 'Your name', formContactPh: 'Email or Telegram',
      formMsgPh: 'What do you need done? Describe the project in a couple of lines.',
      formSubmit: 'Send a request',
      formNote: 'Request sent. Message me directly on Telegram or email — buttons below.'
    }
  };

  var STORAGE_KEY = 'lime-lang';
  var DEFAULT_LANG = 'ru';
  var current = DEFAULT_LANG;

  function read() {
    try {
      return window.localStorage.getItem(STORAGE_KEY) || DEFAULT_LANG;
    } catch (e) {
      return DEFAULT_LANG;
    }
  }
  function write(lang) {
    try { window.localStorage.setItem(STORAGE_KEY, lang); } catch (e) { /* ignore */ }
  }

  function apply(lang) {
    var dict = I18N[lang] || I18N[DEFAULT_LANG];
    current = lang;

    document.documentElement.lang = lang;
    document.title = dict.metaTitle;
    var meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute('content', dict.metaDescription);

    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      var key = el.getAttribute('data-i18n');
      if (dict[key] != null) el.textContent = dict[key];
    });
    document.querySelectorAll('[data-i18n-html]').forEach(function (el) {
      var key = el.getAttribute('data-i18n-html');
      if (dict[key] != null) el.innerHTML = dict[key];
    });
    document.querySelectorAll('[data-i18n-ph]').forEach(function (el) {
      var key = el.getAttribute('data-i18n-ph');
      if (dict[key] != null) el.setAttribute('placeholder', dict[key]);
    });

    document.querySelectorAll('#langSwitch [data-lang]').forEach(function (btn) {
      var active = btn.getAttribute('data-lang') === lang;
      btn.classList.toggle('is-active', active);
      btn.setAttribute('aria-pressed', active ? 'true' : 'false');
    });
  }

  var switchEl = document.getElementById('langSwitch');
  if (switchEl) {
    switchEl.addEventListener('click', function (e) {
      var btn = e.target.closest('[data-lang]');
      if (!btn || !I18N[btn.getAttribute('data-lang')]) return;
      apply(btn.getAttribute('data-lang'));
      write(btn.getAttribute('data-lang'));
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () { apply(read()); });
  } else {
    apply(read());
  }
})();
