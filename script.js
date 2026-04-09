// ================================================
// MOBILE MENU TOGGLE
// ================================================

const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    const navLinks = navMenu.querySelectorAll('a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
}

// ================================================
// SMOOTH SCROLL
// ================================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// ================================================
// CONTACT FORM HANDLER
// ================================================

function handleContactForm(event) {
    event.preventDefault();

    const name = document.getElementById('contactName').value.trim();
    const email = document.getElementById('contactEmail').value.trim();
    const subject = document.getElementById('contactSubject').value.trim();
    const message = document.getElementById('contactMessage').value.trim();

    clearContactErrors();

    let isValid = true;

    if (!name || name.length < 2) {
        showContactError('contactNameError', 'Name must be at least 2 characters');
        isValid = false;
    }

    if (!email || !isValidEmail(email)) {
        showContactError('contactEmailError', 'Please enter a valid email address');
        isValid = false;
    }

    if (!subject || subject.length < 3) {
        showContactError('contactSubjectError', 'Subject must be at least 3 characters');
        isValid = false;
    }

    if (!message || message.length < 10) {
        showContactError('contactMessageError', 'Message must be at least 10 characters');
        isValid = false;
    }

    if (isValid) {
        const formData = {
            name: name,
            email: email,
            subject: subject,
            message: message,
            date: new Date().toLocaleString()
        };

        let messages = JSON.parse(localStorage.getItem('contactMessages')) || [];
        messages.push(formData);
        localStorage.setItem('contactMessages', JSON.stringify(messages));

        const successMsg = document.getElementById('contactSuccessMessage');
        successMsg.textContent = '✅ Message sent successfully! Thank you for reaching out.';
        successMsg.classList.add('show');

        document.getElementById('contactForm').reset();

        setTimeout(() => {
            successMsg.classList.remove('show');
        }, 5000);
    }
}

// ================================================
// UTILITY FUNCTIONS
// ================================================

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showContactError(elementId, message) {
    const errorElement = document.getElementById(elementId);
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.classList.add('show');
    }
}

function clearContactErrors() {
    document.querySelectorAll('.contact-form .error-message').forEach(el => {
        el.textContent = '';
        el.classList.remove('show');
    });
}

// ================================================
// PAGE LOAD ANIMATIONS
// ================================================

window.addEventListener('load', () => {
    // Animate elements on page load
    const elements = document.querySelectorAll('.feature-card, .project-card, .stat-card');
    elements.forEach((el, index) => {
        setTimeout(() => {
            el.style.opacity = '1';
        }, index * 100);
    });
});

// ================================================
// SCROLL ANIMATION
// ================================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.feature-card, .project-card, .stat-card, .feature-showcase-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'all 0.6s ease';
    observer.observe(el);
});