async function newAboutMeHandler(event) {
    // event.preventDefault();
    
    const about_me = document.querySelector('#about_me').value.trim();
    const id = document.querySelector('#id');

    const response = await fetch(`/api/users/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
            about_me
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    })

    if (response.ok) {
        console.log('user updated');
        document.location.replace('/');
    } else {
      alert(response.statusText);
    }
}

async function newInterestHandler(event) {
    // event.preventDefault();

    const interests = document.querySelector('#interests').value.trim();
    const id = document.querySelector('#id');

    const response = await fetch(`/api/users/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
            interests
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    })

    if (response.ok) {
        console.log('user updated');
        document.location.replace('/');
    } else {
      alert(response.statusText);
    }
}
// document.querySelector('.about-me-form').addEventListener('submit', newAboutMeHandler);
// document.querySelector('.interests-form').addEventListener('submit', newInterestHandler);
document.querySelector('.post_area').addEventListener('submit', newInterestHandler)
$('.btn').on('click', function(){
  var parent_id = $(this);
  console.log(parent_id);
  newInterestHandler(parent_id);
  newAboutMeHandler(parent_id);
 })