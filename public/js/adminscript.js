const createOrdersList = document.querySelector('#createOrdersList');
const linkAdmin = document.querySelector('#linkAdmin');

createOrdersList.addEventListener('click', async (event) => {
  event.preventDefault();

  const response = await fetch('/admin/saveOrders');

  if (response.ok) {
    const result = await response.json();
    const { pathNewList } = result;

    const linkList = document.createElement('a');
    linkList.href = pathNewList;
    linkList.classList = 'nav-link';
    linkList.innerText = 'Скачать заявки(csv)';

    createOrdersList.after(linkList);
    createOrdersList.remove();
  }
});

const getKey = document.getElementById('getKey');

getKey?.addEventListener('click', async (event) => {
  if (event.target.tagName = 'SPAN') {
    const response = await fetch('admin/getKey');
    if (response.ok) {
      const alert = document.createElement('span');
      alert.classList = 'alert';
      alert.innerText = 'Код отправлен';
      event.target.after(alert);
    }
  }
});

// обработка смены данных
const changeForm = document.querySelector('#changeForm');

changeForm?.addEventListener('submit', async (event) => {
  event.preventDefault();
  const {
    email, password, passwordAgain, inputKey,
  } = event.target;
  console.log();
  const formData = {
    email: email.value,
    password: password.value,
    passwordAgain: passwordAgain.value,
    inputKey: inputKey.value,
  };
  console.log(formData);
  if (password.value === passwordAgain.value) {
    try {
      const response = await fetch('admin/changeData', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        const alert = document.createElement('span');
        alert.classList = 'alert';
        alert.innerText = 'Данные изменены';
        event.target.after(alert);
      } else {
        const alert = document.createElement('span');
        alert.classList = 'alert';
        alert.innerText = 'Неверный проверочный код';
        event.target.after(alert);
      }
    } catch (error) {
      console.log(error.message);
    }
  } else {
    const alert = document.createElement('span');
    alert.innerText = 'Пароли не совпадают';
    changeForm.appendChild(alert);
  }
});


