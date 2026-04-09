// ================================================
// STORIES DATA
// ================================================

const storiesData = {
    1: {
        title: "Max the Brave Dog",
        color: "#f5576c",
        pages: [
            {
                title: "Max the Brave Dog",
                page: "Page 1 of 5",
                emoji: "🐕",
                content: "Max was a small brown dog who lived in a quiet village near the forest. Even though he was little, Max always dreamed of becoming brave and strong. Every day, he watched the bigger dogs protect the village, and deep inside his heart, he wished he could do something important too."
            },
            {
                title: "Max the Brave Dog",
                page: "Page 2 of 5",
                emoji: "🌳",
                content: "One bright morning, Max decided that today was the perfect day to explore. He walked slowly through the village, feeling excited and a little nervous. The birds were singing, the wind was gentle, and Max felt that something special was waiting for him ahead."
            },
            {
                title: "Max the Brave Dog",
                page: "Page 3 of 5",
                emoji: "😟",
                content: "As Max walked deeper into the forest, he suddenly realized he was lost. The tall trees looked the same, and the path had disappeared. His heart started beating fast, and fear filled his mind. But Max remembered his dream of being brave and chose not to give up."
            },
            {
                title: "Max the Brave Dog",
                page: "Page 4 of 5",
                emoji: "😻",
                content: "While searching for a way out, Max heard a soft cry nearby. He followed the sound and found a small kitten trapped between rocks. Even though he was scared, Max carefully helped the kitten escape. At that moment, Max discovered what true bravery really meant."
            },
            {
                title: "Max the Brave Dog",
                page: "Page 5 of 5 - THE END",
                emoji: "😊",
                content: "After helping the kitten, Max finally found his way home. The villagers were proud of his courage and kindness. Max smiled happily because he learned that bravery comes from the heart. From that day on, Max was known as the bravest dog in the village.\n\n✨ Thank you for reading Max's adventure! Remember: True bravery is helping others, even when you're scared."
            }
        ]
    },
    2: {
        title: "Luna & the Magic Star",
        color: "#00f2fe",
        pages: [
            {
                title: "Luna & the Magic Star",
                page: "Page 1 of 5",
                emoji: "🐱",
                content: "Luna was a small gray cat who loved to explore new places. Every morning, she peeked outside her window with excitement. She believed the world was full of secrets waiting for her to discover. Today was going to be special, she could feel it in her whiskers."
            },
            {
                title: "Luna & the Magic Star",
                page: "Page 2 of 5",
                emoji: "🦋",
                content: "One day, Luna followed a beautiful butterfly into the garden. She jumped over flowers and chased shadows happily. The adventure made her heart beat fast with joy and excitement. She had never seen such colorful and amazing things before."
            },
            {
                title: "Luna & the Magic Star",
                page: "Page 3 of 5",
                emoji: "😟",
                content: "Suddenly, Luna heard a strange sound coming from near a tree. She felt scared but chose to stay brave and curious. Her curiosity was stronger than her fear of the unknown. She took a deep breath and moved forward to discover what it was."
            },
            {
                title: "Luna & the Magic Star",
                page: "Page 4 of 5",
                emoji: "🐦",
                content: "The sound turned out to be a tiny bird trapped in the leaves and branches. Luna gently used her paws to help free the bird from its trap. The bird chirped happily before flying away into the sky. Luna felt so happy knowing she had helped someone in need."
            },
            {
                title: "Luna & the Magic Star",
                page: "Page 5 of 5 - THE END",
                emoji: "😊",
                content: "As the sun set, Luna returned home safely. She felt proud of her small adventure and what she had accomplished. That night, she dreamed of exploring and helping others again tomorrow. Luna learned that curiosity and kindness can lead to beautiful adventures.\n\n✨ Thank you for reading Luna's magical journey! Remember: Curiosity and kindness open doors to wonderful adventures."
            }
        ]
    },
    3: {
        title: "Timmy the Tiny Turtle",
        color: "#fee140",
        pages: [
            {
                title: "Timmy the Tiny Turtle",
                page: "Page 1 of 5",
                emoji: "🐢",
                content: "Timmy was a tiny turtle who lived by the sparkling river. He loved watching the fish swim and the birds play in the sky. Every day, he dreamed of exploring the world beyond his little home. But he was so small that he wondered if he could ever do big things."
            },
            {
                title: "Timmy the Tiny Turtle",
                page: "Page 2 of 5",
                emoji: "⛰️",
                content: "One morning, Timmy decided to crawl to the big rock near the river. The path was tricky and filled with tiny stones and obstacles. He moved slowly but carefully, determined to reach the very top. Even though he was small, Timmy had a big heart and big dreams."
            },
            {
                title: "Timmy the Tiny Turtle",
                page: "Page 3 of 5",
                emoji: "🦋",
                content: "Timmy saw a colorful butterfly dancing above the flowers. He wanted to follow it but realized the butterfly flew so very high. Timmy smiled, knowing he could always try again next time. He learned that not everything is about reaching the top, but about trying."
            },
            {
                title: "Timmy the Tiny Turtle",
                page: "Page 4 of 5",
                emoji: "🐸",
                content: "Suddenly, Timmy heard a tiny cry coming from near the grass. A little frog had fallen and couldn't jump back into the pond. Timmy carefully helped the frog return safely to the water. He realized that being small didn't mean he couldn't help others."
            },
            {
                title: "Timmy the Tiny Turtle",
                page: "Page 5 of 5 - THE END",
                emoji: "😊",
                content: "After helping the frog, Timmy returned home happily. He realized that small creatures can also do big things. That night, he dreamed of new adventures waiting for him tomorrow. Timmy learned that size doesn't matter when you have a big heart and determination.\n\n✨ Thank you for reading Timmy's inspiring journey! Remember: It's not about your size, it's about your heart and determination."
            }
        ]
    }
};

let currentStory = null;
let currentPage = 0;

// ================================================
// STORY SELECTION
// ================================================

function selectStory(storyNum, element) {
    // Highlight selected story
    document.querySelectorAll('.story-item').forEach(item => {
        item.style.borderColor = 'transparent';
    });
    element.style.borderColor = '#667eea';
    
    currentStory = storyNum;
    currentPage = 0;
    displayStory();
}

// ================================================
// DISPLAY STORY
// ================================================

function displayStory() {
    if (!currentStory) return;

    const story = storiesData[currentStory];
    const page = story.pages[currentPage];

    // Hide stories list, show story content
    document.querySelector('.stories-list').style.display = 'none';
    document.getElementById('storyContent').style.display = 'block';

    // Update page indicator
    document.getElementById('storyPageIndicator').textContent = page.page;

    // Display story content
    const storyDisplay = document.getElementById('storyDisplay');
    storyDisplay.innerHTML = `
        <h1>${page.title}</h1>
        <h3>${page.page}</h3>
        <div class="story-emoji-display">${page.emoji}</div>
        <p class="story-text">${page.content}</p>
    `;

    // Update button states
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');

    prevBtn.style.display = currentPage > 0 ? 'block' : 'none';
    nextBtn.style.display = currentPage < story.pages.length - 1 ? 'block' : 'none';
}

// ================================================
// NAVIGATION
// ================================================

function nextPage() {
    if (currentStory && currentPage < storiesData[currentStory].pages.length - 1) {
        currentPage++;
        displayStory();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

function prevPage() {
    if (currentPage > 0) {
        currentPage--;
        displayStory();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

function backToStories() {
    document.querySelector('.stories-list').style.display = 'grid';
    document.getElementById('storyContent').style.display = 'none';
    currentStory = null;
    currentPage = 0;
}