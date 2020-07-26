const resultAttributes = { 
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
const startScreen = document.querySelector('.start-screen');
const questionContainer = document.querySelector('#question-container');
const questionTextElement = document.querySelector('#question-text');
const answerBtnsElement = document.querySelector('#answer-buttons');
const questionIndexElement = document.querySelector('#question-index');
const quizResultElement = document.querySelector('#quiz-result');
const tryAgainBtn = document.querySelector('#try-again-button');
const jobNameField = document.querySelector('#job-name');
const quoteField = document.querySelector('#quote');
let questionOrderIndexGlobal = 0;

var requestURL ="assets/questions.json";
var request = new XMLHttpRequest();
request.open('GET',requestURL);
request.responseType = 'json';
request.send();

request.onload = function() { 
  questions = request.response.qst;
  results = request.response.result; 
  startBtn.addEventListener('click', startGame);  
}




function startGame() { 
  for (let attribute in resultAttributes) { 
    resultAttributes[attribute] = 0; 
  }
  questionOrderIndexGlobal = 0;
  startScreen.classList.add('hide');
  questionContainer.classList.remove('hide');
  quizResultElement.classList.add('hide');
   
  showNextQuestion(questionOrderIndexGlobal); 
}


function showNextQuestion(questionOrderIndex) { 
  resetState();

  if (questionOrderIndex === 10) { 
    showFinal(); 
  } else {
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

function showFinal() { 
  let finalResultAttribute = "";
  questionContainer.classList.add('hide');
  quizResultElement.classList.remove('hide');
  let max = 0;
  resultAttributes["Nothing"]= 0;

  for (let attribute in resultAttributes) { 
    if (resultAttributes[attribute] > max) { 
      finalResultAttribute = attribute; 
      max = resultAttributes[attribute];
    }
  }

  jobNameField.innerText = results[finalResultAttribute].job; 
  quoteField.innerText = results[finalResultAttribute].quote;
  console.log(finalResultAttribute);
  tryAgainBtn.addEventListener('click', startGame); 
}

function resetState() { 
  while (answerBtnsElement.firstChild) { 
    answerBtnsElement.removeChild(answerBtnsElement.firstChild);
  } 
}