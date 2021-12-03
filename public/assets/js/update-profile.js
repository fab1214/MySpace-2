// async function newAboutMeHandler(event) {
//     event.preventDefault();
    
//     const about_me = document.querySelector('#about_me').value.trim();
//     const id = document.querySelector('#id');

//     const response = await fetch(`/api/users/${id}`, {
//         method: 'PUT',
//         body: JSON.stringify({
//             about_me
//         }),
//         headers: {
//             'Content-Type': 'application/json'
//         }
//     })

//     if (response.ok) {
//         console.log('user updated');
//         document.location.replace('/');
//     } else {
//       alert(response.statusText);
//     }
// }

// async function newInterestHandler(event) {
//     event.preventDefault();

//     const interests = document.querySelector('#interests').value.trim();
//     const id = document.querySelector('#id');

//     const response = await fetch(`/api/users/${id}`, {
//         method: 'PUT',
//         body: JSON.stringify({
//             interests
//         }),
//         headers: {
//             'Content-Type': 'application/json'
//         }
//     })

//     if (response.ok) {
//         console.log('user updated');
//         document.location.replace('/');
//     } else {
//       alert(response.statusText);
//     }
// }

async function songFormHandler(event) {
    event.preventDefault();

    const id = document.querySelector('#id');
    let song_link = document.getElementById('youtube_link').value.trim();
    if(song_link.charAt(0) === 'h') {
        song_link = song_link.replace('https://www.youtube.com/watch?v=', '');
    } else if (song_link.charAt(0) === 'w') {
        song_link = song_link.replace('www.youtube.com/watch?v=', '');
    } else if (song_link.charAt(0) === 'y') {
        song_link = song_link.replace('youtube.com/watch?v=', '');
    } else if(song_link.charAt(0) === 'H') {
        song_link = song_link.replace('Https://www.youtube.com/watch?v=', '');
    } else if (song_link.charAt(0) === 'W') {
        song_link = song_link.replace('Www.youtube.com/watch?v=', '');
    } else if (song_link.charAt(0) === 'Y') {
        song_link = song_link.replace('Youtube.com/watch?v=', '');
    }

    if (song_link) {
        let apiUrl = `https://api.song.link/v1-alpha.1/links?platform=youtube&type=song&id=${song_link}`

        fetch(apiUrl).then(function(APIresponse) {
            if (APIresponse.ok) {
                APIresponse.json().then(async function(data) {
                    let entityUniqueId =  data.entityUniqueId
                    let song_title = data.entitiesByUniqueId[entityUniqueId].title
                    
                    if (song_title) {
                        console.log('hi')
                        const response = await fetch(`/api/users/${id}`, {
                            method: 'PUT',
                            body: JSON.stringify({
                                song_title,
                                song_link
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
                })
            }
        })
    }
}



// document.querySelector('.about-me-form').addEventListener('submit', newAboutMeHandler);
// document.querySelector('.interests-form').addEventListener('submit', newInterestHandler);
document.querySelector('.song-form').addEventListener('submit', songFormHandler)
// $('#aboutBtn').on('click', function(){
//     var parent_id = $(this);
//     console.log(parent_id);
    
//    })