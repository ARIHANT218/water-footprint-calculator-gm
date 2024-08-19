// Game Data
const scenarios = [
    {
        text: "You wake up in the morning. How do you start your day?",
        choices: [
            { text: "Take a long hot shower", footprint: 20 },
            { text: "Quick shower", footprint: 10 },
            { text: "Skip the shower", footprint: 0 },
        ]
    },
    {
        text: "It's time for breakfast. What do you eat?",
        choices: [
            { text: "Bacon and eggs", footprint: 15 },
            { text: "Cereal with milk", footprint: 8 },
            { text: "Fruits and nuts", footprint: 4 },
        ]
    },
    {
        text: "You need to go to work. How do you commute?",
        choices: [
            { text: "Drive your car", footprint: 15 },
            { text: "Carpool", footprint: 8 },
            { text: "Bike or walk", footprint: 0 },
        ]
    }
];

let currentScenarioIndex = 0;
let footprintScore = 0;

// DOM Elements
const scenarioText = document.getElementById('scenario-text');
const choicesContainer = document.getElementById('choices-container');
const footprintScoreElement = document.getElementById('footprint-score');
const startGameButton = document.getElementById('start-game');

// Start the game
startGameButton.addEventListener('click', startGame);

function startGame() {
    currentScenarioIndex = 0;
    footprintScore = 0;
    footprintScoreElement.textContent = footprintScore;
    startGameButton.style.display = 'none';
    showScenario();
}

function showScenario() {
    if (currentScenarioIndex < scenarios.length) {
        const currentScenario = scenarios[currentScenarioIndex];
        scenarioText.textContent = currentScenario.text;
        choicesContainer.innerHTML = '';
        currentScenario.choices.forEach(choice => {
            const choiceButton = document.createElement('button');
            choiceButton.textContent = choice.text;
            choiceButton.addEventListener('click', () => makeChoice(choice.footprint));
            choicesContainer.appendChild(choiceButton);
        });
    } else {
        endGame();
    }
}

function makeChoice(footprint) {
    footprintScore += footprint;
    footprintScoreElement.textContent = footprintScore;
    currentScenarioIndex++;
    showScenario();
}

function endGame() {
    scenarioText.textContent = `Game Over! Your total water footprint is ${footprintScore}.`;
    choicesContainer.innerHTML = '';
    startGameButton.textContent = 'Play Again';
    startGameButton.style.display = 'block';
}
