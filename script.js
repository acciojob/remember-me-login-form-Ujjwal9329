//your JS code here. If required.
document.addEventListener("DOMContentLoaded", () => {
    const usernameInput = document.getElementById("username");
    const passwordInput = document.getElementById("password");
    const rememberCheckbox = document.getElementById("checkbox");
    const submitButton = document.getElementById("submit");
    const existingButton = document.getElementById("existing");

    // Check if credentials exist in localStorage
    const savedUsername = localStorage.getItem("username");
    const savedPassword = localStorage.getItem("password");

    if (savedUsername && savedPassword) {
        existingButton.style.display = "block";
    }

    // Handle login submission
    document.getElementById("login-form").addEventListener("submit", (e) => {
        e.preventDefault();
        const username = usernameInput.value;
        const password = passwordInput.value;

        alert(`Logged in as ${username}`);

        if (rememberCheckbox.checked) {
            localStorage.setItem("username", username);
            localStorage.setItem("password", password);
            existingButton.style.display = "block"; // Show existing user button
        } else {
            localStorage.removeItem("username");
            localStorage.removeItem("password");
            existingButton.style.display = "none"; // Hide existing user button
        }
    });

    // Handle existing user login
    existingButton.addEventListener("click", () => {
        alert(`Logged in as ${savedUsername}`);
    });
});
