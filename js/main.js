<<<<<<< HEAD
// main.js

// Load external HTML (e.g. header, footer)
async function loadComponent(id, file) {
  const res = await fetch(file);
  const text = await res.text();
  document.getElementById(id).innerHTML = text;
}

async function initializeSite() {
  await loadComponent("header", "../page/header.html");

  // Add class for custom header styling (e.g. pink on oc_home.html)
  if (window.location.pathname.includes('oc_home.html')) {
    const headerWrapper = document.getElementById('header');
    if (headerWrapper) headerWrapper.classList.add('oc-header');
  }

  await loadComponent("footer", "../page/footer.html");
  setupLangSwitcher();
}

// Language switching logic
function setupLangSwitcher(basePath = '/') {
  const elem = document.querySelector('.js-switch');
  if (!elem || typeof Switchery === 'undefined') {
    console.warn('Switchery or toggle not loaded');
    return;
  }

  let langData = {};
  new Switchery(elem, { size: 'small', color: '#ffffff', secondaryColor: '#888' });

  const savedLang = localStorage.getItem('lang') || 'en';
  elem.checked = savedLang === 'zh';

  loadLangData(savedLang);

  elem.addEventListener('change', () => {
    const selected = elem.checked ? 'zh' : 'en';
    loadLangData(selected);
  });

  function loadLangData(lang) {
    fetch( `/locales/${lang}.json`)
      .then(res => res.json())
      .then(data => {
        langData = data;
        applyLang(lang);
      })
      .catch(err => console.error('Error loading language file:', err));
  }

  function applyLang(lang) {
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      const value = key.split('.').reduce((o, i) => o?.[i], langData);
      if (value) el.textContent = value;
    });
    localStorage.setItem('lang', lang);
  }
}

// Run when DOM is ready
document.addEventListener('DOMContentLoaded', initializeSite);

//Splide Gallery
document.addEventListener('DOMContentLoaded', function () {
  ['char-carousel-full', 'char-carousel-half', 'char-carousel-icon'].forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      new Splide(el, {
        type: 'loop',
        perPage: 1,
        autoplay: true,
        pauseOnHover: true,
        interval: 3000,
        speed: 600,
        arrows: true,
        pagination: true
      }).mount();
    }
  });
});
=======
// main.js

// Load external HTML (e.g. header, footer)
async function loadComponent(id, file) {
  const res = await fetch(file);
  const text = await res.text();
  document.getElementById(id).innerHTML = text;
}

async function initializeSite() {
  await loadComponent("header", "../page/header.html");

  // Add class for custom header styling (e.g. pink on oc_home.html)
  if (window.location.pathname.includes('oc_home.html')) {
    const headerWrapper = document.getElementById('header');
    if (headerWrapper) headerWrapper.classList.add('oc-header');
  }

  await loadComponent("footer", "../page/footer.html");
  setupLangSwitcher();
}

// Language switching logic
function setupLangSwitcher(basePath = '/') {
  const elem = document.querySelector('.js-switch');
  if (!elem || typeof Switchery === 'undefined') {
    console.warn('Switchery or toggle not loaded');
    return;
  }

  let langData = {};
  new Switchery(elem, { size: 'small', color: '#ffffff', secondaryColor: '#888' });

  const savedLang = localStorage.getItem('lang') || 'en';
  elem.checked = savedLang === 'zh';

  loadLangData(savedLang);

  elem.addEventListener('change', () => {
    const selected = elem.checked ? 'zh' : 'en';
    loadLangData(selected);
  });

  function loadLangData(lang) {
    fetch( `/locales/${lang}.json`)
      .then(res => res.json())
      .then(data => {
        langData = data;
        applyLang(lang);
      })
      .catch(err => console.error('Error loading language file:', err));
  }

  function applyLang(lang) {
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      const value = key.split('.').reduce((o, i) => o?.[i], langData);
      if (value) el.textContent = value;
    });
    localStorage.setItem('lang', lang);
  }
}

// Run when DOM is ready
document.addEventListener('DOMContentLoaded', initializeSite);

//Splide Gallery
document.addEventListener('DOMContentLoaded', function () {
  ['char-carousel-full', 'char-carousel-half', 'char-carousel-icon'].forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      new Splide(el, {
        type: 'loop',
        perPage: 1,
        autoplay: true,
        pauseOnHover: true,
        interval: 3000,
        speed: 600,
        arrows: true,
        pagination: true
      }).mount();
    }
  });
});
>>>>>>> 9bc40b471046d7b5066c96d9482dd78bab47d98f
