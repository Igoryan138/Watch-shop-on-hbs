let center = [55.736077, 37.626196];

function init() {
  
  let map = new ymaps.Map('map-test', {
    center: center,
    zoom: 17,
  });

  let placemark = new ymaps.Placemark(center, {
    balloonContent: `
      <div class="balloon">
        <h3>Wira watch</h3>
        <p>Дизайнерские часы ручной работы</p>
        <img src="/images/watch-block.png" style="width:100px">
        <br>
        <a href="tel:+79992091997">Позвонить</a>
        <br>
        <a href="https://www.t.me/wira_watch">Написать в Telegram</a>
        <br>
        <a href="https://wa.me/+79992091997">Написать в WatsApp</a>
        <br>
        <a href="https://www.instagram.com/wira_watch">Посмотреть в Instagram</a>
      </div>
    `,
  }, {
    iconLayout: 'default#image',
    iconImageHref: '/icons/watch.svg',
    iconImageSize: [28, 28],
    iconImageOffset: [-30, -11],
  });

  // map.controls.remove('geolocationControl'); // удаляем геолокацию
  map.controls.remove('searchControl'); // удаляем поиск
  map.controls.remove('trafficControl'); // удаляем контроль трафика
  map.controls.remove('typeSelector'); // удаляем тип
  // map.controls.remove('fullscreenControl'); // удаляем кнопку перехода в полноэкранный режим
  map.controls.remove('zoomControl'); // удаляем контрол зуммирования
  map.controls.remove('rulerControl'); // удаляем контроль правил

  map.geoObjects.add(placemark)
}

ymaps.ready(init);
