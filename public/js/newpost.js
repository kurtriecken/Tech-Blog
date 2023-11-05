const createNewPost = async (event) => {
    event.preventDefault();
    console.log("clickckc");

    const title = document.querySelector('#title-post').value.trim();
    const content = document.querySelector('#content-post').value.trim();
    const date_created = new Date();

    if (title && content) {
        // Create a POST request to create a new BlogPost
        const response = await fetch('/api/blogposts', {
            method: 'POST',
            body: JSON.stringify({ title, content, date_created }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.replace('/profile');
        }
        else {
            alert(response.statusText);
        }
    };

    console.log(title);
    console.log(content);


};

document.querySelector('.new-post-form').addEventListener('submit', createNewPost);