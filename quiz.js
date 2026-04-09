// ================================================
// QUIZ DATA
// ================================================

const quizData = [
    {
        question: "What is the capital of the Philippines?",
        choices: ["Cebu", "Manila", "Davao", "Baguio"],
        correct: "Manila"
    },
    {
        question: "What is 8 × 5?",
        choices: ["30", "35", "40", "45"],
        correct: "40"
    },
    {
        question: "Who invented the telephone?",
        choices: ["Newton", "Bell", "Tesla", "Edison"],
        correct: "Bell"
    },
    {
        question: "What does HTML stand for?",
        choices: ["Hyper Text Markup Language", "Home Tool Markup Language", "High Text Machine Language", "Hyperlinks Text Machine Language"],
        correct: "Hyper Text Markup Language"
    },
    {
        question: "Which planet is known as the Red Planet?",
        choices: ["Earth", "Mars", "Venus", "Jupiter"],
        correct: "Mars"
    }
];

let quizState = {
    currentQuestion: 0,
    score: 0,
    timeLeft: 15,
    timer: null,
    selectedAnswer: null,
    answered: false
};

let quizInitialized = false;

// ================================================
// INITIALIZE QUIZ
// ================================================

function initQuiz() {
    if (quizInitialized) return;
    quizInitialized = true;

    quizState = {
        currentQuestion: 0,
        score: 0,
        timeLeft: 15,
        timer: null,
        selectedAnswer: null,
        answered: false
    };

    showQuestion(0);
}

// ================================================
// SHOW QUESTION
// ================================================

function showQuestion(index) {
    const question = quizData[index];
    
    const progress = ((index + 1) / quizData.length) * 100;
    document.getElementById('progressBar').style.width = progress + '%';
    document.getElementById('questionNumber').textContent = index + 1;
    document.getElementById('totalQuestions').textContent = quizData.length;
    
    let choicesHTML = '';
    question.choices.forEach((choice) => {
        choicesHTML += `<button class="choice-btn">${choice}</button>`;
    });
    
    const quizContent = document.getElementById('quizContent');
    quizContent.innerHTML = `
        <p>${question.question}</p>
        <div class="choices">
            ${choicesHTML}
        </div>
    `;
    
    quizState.selectedAnswer = null;
    quizState.answered = false;
    document.getElementById('quizFeedback').textContent = '';
    document.getElementById('quizFeedback').classList.remove('show', 'success', 'error');
    document.getElementById('quizResult').innerHTML = '';
    document.getElementById('quizResult').style.display = 'none';
    
    quizState.timeLeft = 15;
    updateTimer();
    clearInterval(quizState.timer);
    startTimer();
    
    setupChoiceButtons();
    updateNavButtons();
}

// ================================================
// START TIMER
// ================================================

function startTimer() {
    quizState.timer = setInterval(() => {
        quizState.timeLeft--;
        updateTimer();
        
        if (quizState.timeLeft <= 0) {
            clearInterval(quizState.timer);
            quizState.answered = true;
            showFeedback("⏱️ Time's up!", "error");
        }
    }, 1000);
}

// ================================================
// UPDATE TIMER
// ================================================

function updateTimer() {
    const timerDisplay = document.getElementById('timer');
    timerDisplay.textContent = quizState.timeLeft;
    
    if (quizState.timeLeft <= 5) {
        timerDisplay.parentElement.style.color = '#ef4444';
    } else {
        timerDisplay.parentElement.style.color = '#667eea';
    }
}

// ================================================
// SETUP CHOICE BUTTONS
// ================================================

function setupChoiceButtons() {
    const choiceButtons = document.querySelectorAll('.choice-btn');
    const question = quizData[quizState.currentQuestion];
    
    choiceButtons.forEach(btn => {
        btn.onclick = () => {
            if (!quizState.answered) {
                quizState.selectedAnswer = btn.textContent;
                quizState.answered = true;
                clearInterval(quizState.timer);
                
                if (quizState.selectedAnswer === question.correct) {
                    quizState.score++;
                    showFeedback("✅ Correct!", "success");
                    btn.classList.add('correct');
                } else {
                    showFeedback(`❌ Incorrect! Correct answer: ${question.correct}`, "error");
                    btn.classList.add('incorrect');
                    choiceButtons.forEach(b => {
                        if (b.textContent === question.correct) {
                            b.classList.add('correct');
                        }
                    });
                }
            }
        };
    });
}

// ================================================
// SHOW FEEDBACK
// ================================================

function showFeedback(message, type) {
    const feedback = document.getElementById('quizFeedback');
    feedback.textContent = message;
    feedback.classList.add('show', type);
    updateNavButtons();
}

// ================================================
// UPDATE NAV BUTTONS
// ================================================

function updateNavButtons() {
    const quizNav = document.getElementById('quizNav');
    quizNav.innerHTML = '';
    
    const backBtn = document.createElement('button');
    backBtn.className = 'btn-nav';
    backBtn.textContent = '← Back';
    backBtn.onclick = () => closeModal('quiz');
    
    const nextBtn = document.createElement('button');
    nextBtn.className = 'btn-nav';
    nextBtn.textContent = quizState.currentQuestion === quizData.length - 1 ? 'Submit ✓' : 'Next →';
    nextBtn.disabled = !quizState.answered;
    nextBtn.onclick = () => {
        if (quizState.currentQuestion < quizData.length - 1) {
            quizState.currentQuestion++;
            showQuestion(quizState.currentQuestion);
        } else {
            showResult();
        }
    };
    
    quizNav.appendChild(backBtn);
    quizNav.appendChild(nextBtn);
}

// ================================================
// SHOW RESULT
// ================================================

function showResult() {
    document.getElementById('quizContent').innerHTML = '';
    document.getElementById('quizFeedback').textContent = '';
    document.getElementById('quizFeedback').classList.remove('show');
    document.getElementById('quizNav').innerHTML = '';
    
    const percentage = Math.round((quizState.score / quizData.length) * 100);
    const performanceMessage = 
        percentage === 100 ? "🌟 Perfect Score!" :
        percentage >= 80 ? "🎉 Excellent Work!" :
        percentage >= 60 ? "👍 Good Job!" :
        percentage >= 40 ? "💪 Keep Practicing!" :
        "📚 Try Again!";
    
    const resultDiv = document.getElementById('quizResult');
    resultDiv.innerHTML = `
        <h2>${performanceMessage}</h2>
        <div class="score-circle">${percentage}%</div>
        <p>You scored <strong>${quizState.score} out of ${quizData.length}</strong></p>
        <p>Correct Answers: ${quizState.score}</p>
        <p>Incorrect Answers: ${quizData.length - quizState.score}</p>
    `;
    resultDiv.style.display = 'block';
    
    document.getElementById('tryAgainBtn').style.display = 'block';
}

// ================================================
// RESET QUIZ
// ================================================

function resetQuiz() {
    quizInitialized = false;
    document.getElementById('quizResult').style.display = 'none';
    document.getElementById('tryAgainBtn').style.display = 'none';
    initQuiz();
}