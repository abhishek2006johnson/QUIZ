// =====================
// Quiz Data
// =====================
const questions = [
  {
    question: "Which language runs in a web browser?",
    options: ["Java", "C", "Python", "JavaScript"],
    answer: "JavaScript"
  },
  {
    question: "What does CSS stand for?",
    options: [
      "Central Style Sheets",
      "Cascading Style Sheets",
      "Cascading Simple Sheets",
      "Cars SUVs Sailboats"
    ],
    answer: "Cascading Style Sheets"
  },
  {
    question: "What does HTML stand for?",
    options: [
      "Hypertext Markup Language",
      "Hypertext Markdown Language",
      "Hyperloop Machine Language",
      "Helicopters Terminals Motorboats Lamborghinis"
    ],
    answer: "Hypertext Markup Language"
  },
  {
    question: "What year was JavaScript launched?",
    options: ["1996", "1995", "1994", "None of the above"],
    answer: "1995"
  },
  {
    question: "Which company developed React?",
    options: ["Google", "Facebook", "Microsoft", "Amazon"],
    answer: "Facebook"
  }
];

// =====================
// DOM Elements
// =====================
const quizContainer = document.getElementById("quizContainer");
const nextBtn = document.getElementById("nextBtn");
const restartBtn = document.getElementById("restartBtn");
const timerEl = document.getElementById("timer");
const progressText = document.getElementById("progressText");
const progressBar = document.getElementById("progressBar");
const scoreText = document.getElementById("scoreText");

let currentQuestionIndex = 0;
let score = 0;
let timer;
let timeLeft = 30;

// =====================
// Quiz Functions
// =====================

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  showQuestion();
  startTimer();
  updateProgress();
  nextBtn.disabled = true;
}

function showQuestion() {
  const currentQuestion = questions[currentQuestionIndex];
  quizContainer.innerHTML = `
    <h5>${currentQuestion.question}</h5>
    <div id="options" class="mt-3"></div>
  `;

  const optionsContainer = document.getElementById("options");
  currentQuestion.options.forEach((option) => {
    const btn = document.createElement("button");
    btn.classList.add("btn", "btn-outline-primary", "option-btn");
    btn.textContent = option;
    btn.onclick = () => selectOption(btn, option);
    optionsContainer.appendChild(btn);
  });

  nextBtn.disabled = true;
  timeLeft = 30;
  updateTimerDisplay();
}

function selectOption(btn, selected) {
  const currentAnswer = questions[currentQuestionIndex].answer;
  const buttons = document.querySelectorAll(".option-btn");

  buttons.forEach((button) => {
    button.disabled = true;
    if (button.textContent === currentAnswer) {
      button.classList.add("correct");
    } else if (button.textContent === selected) {
      button.classList.add("wrong");
    }
  });

  if (selected === currentAnswer) {
    score++;
  }

  clearInterval(timer);
  nextBtn.disabled = false;
}

function showNextQuestion() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
    startTimer();
    updateProgress();
  } else {
    showScore();
  }
}

function showScore() {
  const modal = new bootstrap.Modal(document.getElementById("scoreModal"));
  scoreText.innerHTML = `<h4>You scored ${score} out of ${questions.length}!</h4>`;
  modal.show();
}

function restartQuiz() {
  const modal = bootstrap.Modal.getInstance(document.getElementById("scoreModal"));
  modal.hide();
  startQuiz();
}

// =====================
// Timer Functions
// =====================
function startTimer() {
  clearInterval(timer);
  timeLeft = 30;
  updateTimerDisplay();
  timer = setInterval(() => {
    timeLeft--;
    updateTimerDisplay();
    if (timeLeft <= 0) {
      clearInterval(timer);
      autoSelect();
    }
  }, 1000);
}

function updateTimerDisplay() {
  timerEl.textContent = `Time: ${timeLeft}s`;
}

// Automatically select "wrong" if time runs out
function autoSelect() {
  const currentAnswer = questions[currentQuestionIndex].answer;
  const buttons = document.querySelectorAll(".option-btn");
  buttons.forEach((button) => {
    button.disabled = true;
    if (button.textContent === currentAnswer) {
      button.classList.add("correct");
    }
  });
  nextBtn.disabled = false;
}

// =====================
// Progress
// =====================
function updateProgress() {
  progressText.textContent = `Question ${currentQuestionIndex + 1} / ${questions.length}`;
  const percent = ((currentQuestionIndex) / questions.length) * 100;
  progressBar.style.width = `${percent}%`;
}

// =====================
// Event Listeners
// =====================
nextBtn.addEventListener("click", showNextQuestion);
restartBtn.addEventListener("click", restartQuiz);

// =====================
// Init
// =====================
document.addEventListener("DOMContentLoaded", startQuiz);
