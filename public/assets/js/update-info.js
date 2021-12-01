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

    const general = document.querySelector('#general').value.trim();
    const id = document.querySelector('#id');

    const response = await fetch(`/api/users/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
            general
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
async function newMeetHandler(event) {
    // event.preventDefault();
    
    const meet = document.querySelector('#meet').value.trim();
    const id = document.querySelector('#id');

    const response = await fetch(`/api/users/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
            meet
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

async function newMusicHandler(event) {
    // event.preventDefault();
    
    const music = document.querySelector('#music').value.trim();
    const id = document.querySelector('#id');

    const response = await fetch(`/api/users/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
           music
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

async function newTvHandler(event) {
    // event.preventDefault();
    
    const tv = document.querySelector('#tv').value.trim();
    const id = document.querySelector('#id');

    const response = await fetch(`/api/users/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
            tv
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
async function newBookHandler(event) {
    // event.preventDefault();
    
    const books = document.querySelector('#books').value.trim();
    const id = document.querySelector('#id');

    const response = await fetch(`/api/users/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
            books
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
async function newHeroHandler(event) {
    // event.preventDefault();
    
    const heroes = document.querySelector('#hero').value.trim();
    const id = document.querySelector('#id');

    const response = await fetch(`/api/users/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
            heroes
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
document.querySelector('.update_area').addEventListener('submit', newInterestHandler)
$('.btn').on('click', function(){
  var parent_id = $(this);
  console.log(parent_id);
  newInterestHandler(parent_id);
  newAboutMeHandler(parent_id);
  newMeetHandler(parent_id);
  newMusicHandler(parent_id);
  newBookHandler(parent_id);
  newTvHandler(parent_id);
  newHeroHandler(parent_id);
 })