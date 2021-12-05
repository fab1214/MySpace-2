async function likeClickHandler(event){
    event.preventDefault();
    //create id array, split the URL where there is a /, 
    //and take the last item in the array. this will remove the id #
    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];

    const response = await fetch('/api/posts/like', {
        method: 'PUT',
        body: JSON.stringify({
            post_id: id
        }),
        headers: { 'Content-Type': 'application/json' }
    })

    if(response.ok){
        document.location.reload();
    }else {
        alert('Cannot like the post more than once!');
    }
}

document.querySelector('#like-btn').addEventListener('click', likeClickHandler);