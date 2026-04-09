// ================================================
// MODAL SYSTEM
// ================================================

const modals = {
    stories: document.getElementById('storiesModal'),
    login: document.getElementById('loginModal'),
    assistant: document.getElementById('assistantModal'),
    quiz: document.getElementById('quizModal')
};

// For use from index.html (home page)
function openModal(modalName) {
    const modal = modals[modalName];
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Initialize modal content
        if (modalName === 'assistant') {
            initAssistant();
        } else if (modalName === 'quiz') {
            initQuiz();
        } else if (modalName === 'login') {
            checkUserStatus();
        }
    }
}

// For use from projects.html (projects page)
function openProjectModal(modalName) {
    const modal = modals[modalName];
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Initialize modal content based on project
        if (modalName === 'assistant') {
            assistantInitialized = false;
            initAssistant();
        } else if (modalName === 'quiz') {
            quizInitialized = false;
            initQuiz();
        } else if (modalName === 'login') {
            checkUserStatus();
        } else if (modalName === 'stories') {
            // Reset stories
            currentStory = null;
            currentPage = 0;
        }
    }
}

function closeModal(modalName) {
    const modal = modals[modalName];
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
        
        // Clean up
        if (modalName === 'quiz') {
            clearInterval(window.quizTimer);
        }
    }
}

// For use from projects.html (projects page)
function closeProjectModal(modalName) {
    closeModal(modalName);
}

// Close modal when clicking overlay
document.querySelectorAll('.modal-overlay').forEach(overlay => {
    overlay.addEventListener('click', function() {
        const modal = this.closest('.modal');
        const modalName = Object.keys(modals).find(key => modals[key] === modal);
        if (modalName) {
            closeModal(modalName);
        }
    });
});

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        Object.keys(modals).forEach(key => {
            if (modals[key] && modals[key].classList.contains('active')) {
                closeModal(key);
            }
        });
    }
});

// Prevent modal from closing when clicking inside content
document.querySelectorAll('.modal-content').forEach(content => {
    content.addEventListener('click', (e) => {
        e.stopPropagation();
    });
});