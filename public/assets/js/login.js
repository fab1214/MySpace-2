// const { response } = require("express");

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
          email,
          password
        }),
        headers: { 'Content-Type': 'application/json' }
      });
  
      if (response.ok) {
        window.location.replace('http://localhost:3001/');
      } else {
        alert(response.statusText);
      }
    }
}

async function login(event) {
  event.preventDefault();
  const emailLogin = document.querySelector('#email-login').value.trim();
  const passwordLogin = document.querySelector('#password-login').value.trim();
  if (email && password){

    const response = await fetch('/api/users/login', {
      method: 'post',
      body: JSON.stringify({
        emailLogin,
        passwordLogin
      }),
      headers: { 'Content-Type': 'application/json' }
    });
    if(response.ok) {
      console.log("worked???")
      document.location.replace('http://github.com')
    }
    else {
      alert(response.statusText)
    }
  }
}
  document.querySelector('.signup-form').addEventListener('submit', signupFormHandler);
document.querySelector('.login-form').addEventListener('submit', login);