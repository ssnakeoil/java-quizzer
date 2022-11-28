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
var time = 60;
var scoreCorrect = 0;
var questionNumber = 0;
var endIt = false;

// Creating an array carrying arrays? carrying questions, choices and answers
var questionQuestion = [
  {
    questions: "Question 1?",
    choiceButtons: ["Option 1", "Option 2", "Option 3", "Option 4"],
    answerCheck: "Option 2",
  },
  {
    questions: "Question 2?",
    choiceButtons: ["Option 1", "Option 2", "Option 3", "Option 4"],
    answerCheck: "Option 4",
  },
  {
    questions: "Question 3?",
    choiceButtons: ["Option 1", "Option 2", "Option 3", "Option 4"],
    answerCheck: "Option 3",
  },
  {
    questions: "Question 4?",
    choiceButtons: ["Option 1", "Option 2", "Option 3", "Option 4"],
    answerCheck: "Option 1",
  }
]

// Code for timer
function startTimer(){
  var timeInterval = setInterval(function(){
    if(!endIt && time>0){
      document.getElementById("timer").innerHTML = "Time Remaining: " + time;
      time--;
    } else {
      clearInterval(timeInterval);  
      endIt = true;
      if(scoreCorrect==0 || time==0){
          time=0;
      }
      questions.textContent = "";
      choiceButtons.innerHTML = "";
      answerCheck.textContent = "";
    }
  },1000);
}

// Attempting to devise a function that populates question in place
function populateQuestion(array) {
  if(array != undefined){
      var newQuestion = document.createTextNode(array["questions"]);
      questions.append(newQuestion);
      for (i = 0; i < array.choiceButtons.length; i++) {
          var button = document.createElement("button");
          button.setAttribute("class", "btn btn-info");
          button.textContent = array.choiceButtons[i];
          button.setAttribute("data-value", array.choiceButtons[i]);
          choiceButtons.append(button);
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
  var questionDisplay = questionQuestion[questionNumber];
  populateQuestion(questionDisplay);
});

// listens for the selected choices
choiceButtons.addEventListener("click", function (event) {
  if (event.target.matches("button")) {
      var selectedAnswer = event.target.textContent;
      if(selectedAnswer != questionQuestion[questionNumber].answerCheck){
          time -= 10;
          answerCheck.textContent = "Incorrect!";
      }else {
          scoreCorrect++;
          answerCheck.textContent = "Correct!";
      }
      setTimeout(function () {
          questionNumber++;
          var questionDisplay = questionQuestion[questionNumber];
          if(time<0){
              time=0;
          }
          questions.textContent = "";
          choiceButtons.innerHTML = "";
          populateQuestion(questionDisplay);
      }, 100);
  }
});