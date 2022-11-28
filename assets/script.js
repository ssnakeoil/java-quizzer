// Establishing some variables
var quizContainer = document.getElementById("quizContainer");
var quiz = document.getElementById("quiz");
var questions = document.getElementById("questions");
var choiceButtons = document.getElementById("choiceButtons");
var timer = document.getElementById("timer");

// Initializing stats for timer, score, and questions
var time = 60;
var scoreCorrect = 0;
var questionNumber = 0;

// Creating an array carrying arrays? carrying questions, choices and answers
var questionQuestion = [
  {
    questions: "Question 1?",
    choice: ["Option 1", "Option 2", "Option 3", "Option 4"],
    answer: "Option 2",
  },
  {
    questions: "Question 2?",
    options: ["Option 1", "Option 2", "Option 3", "Option 4"],
    answer: "Option 4",
  },
  {
    questions: "Question 3?",
    options: ["Option 1", "Option 2", "Option 3", "Option 4"],
    answer: "Option 3",
  },
  {
    questions: "Question 4?",
    options: ["Option 1", "Option 2", "Option 3", "Option 4"],
    answer: "Option 1",
  }
]

