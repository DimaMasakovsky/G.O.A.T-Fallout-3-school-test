var requestURL ="assets/questions.json";
var request = new XMLHttpRequest();
request.open('GET',requestURL);
request.responseType = 'json';
request.send();

request.onload = function() { 
  questions = request.response;
  const startBtn = document.querySelector('#start-btn');
  const username = document.querySelector('#username');

  startBtn.addEventListener('click', startGame);

  function startGame() { 
    console.log(username.value);
    console.log(questions[1].questionText);
  }
}
