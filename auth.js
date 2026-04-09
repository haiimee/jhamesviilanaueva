// ================================================
// AUTHENTICATION SYSTEM
// ================================================

function toggleAuthForm() {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');

    loginForm.style.display = loginForm.style.display === 'none' ? 'block' : 'none';
    registerForm.style.display = registerForm.style.display === 'none' ? 'block' : 'none';
}

// ================================================
// LOGIN
// ================================================

function handleLogin() {
    const email = document.getElementById('loginEmail').value.trim();
    const password = document.getElementById('loginPassword').value.trim();

    clearLoginErrors();

    if (!email) {
        document.getElementById('loginEmailError').textContent = 'Email is required';
        return;
    }

    if (!isValidEmail(email)) {
        document.getElementById('loginEmailError').textContent = 'Invalid email format';
        return;
    }

    if (!password) {
        document.getElementById('loginPasswordError').textContent = 'Password is required';
        return;
    }

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
        localStorage.setItem('currentUser', JSON.stringify(user));
        showDashboard(user);
    } else {
        document.getElementById('loginEmailError').textContent = 'Invalid email or password';
    }
}

// ================================================
// REGISTER
// ================================================

function handleRegister() {
    const name = document.getElementById('registerName').value.trim();
    const email = document.getElementById('registerEmail').value.trim();
    const password = document.getElementById('registerPassword').value.trim();
    const confirmPassword = document.getElementById('confirmPassword').value.trim();

    clearRegisterErrors();

    if (!name || name.length < 2) {
        document.getElementById('registerNameError').textContent = 'Name must be at least 2 characters';
        return;
    }

    if (!email || !isValidEmail(email)) {
        document.getElementById('registerEmailError').textContent = 'Invalid email format';
        return;
    }

    if (!password || password.length < 6) {
        document.getElementById('registerPasswordError').textContent = 'Password must be at least 6 characters';
        return;
    }

    if (password !== confirmPassword) {
        document.getElementById('confirmPasswordError').textContent = 'Passwords do not match';
        return;
    }

    const users = JSON.parse(localStorage.getItem('users')) || [];
    if (users.some(u => u.email === email)) {
        document.getElementById('registerEmailError').textContent = 'Email already registered';
        return;
    }

    const newUser = {
        name: name,
        email: email,
        password: password,
        id: 'USER-' + Date.now()
    };

    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));

    alert('✅ Account created successfully! You can now login.');
    clearRegisterForm();
    toggleAuthForm();
}

// ================================================
// SHOW DASHBOARD
// ================================================

function showDashboard(user) {
    document.getElementById('loginForm').style.display = 'none';
    document.getElementById('registerForm').style.display = 'none';
    document.getElementById('dashboard').style.display = 'block';
    document.getElementById('userName').textContent = user.name;
    document.getElementById('userEmail').textContent = user.email;
}

// ================================================
// LOGOUT
// ================================================

function handleLogout() {
    localStorage.removeItem('currentUser');
    document.getElementById('loginForm').style.display = 'block';
    document.getElementById('registerForm').style.display = 'none';
    document.getElementById('dashboard').style.display = 'none';
    
    document.getElementById('loginEmail').value = '';
    document.getElementById('loginPassword').value = '';
}

// ================================================
// CHECK USER STATUS
// ================================================

function checkUserStatus() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    
    if (currentUser) {
        showDashboard(currentUser);
    } else {
        document.getElementById('loginForm').style.display = 'block';
        document.getElementById('registerForm').style.display = 'none';
        document.getElementById('dashboard').style.display = 'none';
    }
}

// ================================================
// PASSWORD TOGGLE
// ================================================

function togglePassword(fieldId) {
    const field = document.getElementById(fieldId);
    if (field.type === 'password') {
        field.type = 'text';
    } else {
        field.type = 'password';
    }
}

// ================================================
// ERROR CLEARING
// ================================================

function clearLoginErrors() {
    document.getElementById('loginEmailError').textContent = '';
    document.getElementById('loginPasswordError').textContent = '';
}

function clearRegisterErrors() {
    document.getElementById('registerNameError').textContent = '';
    document.getElementById('registerEmailError').textContent = '';
    document.getElementById('registerPasswordError').textContent = '';
    document.getElementById('confirmPasswordError').textContent = '';
}

function clearRegisterForm() {
    document.getElementById('registerName').value = '';
    document.getElementById('registerEmail').value = '';
    document.getElementById('registerPassword').value = '';
    document.getElementById('confirmPassword').value = '';
}