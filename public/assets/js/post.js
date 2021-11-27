async function postFormHandler(event) {
    event.preventDefault();

    const post_text = document.querySelector('#post_text').value.trim();
    // Hello

    if (post_text) {
        const response = await fetch('/api/posts', {
            method: 'post',
            body: JSON.stringify({
                post_text

                // post_text: "Hello"
            }),
            headers: { 'Content-Type': 'application/json' }
        });

        if (response.ok) {
            document.location.replace('/');
        } else {
            alert(response.statusText);
        }
    }
}

document.querySelector('.post-form').addEventListener('submit', postFormHandler);