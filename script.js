const selectionForm = document.querySelector(".select__and__start");
const groupBtns = document.querySelectorAll(
  ".groups-buttons button:not(#mix-questions)"
);
const mixBtn = document.getElementById("mix-questions");
const startBtn = document.getElementById("start");

const cardContainer = document.querySelector(".card__container");
const groupImg = document.getElementById("question__group-img");
const questionTxt = document.getElementById("question__txt");
const codeTxt = document.getElementById("code__block");
const codeContainer = document.getElementById("code-container");
const options = document.querySelectorAll(".option");
const qAsked = document.getElementById("q__asked");
const qRemaining = document.getElementById("q__remaining");
const qCorrect = document.getElementById("q__correct");
const qWrong = document.getElementById("q__wrong");

// ============================================

// questions
const questions = [
  // JavaScript Group
  {
    id: 10001,
    group: "JavaScript",
    question: "What will the following code output?",
    codeBlock: `
      console.log(typeof null);
    `,
    options: ["Object", "Null", "Undefined"],
    correctOption: 0, // "Object"
    timesAsked: 0,
    timesCorrect: 0,
    timesWrong: 0,
  },
  {
    id: 10002,
    group: "JavaScript",
    question: "What will the following code output?",
    codeBlock: `
      let x = 5;
      let y = "5";
      console.log(x === y);
    `,
    options: ["true", "false", "undefined"],
    correctOption: 1, // "false"
    timesAsked: 0,
    timesCorrect: 0,
    timesWrong: 0,
  },

  // Shopify (Liquid) Group
  {
    id: 20001,
    group: "Shopify",
    question: "What does the 'render' tag do in Liquid?",
    options: [
      "Includes another template file",
      "Loops through an array",
      "Declares a new variable",
    ],
    correctOption: 0, // "Includes another template file"
    timesAsked: 0,
    timesCorrect: 0,
    timesWrong: 0,
  },
  {
    id: 20002,
    group: "Shopify",
    question: "What symbol is used to output variables in Liquid?",
    options: ["{{ }}", "{% %}", "(( ))"],
    correctOption: 0, // "{{ }}"
    timesAsked: 0,
    timesCorrect: 0,
    timesWrong: 0,
  },

  // CSS Group
  {
    id: 30001,
    group: "CSS",
    question: "What does the 'z-index' property do in CSS?",
    options: [
      "Sets the stacking order of elements",
      "Sets the zoom level of elements",
      "Defines the size of elements",
    ],
    correctOption: 0, // "Sets the stacking order of elements"
    timesAsked: 0,
    timesCorrect: 0,
    timesWrong: 0,
  },
  {
    id: 30002,
    group: "CSS",
    question: "What is the default position value for HTML elements in CSS?",
    options: ["static", "relative", "absolute"],
    correctOption: 0, // "static"
    timesAsked: 0,
    timesCorrect: 0,
    timesWrong: 0,
  },

  // Git Group
  {
    id: 40001,
    group: "Git",
    question: "Which command initializes a new Git repository?",
    options: ["git init", "git clone", "git commit"],
    correctOption: 0, // "git init"
    timesAsked: 0,
    timesCorrect: 0,
    timesWrong: 0,
  },
  {
    id: 40002,
    group: "Git",
    question: "What does 'git pull' do?",
    options: [
      "Fetches and merges changes from a remote repository",
      "Pushes changes to a remote repository",
      "Shows the commit history",
    ],
    correctOption: 0, // "Fetches and merges changes from a remote repository"
    timesAsked: 0,
    timesCorrect: 0,
    timesWrong: 0,
  },
];

// ============================================

// MANAGE  SELECTIONS
let selectionClicks = 0;

// Handle select individual groups
groupBtns.forEach((b) => {
  b.addEventListener("click", () => {
    memeTime();
    b.classList.toggle("selected");
    mixBtn.classList.remove("selected");
  });
});

// Handle select all
mixBtn.addEventListener("click", () => {
  memeTime();
  mixBtn.classList.toggle("selected");
  groupBtns.forEach((b) => b.classList.remove("selected"));
});

let qIDs;

// Start button filter selected
function filterSelected() {
  const selectedBtns = Array.from(
    document.querySelectorAll(".selection.selected")
  );

  // selected group values
  const sArr = selectedBtns.map((s) => s.dataset.group);

  // All Questions' Ids
  qIDs = questions.map((q) => q.id);

  // if All button is selected
  if (sArr.includes("all")) {
    startTheShow();
    return;
  }
  // if individual groups selected
  qIDs = qIDs.filter((id) => sArr.some((s) => id.toString().startsWith(s)));

  startTheShow();
  return qIDs;
}

// ============================================

// GENERATE  A  QUESTION

const qCorrectArr = [];
let selectedQ;
let correctAns;
let qAskedCount = 1;
let qWrongCount = 0;
let qCorrectCount = 0;

function generateQuestion() {
  const rdmIdx = Math.floor(Math.random() * qIDs.length);
  const removed = qIDs.splice(rdmIdx, 1);
  // find a question by ID
  selectedQ = questions.find((q) => q.id === Number(removed));
  qAskedCount++;
  selectedQ.timesAsked++;
  return selectedQ;
}

// ============================================

// SHOWING  THE  QUESTION
function startTheShow() {
  // hide form and show questions
  selectionForm.classList.add("hide");
  cardContainer.classList.remove("hide");

  displayNewQuestion();
}

// clear options first
function clrOptn() {
  options.forEach((o) => {
    o.classList.remove("shake");
  });
}

// display question in UI
function displayNewQuestion() {
  updateScores();

  // clear options and generate a new question
  wrongAttempted = false;
  clrOptn();
  selectedQ = generateQuestion();

  // change icon
  const group = selectedQ.group.toLowerCase();
  groupImg.src = `assets/${group}.png`;

  // question text
  questionTxt.innerText = selectedQ.question;

  // codeBlock
  codeContainer.style.display = "block";
  selectedQ.codeBlock
    ? (codeTxt.innerText = selectedQ.codeBlock.replace(/^\s+/gm, "").trim()) // to remove whitespace
    : (codeContainer.style.display = "none");

  // options (shuffled)
  const shuffledAns = selectedQ.options.slice().sort(() => Math.random() - 0.5);
  options.forEach((o, i) => {
    o.innerText = shuffledAns[i];
  });
}
// displayNewQuestion();

// picking an answer
let wrongAttempted = false;

options.forEach((o, i) => {
  o.addEventListener("click", () => {
    const selectedAns = o.innerText;
    correctAns = selectedQ.options[selectedQ.correctOption];

    // right answer
    if (selectedAns === correctAns) {
      if (!wrongAttempted) {
        // Only count if no wrong answers were clicked
        playConfetti();
        selectedQ.timesCorrect++;
        qCorrectCount++;
        qCorrectArr.push(selectedQ.id);
        updateScores();
      }

      setTimeout(() => {
        displayNewQuestion();
      }, 650);
      return;
    }

    // wrong answer
    o.classList.add("shake");
    selectedQ.timesWrong++;
    qWrongCount++;
    updateScores();

    wrongAttempted = true;

    if (!qIDs.includes(Number(selectedQ.id))) qIDs.push(selectedQ.id);
  });
});

// updating scores
function updateScores() {
  qCorrect.innerText = qCorrectCount;
  qRemaining.innerText = qIDs.length - 1;
  qAsked.innerText = qAskedCount;
  qWrong.innerText = qWrongCount;
}

// ============================================

// confetti
function playConfetti() {
  const audio = document.getElementById("confettiSound");
  audio.currentTime = 0;
  audio.play();

  confetti({
    particleCount: 100,
    spread: 45,
    origin: { x: 1, y: 0.7 },
  });

  confetti({
    particleCount: 100,
    spread: 45,
    origin: { x: 0, y: 0.7 },
  });
}

// MEME
const meme = document.querySelector(".stop__meme");
function memeTime() {
  selectionClicks++;
  if (selectionClicks == 12) meme.classList.remove("hide");
}
meme.addEventListener("click", () => {
  meme.classList.add("hide");
});

// ============================================
