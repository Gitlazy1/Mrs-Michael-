// Navigation Control
function navigateTo(currentId, nextId) {
    document.getElementById(currentId).classList.remove('active');
    setTimeout(() => {
        document.getElementById(nextId).classList.add('active');
    }, 400);
}

document.getElementById('start-btn').addEventListener('click', () => {
    navigateTo('intro-screen', 'letter-screen');
});

document.getElementById('to-quiz-btn').addEventListener('click', () => {
    navigateTo('letter-screen', 'quiz-screen');
    loadQuestion();
});

// Questionnaire Content Configuration
const quizQuestions = [
    {
        question: "If I'm low-key upset with you, what is the guaranteed fastest way to my heart?",
        options: [
            "A steaming plate of perfectly spiced Asun and my favorite cold drink.",
            "Acting like absolutely nothing happened and calling me big head.",
            "Sending a heavy, long text apology to soften the ground.",
            "A long, emotional voice note with plenty of dramatic sighs."
        ]
    },
    {
        question: "Think back to our longest phone call... what time did we finally hang up?",
        options: [
            "12 Midnight sharp.",
            "2 AM.",
            "Past 4 AM (early morning birds).",
            "We didn't hang up, I slept off."
        ]
    },
    {
        question: "What is my most amazing habit that you secretly find cute?",
        options: [
            "Falling asleep exactly five minutes into the movie we planned to watch together.",
            "Replying with a voice note when you texted a whole paragraph.",
            "Tasting your food and stealing your meat when you aren't looking.",
            "Randomly losing my keys or wallet every single morning."
        ]
    }
];

let currentQuestionIndex = 0;

function loadQuestion() {
    const currentQuiz = quizQuestions[currentQuestionIndex];
    
    // Update Progress Data
    document.getElementById('question-number').innerText = `Question ${currentQuestionIndex + 1} of ${quizQuestions.length}`;
    const progressPercent = ((currentQuestionIndex + 1) / quizQuestions.length) * 100;
    document.getElementById('progress-bar-fill').style.width = `${progressPercent}%`;
    
    // Inject Text
    document.getElementById('question-text').innerText = currentQuiz.question;
    
    // Clear and build options
    const optionsContainer = document.getElementById('options-container');
    optionsContainer.innerHTML = '';
    
    currentQuiz.options.forEach(option => {
        const button = document.createElement('button');
        button.className = 'option-btn';
        button.innerText = option;
        button.addEventListener('click', () => handleAnswerSelection());
        optionsContainer.appendChild(button);
    });
}

function handleAnswerSelection() {
    if (currentQuestionIndex < quizQuestions.length - 1) {
        currentQuestionIndex++;
        // Minor delay for selection feedback feel
        setTimeout(() => {
            loadQuestion();
        }, 300);
    } else {
        setTimeout(() => {
            navigateTo('quiz-screen', 'rewards-screen');
        }, 400);
    }
}

// Audio Configuration
let voiceNote = new Audio('audio/Voice.m4a');

// Modal System Architecture
function openModal(modalId) {
    document.getElementById(modalId).classList.add('active');
    
    // Check if the opened modal is the "miss me" card
    if (modalId === 'miss-me-modal') { 
        voiceNote.currentTime = 0; // Rewind to the start
        voiceNote.play().catch(error => console.log("Audio play blocked by browser:", error));
    }
}

function closeModal(modalId) {
    document.getElementById(modalId).classList.remove('active');
    
    // Pause the audio when she closes the card
    if (modalId === 'miss-me-modal') {
        voiceNote.pause();
    }
}
