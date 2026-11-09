// Демо: перемикання між мережею та акумулятором
(function () {
  var demo = document.getElementById('demo');
  var btn = document.getElementById('toggle');
  var grid = document.getElementById('s-grid');
  var src = document.getElementById('s-src');
  var note = document.getElementById('demo-note');
  btn.addEventListener('click', function () {
    var off = demo.getAttribute('data-grid') === 'on';
    demo.setAttribute('data-grid', off ? 'off' : 'on');
    grid.textContent = off ? 'Немає напруги' : 'Є напруга';
    src.textContent = off ? 'Акумулятор' : 'Мережа + сонце';
    btn.textContent = off ? 'Увімкнути світло в мережі' : 'Вимкнути світло в мережі';
    note.textContent = off
      ? 'Система перемкнулась автоматично. Вітрина, каса й освітлення працюють без перерви.'
      : 'Мережа повернулась. Система знову працює від мережі й сонця.';
  });
})();

// Калькулятор: орієнтовна потужність, вартість і окупність
(function () {
  var USD = 44.86;                 // курс НБУ, грн/$
  var PER_KW = 450 * USD;          // вартість 1 кВт генерації, грн
  var PER_KWH = 150 * USD;         // вартість 1 кВт·год накопичувача, грн
  var YIELD = 3.5;                 // кВт·год на 1 кВт за добу (середнє за рік)
  var DAYS = 330;                  // днів виробітку на рік
  var SELF = 0.9;                  // частка власного споживання
  var ids = ['c-day', 'c-tariff', 'c-load', 'c-hours'];
  var nf = new Intl.NumberFormat('uk-UA', { maximumFractionDigits: 0 });

  function val(id) {
    var v = parseFloat(document.getElementById(id).value);
    return isFinite(v) && v > 0 ? v : 0;
  }
  function set(id, text) { document.getElementById(id).textContent = text; }

  function calc() {
    var day = val('c-day'), tariff = val('c-tariff'), load = val('c-load'), hours = val('c-hours');
    if (!day || !tariff || !load || !hours) {
      ['r-kw', 'r-kwh', 'r-cost', 'r-save', 'r-pay'].forEach(function (id) { set(id, '—'); });
      return;
    }
    var kw = Math.max(5, Math.ceil(day / YIELD));
    var kwh = Math.ceil(load * hours);
    var cost = kw * PER_KW + kwh * PER_KWH;
    var save = kw * YIELD * DAYS * SELF * tariff;
    var years = cost / save;
    set('r-kw', kw + ' кВт');
    set('r-kwh', kwh + ' кВт·год');
    set('r-cost', '≈ ' + nf.format(Math.round(cost / 1000) * 1000) + ' грн');
    set('r-save', '≈ ' + nf.format(Math.round(save / 1000) * 1000) + ' грн');
    set('r-pay', years < 10 ? '≈ ' + years.toFixed(1).replace('.', ',') + ' р.' : 'понад 10 р.');
  }
  ids.forEach(function (id) { document.getElementById(id).addEventListener('input', calc); });
  calc();
})();

// Форма заявки (демо без сервера)
(function () {
  var form = document.getElementById('form');
  var msg = document.getElementById('form-msg');
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var name = document.getElementById('f-name').value.trim();
    var contact = document.getElementById('f-contact').value.trim();
    if (!name || !contact) {
      msg.textContent = 'Вкажіть ім’я та телефон або Telegram, щоб ми могли зв’язатися.';
      return;
    }
    msg.textContent = 'Дякуємо, ' + name + '! Заявку на аудит прийнято. Ми зв’яжемося з вами найближчим часом.';
    form.reset();
  });
})();
