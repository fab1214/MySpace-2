async function deleteFormHandler(event) {
  // event.preventDefault();

  const id = window.location.toString().split("/")[
    window.location.toString().split("/").length - 1
  ];

  const response = await fetch(`/api/posts/${id}`, {
    method: "DELETE",
  });

  if (response.ok) {
    document.location.replace("/");
  } else {
    alert('Post has already been deleted!');
  }
}

document .querySelector(".delete-post-form").addEventListener("submit", deleteFormHandler);
// $('.red').on('click', function(){
//   var parent_id = $(this);
//   console.log(parent_id);
//   deleteFormHandler(parent_id);
//  })