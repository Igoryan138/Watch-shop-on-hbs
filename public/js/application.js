const container = document.querySelector('#statusCheckBox');
const mainDiv = document.querySelector('#modelDiv');

const { postForm } = document.forms;

container?.addEventListener('click', async (event) => {
  const { id } = event.target.dataset;

  if (id) {
    const selectId = document.querySelector(`#select_${id}`);
    // console.log('selectId=>', selectId);
    // console.log('ID =>', id);

    const { value } = selectId;
    // console.log('VALUE=>', value);

    try {
      const response = await fetch(`admin/getStatus/${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, value }),
      });

      const statusCheck = await response.json();
      // console.log(statusCheck);
    } catch (err) {
      console.log(err);
    }
  }
});

postForm?.addEventListener('submit', async (event) => {
  event.preventDefault();
  const { action } = event.target;

  try {
    const formData = new FormData(event.target);
    const response = await fetch(action, {
      method: 'POST',
      body: formData, // так как отправляем файл то HEADER не нужен и JSON тоже
    });

    if (response.ok) {
      const result = await response.json();
      const { model_name, id, img } = result;
      const div = document.createElement('div');
      div.setAttribute('data-watch', '');
      div.className = 'swiper-slide';
      div.innerHTML = `
        <img src='${img}' class="watchImg" alt="${model_name}">
        <h4>${model_name}</h4>
        <button data-danger=${id} type="button" class="btn btn-danger">Удалить</button>
      `;
      mainDiv.appendChild(div);

      /* <div data-watch class="swiper-slide">
            <img class="watchImg" src="{{img}}" alt="watch">
            <h4>{{model_name}}</h4>
            <button data-danger={{id}} type="button" class="btn-danger btn">Удалить</button>
          </div> */

      event.target.reset();
    }
  } catch (err) {
    console.log(err);
  }
});

mainDiv?.addEventListener('click', async (event) => {
  event.preventDefault();

  const { danger } = event.target.dataset;

  if (danger) {
    const response = await fetch(`/${danger}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      const watchDel = event.target.closest('[data-watch]');
      watchDel.remove();
    }
  }
});

const swiper = new Swiper('.swiper', {
  direction: 'horizontal',
  loop: true,

  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },

  keyboard: {
    enabled: true,
    onlyInViewport: true,
    pageUpDown: true,
  },

  autoHeight: true,
  slidesPerView: 3,
  spaceBetween: 30,
  loop: true,
  loopedSlides: 3,

  breakpoints: {
    200: {
      slidesPerView: 1,
    },
    600: {
      slidesPerView: 2,
    },
    992: {
      slidesPerView: 3,
    },
  },

});
