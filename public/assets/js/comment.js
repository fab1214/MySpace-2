async function newCommentHandler(event) {
    event.preventDefault();

    const comment_text = document.querySelector('#comment_text').value.trim();
    
    const response = await fetch(`/api/comments`, {
        method: 'POST',
        body: JSON.stringify({comment_text}),
        headers: { 'Content-Type': 'application/json'}
    });

    if (response.ok) {
        console.log('comment added');
        document.location.replace('/feed');
    } else {
        alert(response.statusText);
    }

}

document.querySelector('.new-comment-form').addEventListener('submit', newCommentHandler)