// quiz.js

const quizData = [
    {
        question: "What is the capital of France?",
        options: ["Paris", "London", "Berlin", "Rome"],
        answer: "Paris"
    },
    {
        question: "Which planet is known as the Red Planet?",
        options: ["Earth", "Mars", "Jupiter", "Saturn"],
        answer: "Mars"
    },
    {
        question: "What is the largest mammal?",
        options: ["Elephant", "Blue Whale", "Giraffe", "Hippopotamus"],
        answer: "Blue Whale"
    }
];

const quizContainer = document.querySelector('.quiz');
const questionElement = document.getElementById('question');
const optionsElement = document.getElementById('options');
const nextButton = document.getElementById('nextButton');
const scoreElement = document.getElementById('scoreValue');
const timeElement = document.getElementById('timeValue');
const totalSeconds = 60; 
let currentQuestionIndex = 0;
let score = 0;
let timer;

function startQuiz() {
    showQuestion();
    startTimer();
}

function showQuestion() {
    const currentQuestion = quizData[currentQuestionIndex];
    questionElement.textContent = currentQuestion.question;

    const shuffledOptions = shuffleArray(currentQuestion.options);

    optionsElement.innerHTML = "";
    shuffledOptions.forEach(option => {
        const button = document.createElement('button');
        button.textContent = option;
        button.classList.add('optionButton');
        button.addEventListener('click', () => checkAnswer(option));
        optionsElement.appendChild(button);
    });
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function checkAnswer(selectedAnswer) {
    const currentQuestion = quizData[currentQuestionIndex];
    if (selectedAnswer === currentQuestion.answer) {
        score++;
        scoreElement.textContent = score;
    }
    nextQuestion();
}

function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < quizData.length) {
        showQuestion();
    } else {
        endQuiz();
    }
}

function startTimer() {
    let secondsLeft = totalSeconds;
    timeElement.textContent = secondsLeft;

    timer = setInterval(() => {
        secondsLeft--;
        if (secondsLeft >= 0) {
            timeElement.textContent = secondsLeft;
        } else {
            clearInterval(timer);
            endQuiz();
        }
    }, 1000);
}

function endQuiz() {
    clearInterval(timer);
    questionElement.textContent = "Quiz Finished!";
    optionsElement.innerHTML = "";
    nextButton.style.display = "none";
}

startQuiz();
