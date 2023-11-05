const loginFormHandler = async (event) => {
    event.preventDefault();
    console.log("clickcliclklcikc");

    const username = document.querySelector('#username-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();

    console.log(username);

    if (username && password) {
        // Create a POST request to get the User based on the username
        // and verify the password matches
        const response = await fetch('/api/users/login', {
            method: 'POST',
            body: JSON.stringify({ username, password }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.replace('/profile');
        }
        else {
            alert(response.statusText);
        }
    };
};





document.querySelector('.login-form').addEventListener('submit', loginFormHandler);
