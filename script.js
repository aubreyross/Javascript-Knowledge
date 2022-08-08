//getElementBy Id function to get the elements from the HTML file
var startButton = document.getElementById("startButton");
var quiz = document.getElementById("quiz-container");
var questionEl = document.getElementById("question");
var questionContainer = document.getElementById("question-container");
var clock = document.getElementById("clock");
var scoreEl = document.getElementById("score");
var scoreContainer = document.getElementById('score-container');
var scoreInput = document.getElementById("scoreRecord");
var container = document.querySelector("#container");
var initialsInput = document.getElementById("initals");
var submitButton = document.getElementById("submitBtn");
var A = document.getElementById("A");
var B = document.getElementById("B");
var C = document.getElementById("C");
var D = document.getElementById("D");





var questions = [
    {
        question: "Javascript's prototype, Mocha, was built in how many days?",
        A: "1",
        B: "10",
        C: "365",
        D: "1095",
        answer: "B"

    }, 
    {
        question: "Inside which element do you put JavaScript?",
        A: "var",
        B: "script",
        C: "section",
        D: "code",
        answer: "B"
    },
    {
        question: "What is the correct term for functions with no return value?",
        A: "Static function",
        B: "Method",
        C: "Procedures",
        D: "Dynamic function",
        answer: "C"
    },
    {
        question: "How do you write an IF statement in JavaScript?",
        A: "if i == 5 then",
        B: "if i = 5",
        C: "if(i==5)",
        D: "if i = 5 then",
        answer: "C"
    },

];


var lastQuestion = questions.length - 1;
var availableQuestion = 0;
var answer = "";
var userAnswer;
var score;
var clockInterval;
var userScore;
var initials;


//When the start button is clicked, the quiz begins
startButton.addEventListener("click", startQuiz);


//Function that will start the quiz and begin the clock. 
function startQuiz() {
    setclock();
    console.log("start");
    startButton.classList.add('hide');
    availableQuestion = 0;
    score = 0;
    questionContainer.classList.remove('hide');
    nextQuestion();
}


//Function for the clock countdown. When the clock reaches 0 an alert will generate informing the user this quiz has ended. The endQuiz function will be triggered. 
function setclock() {
    secondsLeft = 30;
    var clockInterval = setInterval(function () {
        document.getElementById('clock').innerHTML = secondsLeft;
        secondsLeft--;
        clock.textContent = secondsLeft;

        if (secondsLeft === 0) {
            clearInterval(clockInterval);
            alert("QUIZ OVER");
            endQuiz();

        }
    }, 1000);
}


//Function to display the questions on the screen.
function renderQuestion(question) {

    questionEl.textContent = question.question;

    A.textContent = questions[availableQuestion].A;
    B.textContent = questions[availableQuestion].B;
    C.textContent = questions[availableQuestion].C;
    D.textContent = questions[availableQuestion].D;
}

//Function that enables user to go to the next question.
function nextQuestion() {
    renderQuestion(questions[availableQuestion]);
}

//Function that determines whether the users input was correct or incorrect. If the question was answered incorrectly, 3 seconds will deduct from the clock.
function selectAnswer(userAnswer) {

    if (userAnswer === questions[availableQuestion].answer) {
        score++;
    }

    if (userAnswer !== questions[availableQuestion].answer) {
        secondsLeft = secondsLeft - 3;
    }

    if (availableQuestion >= lastQuestion) {
        clearInterval(clockInterval);
        endQuiz();

    } else {
        availableQuestion++;
        nextQuestion();
        console.log(score);
    }
}

//Function to end quiz, either when the last question is answered, or the time runs out
function endQuiz() {
    scoreContainer.style.display = "grid";
    clearInterval(clockInterval);
    showScore();

}

//Function that shows the user their score and how many questions were answered correctly.
function showScore() {
    questionContainer.classList.add('hide');
    scoreEl.innerHTML =  + score + " out of  " + questions.length ;
}

//Function that allows the user to input their initals and submit their score. 
function saveScore() {

 
    var userScore = {
        initials: initialsInput.text,
        userScore: scoreInput.text,
    };
   
    localStorage.setItem("userScore", JSON.stringify(userScore));

};


function renderScore() {
    lastScore = JSON.parse(localStorage.getItem("userScore"))
    if (lastScore !== null) {
        document.getElementById("saved-inital").innerHTML = userScore.initials;
        document.getElementById("saved-score").innerHTML = userScore.userScore;

    } else {
        return;
    }
  
    submitButton.addEventListener("click", function () {
        saveScore();
    })

}
