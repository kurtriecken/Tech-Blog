const navToNewPost = async() => {
    document.location.replace('/newpost');
  };

document.querySelector('#new-post-btn').addEventListener('click', navToNewPost);
