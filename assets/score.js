function showScores() {
  // get the score from the local storage
  // [] is the default value if there is no value
  var highscore = JSON.parse(window.localStorage.getItem('scoreArray')) || [];
  // sort the highscores by score
  highscore.sort(function (a, b) {
    return b.score - a.score;
  });
  // loop through the highscores
  for (var i = 0; i < highscore.length; i++) {
    // create a list item for each highscore
    var li = document.createElement('li');
    li.textContent = highscore[i].name + ' - ' + highscore[i].score;
    // display the list item
    document.getElementById('highscores').appendChild(li);
  }
}

function clearScores(){
  window.localStorage.removeItem('scoreArray');
  location.reload();
}

document.getElementById('clear').onclick = clearScores;

showScores();

// var chart = document.getElementById("chartData")
// myStorage = window.localStorage;

// // makes table for the highscore
// for (let i = 0; i < myStorage.length; i++) {
//     var key = localStorage.key(i);
//     let storedValue = myStorage.getItem(key)
//     var tr = document.createElement("tr");
//     var td = document.createElement("td");
//     td.textContent = key ;
//     tr.append(td);
//     var td = document.createElement("td");
//     td.textContent = storedValue ;
//     tr.append(td);
//     chart.append(tr);
// }
// clears the highscore in local and on screen
