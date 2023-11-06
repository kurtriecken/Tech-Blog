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
        let id = event.target.getAttribute('data-id');

        // Replace each text element
        let h1 = document.getElementById(`title-${id}`);
        let inputEle = document.createElement('input');
        inputEle.value = h1.textContent;
        inputEle.setAttribute('id', `new-title-${id}`);
        inputEle.setAttribute('class', 'custom-input');
        inputEle.setAttribute('style', 'margin: 0 0 1% 0');
        h1.parentNode.replaceChild(inputEle, h1);

        let pTag = document.getElementById(`content-${id}`);
        let newInputEle = document.createElement('input');
        newInputEle.value = pTag.textContent;
        newInputEle.setAttribute('id', `new-content-${id}`);
        newInputEle.setAttribute('class', 'custom-input');
        newInputEle.setAttribute('style', 'margin: 0 0 1% 0');
        pTag.parentNode.replaceChild(newInputEle, pTag);

        let newButton = document.createElement('button');
        newButton.textContent = 'Save changes';
        newButton.setAttribute('data-id', `${id}`);
        newButton.setAttribute('class', 'all-buttons');
        newInputEle.parentNode.appendChild(newButton);

        newButton.addEventListener('click', updatePostContent);

    };
};

const updatePostContent = async (event) => {
    event.preventDefault();
    console.log('clikc lick');

    // get info off the elements
    let id = event.target.getAttribute('data-id');
    let title = document.getElementById(`new-title-${id}`).value.trim();
    let content = document.getElementById(`new-content-${id}`).value.trim();
    let date_created = new Date();
    console.trace(`${title} ${content} ${id} ${date_created}`);

    if (title && content && date_created) {
        const response = await fetch(`/api/blogposts/${id}`, {
            method: 'PUT',
            body: JSON.stringify({ title, content, date_created }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            // alert(response.statusText)
            document.location.reload();
        }
        else {
            alert(response.statusText);
        }
    }


    // make a post request to /api/blogposts/:id

    // refresh the page
}

document.querySelector('#profile-post-list').addEventListener('click', deleteOrUpdateBlogPost);