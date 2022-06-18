const forgotPass = document.querySelector('#forgotPass');

forgotPass.addEventListener('click', async (event) => {
  const response = await fetch('admin/forgotPass');
});
