// main.js

// Load external HTML (e.g. header, footer)
async function loadComponent(id, file) {
  const res = await fetch(file);
  const text = await res.text();
  document.getElementById(id).innerHTML = text;
}

// Load header and footer, then run i18n + toggle setup
async function initializeSite() {
 
  await loadComponent("header", "https://yunacitrus7.github.io/personal-website/header.html");
  await loadComponent("footer", "https://yunacitrus7.github.io/personal-website/footer.html");

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
    fetch(basePath + `locales/${lang}.json`)
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
