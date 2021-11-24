<<<<<<< HEAD
function loginFormHandler(event) {
    event.preventDefault();
  
    const email = document.querySelector('#email-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();
  
    if (email && password) {
      fetch('/api/users/login', {
        method: 'post',
        body: JSON.stringify({
=======
async function signupFormHandler(event) {
    event.preventDefault();
  
    const username = document.querySelector('#username-signup').value.trim();
    const email = document.querySelector('#email-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();
    const first_name = document.querySelector('#first_name-signup').value.trim();
    const last_name = document.querySelector('#last_name-signup').value.trim();

    if (first_name && last_name && username && email && password) {
      const response = await fetch('/api/users', {
        method: 'post',
        body: JSON.stringify({
          first_name,
          last_name,
          username,
>>>>>>> 7eed559d8d193318ed884231c893502778c5abc7
          email,
          password
        }),
        headers: { 'Content-Type': 'application/json' }
<<<<<<< HEAD
      }).then((response) => {console.log('account found', response)})
    }
  }

  document.querySelector('.login-form').addEventListener('submit', loginFormHandler);
=======
      });
  
      if (response.ok) {
        window.location.replace('http://localhost:3001/');
      } else {
        alert(response.statusText);
      }
    }
}

  document.querySelector('.signup-form').addEventListener('submit', signupFormHandler);
>>>>>>> 7eed559d8d193318ed884231c893502778c5abc7
