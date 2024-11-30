const groupBtns = document.querySelectorAll(
  ".groups-buttons button:not(#mix-questions)"
);
const mixBtn = document.getElementById("mix-questions");
const startBtn = document.getElementById("start");
const groupImg = document.getElementById("question__group-img");
const questionTxt = document.getElementById("question__txt");
const codeTxt = document.getElementById("code__block");
const codeContainer = document.getElementById("code-container");
const options = document.querySelectorAll(".option");

// ===========================================================

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

// ===========================================================

// manage selection
groupBtns.forEach((b) => {
  b.addEventListener("click", () => {
    b.classList.toggle("selected");
    mixBtn.classList.remove("selected");
  });
});
mixBtn.addEventListener("click", () => {
  const isSelected = mixBtn.classList.contains("selected");
  if (isSelected) {
    mixBtn.classList.remove("selected");
  } else {
    mixBtn.classList.add("selected");
    groupBtns.forEach((b) => b.classList.remove("selected"));
  }
});

function filterSelected() {
  const selectedBtns = Array.from(
    document.querySelectorAll(".selection.selected")
  );
  selectedBtns.forEach((s) => console.log(s.dataset.group));
  console.log(notAsked);
}

// ===========================================================

const notAsked = [];
questions.forEach((q) => notAsked.push(q.id));

const qCorrect = [];

let selectedQ;
let correctAns;

// generate a question
function generateQuestion() {
  const rdmIdx = Math.floor(Math.random() * notAsked.length);
  const removed = notAsked.splice(rdmIdx, 1);
  selectedQ = questions.find((q) => q.id === Number(removed));
  selectedQ.timesAsked++;
  return selectedQ;
}

// ============================================================

// SHOWING  THE  QUESTION

// remove code space
function rmvSpc(str) {
  return str.replace(/^\s+/gm, "").trim();
}

// clear options
function clrOptn() {
  options.forEach((o) => {
    o.classList.remove("shake");
  });
}

// display question in UI
function displayNewQuestion() {
  clrOptn();
  selectedQ = generateQuestion();

  // img
  const group = selectedQ.group.toLowerCase();
  groupImg.src = `assets/${group}.png`;

  // question
  questionTxt.innerText = selectedQ.question;

  // codeBlock
  codeContainer.style.display = "block";
  selectedQ.codeBlock
    ? (codeTxt.innerText = rmvSpc(selectedQ.codeBlock))
    : (codeContainer.style.display = "none");

  // options
  const shuffledAns = selectedQ.options.slice().sort(() => Math.random() - 0.5);
  options.forEach((o, i) => {
    o.innerText = shuffledAns[i];
  });
}
displayNewQuestion();

// picking an answer
options.forEach((o, i) => {
  o.addEventListener("click", () => {
    const selectedAns = o.innerText;
    correctAns = selectedQ.options[selectedQ.correctOption];

    // right answer
    if (selectedAns === correctAns) {
      playConfetti();
      selectedQ.timesCorrect++;
      qCorrect.push(selectedQ.id);
      setTimeout(() => {
        displayNewQuestion();
      }, 650);
      return;
    }

    // wrong answer
    o.classList.add("shake");
    selectedQ.timesWrong++;
    if (!notAsked.includes(Number(selectedQ.id))) notAsked.push(selectedQ.id);
  });
});

// ============================================================

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
