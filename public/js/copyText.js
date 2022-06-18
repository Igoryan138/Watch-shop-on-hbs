const text = document.getElementById('apiLink');

const btnForCopy1 = document.querySelector('#copy1');
const allModelsAPI = document.getElementById('allModelsAPI');

btnForCopy1.addEventListener('click', (event) => {
  if (event.target.tagName === 'BUTTON') {
    text.select();
    document.execCommand('copy');
    const alert = document.createElement('span');
    alert.classList = 'alert';
    alert.innerText = 'Ссылка скопирована';
    btnForCopy1.appendChild(alert);
  }
});

allModelsAPI.addEventListener('click', (event) => {
  if (event.target.tagName === 'BUTTON') {
    const input = document.getElementById(`in${event.target.id}`);
    input.select();
    document.execCommand('copy');
    const alert = document.createElement('span');
    alert.classList = 'alert';
    alert.innerText = 'Ссылка скопирована';
    event.target.after(alert);
  }
});
