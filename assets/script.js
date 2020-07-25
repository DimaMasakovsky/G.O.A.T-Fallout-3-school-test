resultAttributes = { 
  "Science": 0, 
  "Speech": 0, 
  "Melee-Weapons": 0, 
  "Sneak": 0, 
  "Medicine": 0, 
  "Unarmed": 0, 
  "Nothing": 0, 
  "Explosives": 0, 
  "Big-Guns": 0, 
  "Small-Guns": 0, 
  "Barter": 0, 
  "Lockpick": 0, 
  "Energy-Weapons": 0,
  "Repair": 0   
}

const startBtn = document.querySelector('#start-btn');
const username = document.querySelector('#username');
const startScreen = document.querySelector('.start-screen');
const questionContainer = document.querySelector('#question-container');
const questionTextElement = document.querySelector('#question-text');
const answerBtnsElement = document.querySelector('#answer-buttons');
const questionIndexElement = document.querySelector('#question-index');
let questionOrderIndexGlobal = 0;

var requestURL ="assets/questions.json";
var request = new XMLHttpRequest();
request.open('GET',requestURL);
request.responseType = 'json';
request.send();

request.onload = function() { 
  questions = request.response;
  startBtn.addEventListener('click', startGame);  
}




function startGame() { 
  console.log(username.value);
  startScreen.classList.add('hide');
  questionContainer.classList.remove('hide');
   
  showNextQuestion(questionOrderIndexGlobal); 
}


function showNextQuestion(questionOrderIndex) { 
  resetState();

  questionIndexElement.innerText ="Question " + questions[questionOrderIndex].questionIndex;  
  questionTextElement.innerText = questions[questionOrderIndex].questionText;
  questions[questionOrderIndex].answers.forEach(answer => {
    const answerButton = document.createElement('button');
    answerButton.innerText = answer.answerText;
    answerButton.classList.add('btn');
    answerButton.dataset.spec = answer.answerAttribute; 
    answerButton.addEventListener('click', selectAnswer);

    answerBtnsElement.appendChild(answerButton);
  }); 
  questionOrderIndexGlobal++;
}

function selectAnswer(e) { 
  const selectedButton = e.target; 
  const attributeString = selectedButton.dataset.spec; 
  for (let attribute in resultAttributes) {  
    if (~attributeString.indexOf(attribute)) { 
      resultAttributes[attribute]++; 
    }
  }
  
  showNextQuestion(questionOrderIndexGlobal); 
}

function resetState() { 
  while (answerBtnsElement.firstChild) { 
    answerBtnsElement.removeChild(answerBtnsElement.firstChild);
  } 
}