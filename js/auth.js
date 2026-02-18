const usersKey = "sims_users";
const loginKey = "sims_logged_in";

/* REGISTER */
if (document.getElementById("registerForm")) {
    document.getElementById("registerForm").addEventListener("submit", function(e) {
        e.preventDefault();

        const name = regName.value.trim();
        const email = regEmail.value.trim();
        const password = regPassword.value;
        const confirm = regConfirmPassword.value;
        const message = document.getElementById("registerMessage");

        const passRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

        if (!name || !email || !password || !confirm)
            return message.textContent = "All fields required";

        if (!passRegex.test(password))
            return message.textContent = "Password must be strong";

        if (password !== confirm)
            return message.textContent = "Passwords do not match";

        let users = JSON.parse(localStorage.getItem(usersKey)) || [];

        if (users.find(u => u.email === email))
            return message.textContent = "Email already exists";

        users.push({ name, email, password });
        localStorage.setItem(usersKey, JSON.stringify(users));

        window.location.href = "login.html";
    });
}

/* LOGIN */
if (document.getElementById("loginForm")) {
    document.getElementById("loginForm").addEventListener("submit", function(e) {
        e.preventDefault();

        const email = loginEmail.value.trim();
        const password = loginPassword.value;
        const message = document.getElementById("loginMessage");

        let users = JSON.parse(localStorage.getItem(usersKey)) || [];
        const user = users.find(u => u.email === email && u.password === password);

        if (!user)
            return message.textContent = "Invalid credentials";

        localStorage.setItem(loginKey, JSON.stringify(user));
        window.location.href = "dashboard.html";
    });
}
