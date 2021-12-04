async function dislikeClickHandler(event){
    event.preventDefault();
    //create id array, split the URL where there is a /, 
    //and take the last item in the array. this will remove the id #
    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];

    const response = await fetch('/api/posts/dislike', {
        method: 'PUT',
        body: JSON.stringify({
            post_id: id
        }),
        headers: { 'Content-Type': 'application/json' }
    })

    if(response.ok){
        document.location.reload();
    }else {
        alert('Cannot dislike the post more than once!');
    }
}

document.querySelector('#dislike-btn').addEventListener('click', dislikeClickHandler);