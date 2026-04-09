// ================================================
// ASSISTANT DATA
// ================================================

const assistantData = {
    categories: [
        { id: 'html', label: '📄 HTML', icon: 'fab fa-html5' },
        { id: 'css', label: '🎨 CSS', icon: 'fab fa-css3' },
        { id: 'js', label: '⚡ JavaScript', icon: 'fab fa-js' },
        { id: 'web', label: '🌐 Web Dev', icon: 'fas fa-globe' },
        { id: 'stories', label: '📚 Stories', icon: 'fas fa-book' },
        { id: 'learn', label: '💡 Learning Tips', icon: 'fas fa-lightbulb' }
    ],
    responses: {
        html: [
            { q: "What is HTML?", a: "HTML stands for HyperText Markup Language. It's used to create the structure and content of web pages using tags and elements." },
            { q: "What is a semantic tag?", a: "Semantic tags describe meaning to the browser. Examples: <header>, <nav>, <article>, <section>. They improve accessibility and SEO." },
            { q: "Difference between <div> and <section>", a: "<div> is a generic container for styling. <section> is semantic and represents a thematic grouping of content." }
        ],
        css: [
            { q: "What is CSS?", a: "CSS (Cascading Style Sheets) is used to style HTML elements, controlling colors, layouts, fonts, and more." },
            { q: "What is Flexbox?", a: "Flexbox is a layout model that allows flexible arrangement of elements in rows or columns. Use display: flex on a container." },
            { q: "How to center content?", a: "You can center content using Flexbox: display: flex; justify-content: center; align-items: center;" }
        ],
        js: [
            { q: "What is JavaScript?", a: "JavaScript is a programming language that adds interactivity to web pages. It runs in browsers and can manipulate the DOM." },
            { q: "What is the DOM?", a: "DOM (Document Object Model) is a tree structure representing HTML elements. JavaScript can interact with it to change content and styles." },
            { q: "What is an event listener?", a: "An event listener watches for specific events (like clicks) and runs a function when they occur. Example: element.addEventListener('click', function)" }
        ],
        web: [
            { q: "What is responsive design?", a: "Responsive design makes websites look good on all devices (mobile, tablet, desktop) using flexible layouts and media queries." },
            { q: "What is a framework?", a: "A framework is a collection of pre-written code that helps developers build applications faster. Examples: React, Vue, Angular." },
            { q: "What is an API?", a: "API (Application Programming Interface) is a set of rules that allows programs to communicate with each other and share data." }
        ],
        stories: [
            { q: "Who is Max?", a: "Max is the brave dog from our first story who learns that true bravery comes from helping others, even when scared." },
            { q: "Tell me about Luna", a: "Luna is a curious cat who discovers that curiosity can lead to wonderful adventures and new friendships." },
            { q: "What about Timmy?", a: "Timmy is a tiny turtle who learns that even small creatures can make a big difference through kindness and determination." }
        ],
        learn: [
            { q: "How to learn web development?", a: "Start with HTML basics, then CSS for styling, then JavaScript for interactivity. Practice by building projects!" },
            { q: "Best learning resources?", a: "Try MDN Web Docs, W3Schools, freeCodeCamp, Codecademy. Build projects as you learn to reinforce concepts." },
            { q: "How to stay motivated?", a: "Set small goals, build real projects, join communities, celebrate progress, and remember that everyone starts as a beginner!" }
        ]
    }
};

let currentCategory = null;
let assistantInitialized = false;

// ================================================
// INITIALIZE ASSISTANT
// ================================================

function initAssistant() {
    if (assistantInitialized) return;
    assistantInitialized = true;

    renderCategories();
}

// ================================================
// RENDER CATEGORIES
// ================================================

function renderCategories() {
    const optionsDiv = document.getElementById('assistantOptions');
    optionsDiv.innerHTML = '';
    
    assistantData.categories.forEach(category => {
        const btn = document.createElement('button');
        btn.className = 'option-btn';
        btn.innerHTML = category.label;
        btn.onclick = () => selectCategory(category.id);
        optionsDiv.appendChild(btn);
    });
}

// ================================================
// SELECT CATEGORY
// ================================================

function selectCategory(categoryId) {
    currentCategory = categoryId;
    const optionsDiv = document.getElementById('assistantOptions');
    optionsDiv.innerHTML = '';
    
    const responses = assistantData.responses[categoryId] || [];
    
    responses.forEach(item => {
        const btn = document.createElement('button');
        btn.className = 'option-btn';
        btn.textContent = item.q;
        btn.onclick = () => showAnswer(item.a);
        optionsDiv.appendChild(btn);
    });
    
    const backBtn = document.createElement('button');
    backBtn.className = 'option-btn';
    backBtn.textContent = '← Back';
    backBtn.style.background = 'linear-gradient(135deg, #667eea, #764ba2)';
    backBtn.style.color = 'white';
    backBtn.onclick = () => {
        currentCategory = null;
        assistantInitialized = false;
        initAssistant();
    };
    optionsDiv.appendChild(backBtn);
}

// ================================================
// SHOW ANSWER
// ================================================

function showAnswer(answer) {
    const chatBox = document.getElementById('chatBox');
    
    const messageDiv = document.createElement('div');
    messageDiv.className = 'bot-message animated-message';
    messageDiv.innerHTML = `
        <i class="fas fa-robot"></i>
        <p>${answer}</p>
    `;
    
    chatBox.appendChild(messageDiv);
    chatBox.scrollTop = chatBox.scrollHeight;
}

// ================================================
// SEND MESSAGE
// ================================================

function sendMessage() {
    const input = document.getElementById('userInput');
    const message = input.value.trim();
    
    if (!message) return;
    
    const chatBox = document.getElementById('chatBox');
    
    const userDiv = document.createElement('div');
    userDiv.className = 'user-message';
    userDiv.innerHTML = `<p>${message}</p>`;
    chatBox.appendChild(userDiv);
    
    input.value = '';
    chatBox.scrollTop = chatBox.scrollHeight;
    
    setTimeout(() => {
        const botDiv = document.createElement('div');
        botDiv.className = 'bot-message animated-message';
        
        let response = "That's a great question! I'm learning more topics every day. Try selecting a category above to explore more!";
        
        if (message.toLowerCase().includes('hello') || message.toLowerCase().includes('hi')) {
            response = "Hello! 👋 How can I help you today? Choose a category or ask a question!";
        } else if (message.toLowerCase().includes('story')) {
            response = "We have three amazing stories: Max the Brave Dog, Luna & the Magic Star, and Timmy the Tiny Turtle!";
        } else if (message.toLowerCase().includes('quiz')) {
            response = "You can take our interactive quiz by clicking the Quiz tab!";
        } else if (message.toLowerCase().includes('thanks') || message.toLowerCase().includes('thank')) {
            response = "You're welcome! I'm here to help. Feel free to ask more questions! 😊";
        }
        
        botDiv.innerHTML = `
            <i class="fas fa-robot"></i>
            <p>${response}</p>
        `;
        
        chatBox.appendChild(botDiv);
        chatBox.scrollTop = chatBox.scrollHeight;
    }, 500);
}