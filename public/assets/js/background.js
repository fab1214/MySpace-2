async function changeBackground(background_image) {
    const id = document.querySelector('#id');

    const response = await fetch(`/api/users/${id}`, {
        method: 'PUT',
        body: JSON.stringify({background_image}),
        headers: { 'Content-Type': 'application/json'}
    })
    if (response.ok) {
        console.log('user updated');
        document.location.replace('/');
    } else {
      alert(response.statusText);
    }
}