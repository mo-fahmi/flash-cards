"use strict";

const groupImg = document.getElementById("question__group-img");
const questionTxt = document.getElementById("question__txt");
const codeTxt = document.getElementById("code__block");
const codeContainer = document.getElementById("code-container");
const options = document.querySelectorAll(".option");

// ====================================================================

// questions
const questions = [
  {
    id: 1,
    group: "Javascript",
    question: "What will the following code output?",
    codeBlock: `console.log(typeof null);
    `,
    options: ["Object", "Null", "Undefined"],
    correctOption: 0, // Index of the correct option in 'options'
    timesAsked: 0,
    timesCorrect: 0,
    timesWrong: 0,
  },
  {
    id: 2,
    group: "JavaScript",
    question: "What is the output of the following code?",
    codeBlock: `let x = 10;
      let y = "10";
      console.log(x == y);
    `,
    options: ["true", "false", "Error"],
    correctOption: 0, // Index of the correct option in 'options'
    timesAsked: 0,
    timesCorrect: 0,
    timesWrong: 0,
  },
  {
    id: 3,
    group: "Javascript",
    question: "What does this code print?",
    codeBlock: `
      function test() {
      console.log(a);
      var a = 10;
    }
    test();
    `,
    options: ["10", "undefined", "ReferenceError"],
    correctOption: 1, // Index of the correct option in 'options'
    timesAsked: 0,
    timesCorrect: 0,
    timesWrong: 0,
  },
  {
    id: 4,
    group: "Javascript",
    question: "What will the following code log?",
    codeBlock: `
      console.log('1');
      setTimeout(() => console.log('2'), 1000);
      console.log('3');
    `,
    options: ["1, 2, 3", "1, 3, 2", "3, 1, 2"],
    correctOption: 1, // Index of the correct option in 'options'
    timesAsked: 0,
    timesCorrect: 0,
    timesWrong: 0,
  },
  {
    id: 5,
    group: "JavaScript",
    question: "What is the output of this code?",
    codeBlock: `
      const a = [];
      console.log(a == true);
    `,
    options: ["true", "false", "undefined"],
    correctOption: 1, // false
    timesAsked: 0,
    timesCorrect: 0,
    timesWrong: 0,
  },
  {
    id: 6,
    group: "JavaScript",
    question: "Which of these is not a JavaScript data type?",
    options: ["Object", "Undefined", "Float"],
    correctOption: 2, // Float
    timesAsked: 0,
    timesCorrect: 0,
    timesWrong: 0,
  },
  {
    id: 7,
    group: "JavaScript",
    question: "What is the output of the following code?",
    codeBlock: `
      let x = 5;
      let y = "5";
      console.log(x === y);
    `,
    options: ["true", "false", "undefined"],
    correctOption: 1, // false
    timesAsked: 0,
    timesCorrect: 0,
    timesWrong: 0,
  },
  {
    id: 8,
    group: "JavaScript",
    question: "Which of these methods can be used to combine two arrays?",
    options: ["push()", "concat()", "splice()"],
    correctOption: 1, // concat()
    timesAsked: 0,
    timesCorrect: 0,
    timesWrong: 0,
  },
  {
    id: 9,
    group: "JavaScript",
    question: "What is the output of this code?",
    codeBlock: `
      console.log(typeof NaN);
    `,
    options: ["Number", "NaN", "Undefined"],
    correctOption: 0, // Number
    timesAsked: 0,
    timesCorrect: 0,
    timesWrong: 0,
  },
  {
    id: 10,
    group: "JavaScript",
    question: "What will the following code output?",
    codeBlock: `
      console.log(0.1 + 0.2 === 0.3);
    `,
    options: ["true", "false", "undefined"],
    correctOption: 1, // false
    timesAsked: 0,
    timesCorrect: 0,
    timesWrong: 0,
  },
  {
    id: 11,
    group: "JavaScript",
    question: "What does 'use strict' do in JavaScript?",
    options: [
      "Enables modern JavaScript features",
      "Enforces stricter parsing and error handling",
      "Prevents variable declaration",
    ],
    correctOption: 1, // Enforces stricter parsing and error handling
    timesAsked: 0,
    timesCorrect: 0,
    timesWrong: 0,
  },
  {
    id: 12,
    group: "JavaScript",
    question: "What will the following code log?",
    codeBlock: `let a;
      console.log(a + 1);
    `,
    options: ["1", "NaN", "undefined"],
    correctOption: 1, // NaN
    timesAsked: 0,
    timesCorrect: 0,
    timesWrong: 0,
  },
];

// id - group - question - codeBlock - options - correctOption
// timesAsked - timesCorrect - timesWrong

// ====================================================================

// getback we can't still fix the indentation problem
function removeSpace(str) {
  return str.replace(/^\s+/gm, "");
}

// const string = `
// hi
//   my
//   name
//       is
//   famhi
// `;
// console.log(string);
// console.log(removeSpace(string));
// console.log(questions[3].codeBlock);
// console.log(removeSpace(questions[3].codeBlock));

// ====================================================================

function generateQuestion() {
  const randomNum = Math.floor(Math.random() * questions.length);
  return questions[randomNum];
}

let selectedQ;
let correctAns;

function clearOptions() {
  options.forEach((o) => {
    o.classList.remove("shake");
  });
}

function displayNewQuestion() {
  clearOptions();
  selectedQ = generateQuestion();

  // img
  const group = selectedQ.group.toLowerCase();
  groupImg.src = `assets/${group}.png`;

  // question
  questionTxt.innerText = selectedQ.question;

  // codeBlock
  // deleteme we need to fix the whitespace problem
  codeContainer.style.display = "block";
  selectedQ.codeBlock
    ? (codeTxt.innerText = selectedQ.codeBlock)
    : (codeContainer.style.display = "none");

  // options
  const shuffledAns = selectedQ.options.slice().sort(() => Math.random() - 0.5);
  options.forEach((o, i) => {
    o.innerText = shuffledAns[i];
  });
}

displayNewQuestion();

// ====================================================================

options.forEach((o, i) => {
  o.addEventListener("click", () => {
    const selectedAns = o.innerText;
    correctAns = selectedQ.options[selectedQ.correctOption];

    // right answer
    if (selectedAns === correctAns) {
      playConfetti();
      setTimeout(() => {
        displayNewQuestion();
      }, 650);
      return;
    }

    // wrong answer
    o.classList.add("shake");
  });
});

// ====================================================================

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
