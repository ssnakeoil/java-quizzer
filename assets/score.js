var scoreInput = document.querySelector("#score-text");
var scoreForm = document.querySelector("#score-form");
var scoreList = document.querySelector("#score-list");
var scoreCountSpan = document.querySelector("#score-count");

var scores = [];

function renderScores() {
  // Clear scoreList element and update scoreCountSpan
  scoreList.innerHTML = "";
  scoreCountSpan.textContent = scores.length;

  // Render a new li for each score
  for (var i = 0; i < scores.length; i++) {
    var score = scores[i];

    var li = document.createElement("li");
    li.textContent = score;
    li.setAttribute("data-index", i);

    var button = document.createElement("button");
    button.textContent = "Complete ✔️";

    li.appendChild(button);
    scoreList.appendChild(li);
  }
}

// This function is being called below and will run when the page loads.
function init() {
  // Get stored scores from localStorage
  var storedScores = JSON.parse(localStorage.getItem("scores"));

  // If scores were retrieved from localStorage, update the scores array to it
  if (storedScores !== null) {
    scores = storedScores;
  }

  // This is a helper function that will render scores to the DOM
  renderScores();
}

function storeScores() {
  // Stringify and set key in localStorage to scores array
  localStorage.setItem("scores", JSON.stringify(scores));
}

// Add submit event to form
scoreForm.addEventListener("submit", function(event) {
  event.preventDefault();

  var scoreText = scoreInput.value.trim();

  // Return from function early if submitted scoreText is blank
  if (scoreText === "") {
    return;
  }

  // Add new scoreText to scores array, clear the input
  scores.push(scoreText);
  scoreInput.value = "";

  // Store updated scores in localStorage, re-render the list
  storeScores();
  renderScores();
});

// Add click event to scoreList element
scoreList.addEventListener("click", function(event) {
  var element = event.target;

  // Checks if element is a button
  if (element.matches("button") === true) {
    // Get its data-index value and remove the score element from the list
    var index = element.parentElement.getAttribute("data-index");
    scores.splice(index, 1);

    // Store updated scores in localStorage, re-render the list
    storeScores();
    renderScores();
  }
});

// Add listener to submit element
submitEl.addEventListener("click", showResponse);

// Calls init to retrieve data and render it to the page on load
init()
