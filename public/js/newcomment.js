const addCommentHandler = async (event) => {
    event.preventDefault();

    console.log("clickcliclklcikc");

    const content = document.querySelector('#comment-content').value.trim();
    const date_created = new Date();
    // const user_id = session.user_id;
    const blog_post_id = document.querySelector('#bp-comment-card').parentElement.getAttribute('data-id');

    console.log(`content: ${content}`);
    console.log(`date_created: ${date_created}`);
    // console.log(`user_id: ${user_id}`);
    console.log(`blog_post_id: ${blog_post_id}`);

    if (content && date_created && blog_post_id) {
        const response = await fetch('/api/comments', {
            method: 'POST',
            body: JSON.stringify({ content, date_created, blog_post_id }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.reload();
        }
        else {
            alert(response.statusText);
        }
    };

};

document.querySelector('.comment-form').addEventListener('submit', addCommentHandler);