const contactsForm = document.querySelector('#contactsForm');
// console.log(contactsForm);
contactsForm?.addEventListener('submit', async (event) => {
  // event.preventDefault();
  // console.log('----target', event.target.adress.value);
  const { adress, tel, tlg, inst } = event.target;
  // console.log(adress);
  const formData = new FormData(event.target);
  const data = Object.fromEntries(formData);
  const response = await fetch('/admin/editContacts', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  console.log('res =>', response);
});
