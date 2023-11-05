
const signupFormHandler = async (event) => {
    event.preventDefault();
    console.log("clickcliclklcikc");
    // console.trace("celciehlilciheli aleirae aei    e")

    const email = document.querySelector('#email-signup').value.trim();
    const username = document.querySelector('#username-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();

    console.log(email);

    if (email && password && username) {
        // Create a POST request to get the User based on the email
        // and verify the password matches
        const response = await fetch('/api/users', {
            method: 'POST',
            body: JSON.stringify({ email, password, username }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.replace('/login');
        }
        else {
            alert(response.statusText);
        }
    };
};

document.querySelector('.signup-form').addEventListener('submit', signupFormHandler);