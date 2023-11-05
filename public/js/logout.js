const logout = async () => {
  const response = await fetch('/api/users/logout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.ok) {
    document.location.replace('/');
  } else {
    alert(response.statusText);
  }
};

const navToNewPost = async() => {
  document.location.replace('/newpost');
};

document.querySelector('#logout').addEventListener('click', logout);
document.querySelector('#new-post-btn').addEventListener('click', navToNewPost);
