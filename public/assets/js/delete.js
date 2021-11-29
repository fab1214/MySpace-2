async function deleteFormHandler(event) {
    event.preventDefault();
  
    const id = window.location.toString().split('/')[
      window.location.toString().split('/').length - 1
    ];
    const response = await fetch(`/api/posts/${id}`, {
      method: 'DELETE'
    });
  
    if (response.ok) {
      console.log('post should be deleted');
    } else {
      alert(response.statusText);
    }
  }
  
  document.querySelector('#delete-button').addEventListener('click', deleteFormHandler);