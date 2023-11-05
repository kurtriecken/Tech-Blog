const deleteBlogPost = async (event) => {
    event.preventDefault();
    // event.stopPropogation();

    // Ensures what was clicked was a delete button
    if (event.target.nodeName == 'BUTTON') {
        // console.log(event.target.getAttribute('data-id'));
        let id = event.target.getAttribute('data-id');

        // Perform an API call to delete the target blog post
        const response = await fetch(`/api/blogposts/${id}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.reload();
        }
        else {
            alert(response.statusText);
        }

        // After a successful deletion, reload the page
        // Page should reload without the deleted blog post
    };
};

document.querySelector('#profile-post-list').addEventListener('click', deleteBlogPost);