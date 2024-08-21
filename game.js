// Game Dat
// Simple database of items and their water footprints (in liters)
const waterFootprints = {
    "Apple": 70,
    "Beef": 15400,
    "Banana": 160,
    "Milk": 1000,
    "Rice": 2500,
    "Bread": 1600
};

// Calculate Water Footprint
function calculateFootprint() {
    const itemInput = document.getElementById('item-input').value.trim();
    const resultText = document.getElementById('result-text');
    
    if (itemInput in waterFootprints) {
        const footprint = waterFootprints[itemInput];
        resultText.textContent = `The water footprint of ${itemInput} is ${footprint} liters.`;
    } else {
        resultText.textContent = `Sorry, we don't have data for ${itemInput}.`;
    }
}

// Memory Game Logic
let memoryCards = [];
let flippedCards = [];
let matchedPairs = 0;

function createMemoryGame() {
    const items = Object.keys(waterFootprints);
    memoryCards = [];
    items.forEach(item => {
        memoryCards.push({ name: item, type: 'item' });
        memoryCards.push({ name: waterFootprints[item], type: 'footprint' });
    });
    memoryCards = shuffle(memoryCards);
    renderMemoryGame();
}

function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}

function renderMemoryGame() {
    const memoryGameElement = document.getElementById('memory-game');
    memoryGameElement.innerHTML = '';
    memoryCards.forEach((card, index) => {
        const cardElement = document.createElement('div');
        cardElement.className = 'memory-card';
        cardElement.setAttribute('data-index', index);
        cardElement.onclick = flipCard;
        memoryGameElement.appendChild(cardElement);
    });
}

function flipCard() {
    const index = this.getAttribute('data-index');
    const card = memoryCards[index];

    if (flippedCards.length < 2 && !this.classList.contains('flipped')) {
        this.classList.add('flipped');
        this.textContent = card.name;
        flippedCards.push({ ...card, element: this });

        if (flippedCards.length === 2) {
            checkMatch();
        }
    }
}

function checkMatch() {
    const [card1, card2] = flippedCards;

    if (
        (card1.type === 'item' && card2.type === 'footprint' && waterFootprints[card1.name] == card2.name) ||
        (card2.type === 'item' && card1.type === 'footprint' && waterFootprints[card2.name] == card1.name)
    ) {
        matchedPairs++;
        flippedCards = [];
        if (matchedPairs === memoryCards.length / 2) {
            document.getElementById('memory-game-status').textContent = "You've matched all pairs!";
        }
    } else {
        setTimeout(() => {
            card1.element.classList.remove('flipped');
            card1.element.textContent = '';
            card2.element.classList.remove('flipped');
            card2.element.textContent = '';
            flippedCards = [];
        }, 1000);
    }
}

function resetMemoryGame() {
    matchedPairs = 0;
    flippedCards = [];
    createMemoryGame();
    document.getElementById('memory-game-status').textContent = '';
}

// Trivia Game Logic
let triviaQuestions = [];
let currentQuestionIndex = 0;

function createTriviaQuestions() {
    triviaQuestions = Object.keys(waterFootprints).map(item => ({
        question: `What is the water footprint of ${item}?`,
        correctAnswer: waterFootprints[item],
        options: shuffle([
            waterFootprints[item],
            waterFootprints[item] + 500,
            waterFootprints[item] - 500,
            waterFootprints[item] + 1000
        ])
    }));
}

function renderTriviaQuestion() {
    const triviaQuestionElement = document.getElementById('trivia-question');
    const triviaOptionsElement = document.getElementById('trivia-options');
    const triviaFeedbackElement = document.getElementById('trivia-feedback');
    
    const currentQuestion = triviaQuestions[currentQuestionIndex];
    triviaQuestionElement.textContent = currentQuestion.question;
    triviaOptionsElement.innerHTML = '';

    currentQuestion.options.forEach(option => {
        const optionElement = document.createElement('div');
        optionElement.className = 'trivia-option';
        optionElement.textContent = `${option} liters`;
        optionElement.onclick = () => checkTriviaAnswer(option);
        triviaOptionsElement.appendChild(optionElement);
    });

    triviaFeedbackElement.textContent = '';
}

function checkTriviaAnswer(selectedOption) {
    const currentQuestion = triviaQuestions[currentQuestionIndex];
    const triviaFeedbackElement = document.getElementById('trivia-feedback');

    if (selectedOption === currentQuestion.correctAnswer) {
        triviaFeedbackElement.textContent = "Correct!";
    } else {
        triviaFeedbackElement.textContent = `Wrong. The correct answer is ${currentQuestion.correctAnswer} liters.`;
    }
}

function nextTriviaQuestion() {
    currentQuestionIndex = (currentQuestionIndex + 1) % triviaQuestions.length;
    renderTriviaQuestion();
}

// Initialize memory and trivia games on page load
window.onload = () => {
    createMemoryGame();
    createTriviaQuestions();
    renderTriviaQuestion();
};
