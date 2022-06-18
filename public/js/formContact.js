const contactBlock = document.querySelector('.contact-block');
const formContact = document.querySelector('#formContact');

formContact.addEventListener('submit', async (event) => {
  event.preventDefault();
  try {
    // собирает все данные инпутов из формы в специальный объект
    const formData = new FormData(event.target);

    const response = await fetch('/form', {
      method: 'POST',
      body: formData,
    });
    const result = await response.json();
    const { contact_name, email } = result;

    // Удаляю текст Оставить заявку
    const textForm = document.querySelector('.text-form');
    textForm.remove();

    // Добавляю новый элемент
    const div = document.createElement('div');
    div.className = 'text-form';
    div.innerHTML = `<div>
    <span class=user-contact>${contact_name.toUpperCase()}</span> Спасибо за заявку! <br> Cкоро с Вами свяжется наш консультант! <br>
    На Вашу почту <span class=user-contact>${email.toUpperCase()}</span> отправлено сообщение!
    </div>`;
    formContact.prepend(div);

    event.target.reset();
  } catch (error) {
    console.log(error);
  }
});
