const loginFormHandler = async (event) => {
    event.preventDefault();
    console.log("clickcliclklcikc");

    const email = document.querySelector('#email-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();

    console.log(email);

    if (email && password) {
        // Create a POST request to create a user
        const response = await fetch('/api/users/login', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
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
document.querySelector('.signup-form').addEventListener('submit', signupFormHandler);
