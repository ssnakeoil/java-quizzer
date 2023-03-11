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
    questions: 'What is "var" short for?',
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
  },
];

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
    //checks if button is clicked
    var selectedAnswer = event.target.textContent;
    var correctAnswer = questionQuestion[questionNumber].answerCheck;
    if (selectedAnswer === correctAnswer) {
      //checks if answer is correct
      answerCheck.textContent = "Correct!";
      scoreCorrect++;
    } else {
      answerCheck.textContent = "Wrong!";
    }
    setTimeout(function () {
      questionNumber++; //increments the question number
      var questionDisplay = questionQuestion[questionNumber];
      if (time < 0) {
        time = 0;
      }
      questions.textContent = "";
      choiceButtons.innerHTML = "";
      populateQuestion(questionDisplay);
      console.log(scoreCorrect);
    }, 100); //sets a delay of 100ms before the next question is displayed
  }
});

// Code for timer
function startTimer() {
  //sets interval for timer
  var timeInterval = setInterval(function () {
    if (!endIt && time > 0) {
      //checks if the quiz is over or if the time is up
      document.getElementById("timer").innerHTML = "Seconds Remaining: " + time;
      time--;
    } else {
      clearInterval(timeInterval);
      endIt = true;
      if (scoreCorrect == 0 || time == 0) {
        //
        time = 0;
      }
      questions.textContent = ""; //clears question
      choiceButtons.innerHTML = ""; //clears choices
      answerCheck.textContent = ""; //clears answer check
      timer.style.display = "none";

      renderScore();
    }
  }, 1000); // 1000ms = 1s
}

// A function that populates question in place
function populateQuestion(array) {
  if (array != undefined) {
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
    if (scoreCorrect == 0) {
      time = 0;
    }
  }
}

//renders score and takes user to score page
function renderScore() {
  quizContainer.textContent = "Your final score is " + time + "!";
  var scoreName = document.createElement("input");
  scoreName.setAttribute("type", "text");
  scoreName.setAttribute("id", "scoreName");
  scoreName.setAttribute("placeholder", "Enter your initials");
  var submitScore = document.createElement("button");
  submitScore.setAttribute("id", "submitScore");
  submitScore.textContent = "Submit";
  quizContainer.append(scoreName);
  quizContainer.append(submitScore);
  submitScore.addEventListener("click", function () {
    var name = document.getElementById("scoreName").value;
    var score = scoreCorrect;
    var scoreObject = {
      name: name,
      score: score,
    };
    var scoreArray = JSON.parse(localStorage.getItem("scoreArray"));
    if (scoreArray == null) {
      scoreArray = [];
    }
    scoreArray.push(scoreObject);
    localStorage.setItem("scoreArray", JSON.stringify(scoreArray));
    console.log(time + scoreName);
    window.location.href = "score.html";
  });
}
