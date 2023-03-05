// Establishing some variables
var quizContainer = document.getElementById("quizContainer");
var quiz = document.getElementById("quiz");
var questions = document.getElementById("questions");
var choiceButtons = document.getElementById("choiceButtons");
var answerCheck = document.getElementById("answerCheck");
var timer = document.getElementById("timer");
var start = document.getElementById("start");

// Initializing stats for timer, score, and questions
var time = 60;
var scoreCorrect = 0;
var questionNumber = 0;
var endIt = false;

// Creating an array carrying questions, choices and answers
// Creating an array carrying questions, choices and answers
var questionQuestion = [
  {  
    questions: "What is \"var\" short for?",
    choiceButtons: ["Variation", "Variable", "Varnish", "Variety"],
    answerCheck: "Variable",
  },
  {
    questions: "When was JavaScript created?",
    choiceButtons: ["1987", "1990", "2002", "1995"],
    answerCheck: "1995",
  },
  {
    questions: "Which of the following is NOT a primitive data type?",
    choiceButtons: ["String", "Number", "Object", "Boolean"],
    answerCheck: "Object",
  },
  {
    questions: "What method can you use to write a message to the console?",
    choiceButtons: ["log()", "fill()", "entries()", "find()"],
    answerCheck: "log()",
  }
]

// Code for timer
function startTimer(){
  var timeInterval = setInterval(function(){
    if(!endIt && time>0){
      document.getElementById("timer").innerHTML = "Seconds Remaining: " + time;
      time--;
    } else {
      clearInterval(timeInterval);  
      endIt = true;
      if(scoreCorrect==0 || time==0){
          time=0;
      }
      questions.textContent = ""; //clears question
      choiceButtons.innerHTML = ""; //clears choices
      answerCheck.textContent = "";
    }
  },1000);
}

//////////////////////////////////////////////////

// Renders the Highscore page 

function  renderSubmitScore(){
  var h1 = document.createElement("h4");
  h1.textContent = "Your Score is: " + timeLeft ;
  submitForm.append(h1);
  var br = document.createElement("br");
  var label = document.createElement("label");
  label.setAttribute("for", "initials");
  label.textContent = "Enter Your Initials";
  submitForm.append(label);
  submitForm.append(br);
  var br = document.createElement("br");
  var initials = document.createElement("input");
  initials.setAttribute("type", "text");
  initials.setAttribute("id", "initials");
  initials.setAttribute("name", "initials");
  initials.required= true;
  submitForm.append(initials);
  submitForm.append(br);
  var submit = document.createElement("input");
  submit.setAttribute("class", "btn btn-info");
  submit.setAttribute("value", "Submit");
  submit.setAttribute("onclick", "saveScore(document.getElementById('initials').value,timeLeft)");
  submitForm.append(submit);
  timer.style.display = "none";
}

// stores the high score
function saveScore(userInitials, score){
  var initials = document.getElementById("initials")
  if(initials.value==""){
      answerStatus.textContent = "Initials can't be blank!";
  } else{
      myStorage = window.localStorage;
      myStorage.setItem(userInitials, score);
      window.location.href = "highscore.html"
  }
}

/////////////////////////////////////////////////?

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

// Event listener starts time and quiz
start.addEventListener("click", function () {
  startTimer();
  start.style.display = "none";
  var questionDisplay = questionQuestion[questionNumber];
  populateQuestion(questionDisplay);
});

// listens to button click
choiceButtons.addEventListener("click", function (event) {
  if (event.target.matches("button")) {
      var selectedAnswer = event.target.textContent;
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