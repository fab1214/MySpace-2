async function newFormHandler(event) {
    event.preventDefault();
  
    const title = document.querySelector('#post_title').value.trim();
    const body = document.querySelector('#post_body').value.trim();
  
    const response = await fetch(`/api/posts`, {
      method: 'POST',
      body: JSON.stringify({
        title,
        body
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
  
    if (response.ok) {
        console.log('post added');
        document.location.replace('/feed');
    } else {
      alert(response.statusText);
    }
  }

  document.querySelector('.new-post-form').addEventListener('submit', newFormHandler);