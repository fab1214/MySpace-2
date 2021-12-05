async function friendRequest(reciever_id) {
    console.log(reciever_id)
    const response = await fetch('/api/friends/request', {
        method: 'post',
        body: JSON.stringify({
            reciever_id
        }),
        headers: { 'Content-Type': 'application/json' }
    })

    if (response.ok) {
        document.location.replace(`/profile/${reciever_id}`);
      } else {
        alert(response.statusText);
      }
}