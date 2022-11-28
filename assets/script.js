// Establishing some variables
var quizContainer = document.getElementById("quizContainer");
var quiz = document.getElementById("quiz");
var questions = document.getElementById("questions");
var choiceButtons = document.getElementById("choiceButtons");
var timer = document.getElementById("timer");
var answerCheck = document.getElementById("answerCheck");
var timer = document.getElementById("timer");
var start = document.getElementById("start");

// Initializing stats for timer, score, and questions
var scoreCorrect = 0;
var questionNumber = 0;
var endIt = false;

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

// Code for timer
function startTimer(){
  var time = 60;
  var timeInterval = setInterval(function(){
    if(endIt && time>0){
      document.getElementById("timer").innerHTML = "Time Remaining: " + timeLeft;
      timeLeft--;
    } else {
      clearInterval(timeInterval);  
      endIt = true;
      if(scoreCorrect==0 || time==0){
          timeLeft=0;
      }
      questions.textContent = "";
      choices.innerHTML = "";
      answerStatus.textContent = "";
    }
  },1000);
}

// Attempting to devise a function that populates question in place
function populateQuestion(array) {
  if(array != undefined){
      newQuestion = document.createTextNode(array["questions"]);
      question.append(newQuestion);
      for (i = 0; i < array.choiceButtons.length; i++) {
          button = document.createElement("button");
          button.setAttribute("class", "btn btn-info");
          button.textContent = array.choices[i];
          button.setAttribute("data-value", array.choices[i]);
          choices.append(button);
      }
  } else {
      endIt = true;
      answerCheck.textContent = "";
      if(scoreCorrect==0){
          time=0;
      }
  }
}

// Event listener starts time
start.addEventListener("click", function () {
  startTimer();
  var questionDisplay = stages[questionNumber];
  renderQuestions(questionDisplay);
});

// listens for the selected choices
choices.addEventListener("click", function (event) {
  if (event.target.matches("button")) {
      var selectedAnswer = event.target.textContent;
      if(selectedAnswer != stages[questionNumber].answer){
          time -= 10;
          answerCheck.textContent = "Incorrect!";
      }else {
          scoreCorrect++;
          answerCheck.textContent = "Correct!";
      }
      setTimeout(function () {
          questionNumber++;
          var questionDisplay = stages[questionNumber];
          if(time<0){
              time=0;
          }
          questions.textContent = "";
          choices.innerHTML = "";
          populateQuestion(questionDisplay);
      }, 100);
  }
});