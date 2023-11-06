const deleteOrUpdateBlogPost = async (event) => {
    event.preventDefault();
    // event.stopPropogation();

    // Ensures what was clicked was a delete button
    if (event.target.nodeName == 'BUTTON' && event.target.className == 'delete-button') {
        // console.log(event.target.getAttribute('data-id'));
        let id = event.target.getAttribute('data-id');

        // Perform an API call to delete the target blog post
        const response = await fetch(`/api/blogposts/${id}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
        });

        // After a successful deletion, reload the page
        // Page should reload without the deleted blog post
        if (response.ok) {
            document.location.reload();
        }
        else {
            alert(response.statusText);
        }


    } 
    else if (event.target.nodeName == 'BUTTON' && event.target.className == 'edit-button fa') {
        console.log('clickclickcklckliclik');

        // Render a new page to edit the blog post
    }
};

document.querySelector('#profile-post-list').addEventListener('click', deleteOrUpdateBlogPost);
// document.querySelector('.card-bp').addEventListener('click', renderButtons);