var startButton = document.getElementById('start-btn')
var nextButton = document.getElementById('next-btn')


var questionContainerElement = document.getElementById('question-container')
var questionElement = document.getElementById('question') //create HTML element for this line

var answerButtonsElement = document.getElementById('answer-buttons')
var ansResult = document.getElementById('ansResult');
var timerInterval
var shuffledQuestions
var currentQuestionIndex
var quizScore = 0;
var timeElement = document.querySelector(".time");
var finalScore = document.getElementById("FinalScore")
var timeLeft = document.getElementById("timeLeft")
var nameInput = document.getElementById("nameInput")
var submitButton = document.getElementById("submitButton")
// alert(timeElement);
var secondsLeft = 100;

startButton.addEventListener('click', startQuiz)

nextButton.addEventListener('click', () => {
    currentQuestionIndex++
    if (currentQuestionIndex === questions.length) {
        //call quiz end function here//
        EndOfQuiz()
    } else {
        setnextQuestion()
    }

})
function EndOfQuiz() {
    questionContainerElement.setAttribute("class", "hide")
    var finalScreen = document.getElementById("finalScreen")
    finalScreen.removeAttribute("class", "hide")
    clearInterval(timerInterval)
    finalScore.textContent = quizScore
    timeLeft.textContent = secondsLeft
}
function saveScore() {
    var scoreArray = JSON.parse(localStorage.getItem("Scores")) || []
    var scoreobject = {
        newScore: quizScore,
        name: nameInput.value
    }
    scoreArray.push(scoreobject)
    localStorage.setItem("Scores", JSON.stringify(scoreArray))
}
submitButton.onclick = saveScore

function setTime() {
    timerInterval = setInterval(function () {
        secondsLeft--;
        timeElement.textContent = secondsLeft + " seconds left till time is up!";

        if (secondsLeft <= 0) {
            clearInterval(timerInterval);
        }
    }, 1000);
}


setTime();


function startQuiz() {
    startButton.classList.add('hide')
    shuffledQuestions = questions.sort(() => Math.random() - 0.5)
    currentQuestionIndex = 0;
    questionContainerElement.classList.remove('hide')

    setnextQuestion(questions)

    quizScore = 0
}

function setnextQuestion() {
    resetState();

    showQuestion(shuffledQuestions[currentQuestionIndex])

}
function showQuestion(question) {

    // questionElement.innerText = questions[0].question;
    questionElement.innerText = questions[currentQuestionIndex].question;
    // alert( questions[currentQuestionIndex].question);
    question.answers.forEach((answer) => {
        var button = document.createElement('button')
        button.innerText = answer.text
        button.classList.add('btn')
        if (answer.correct) {
            button.dataset.correct = answer.correct
        }
        button.addEventListener('click', selectAnswer)
        answerButtonsElement.appendChild(button)
    })
}

function resetState() {
    clearStatusClass(document.body)
    nextButton.classList.add('hide')
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild)
    }
}

function selectAnswer(e) {
    var selectedButton = e.target
    var correct = selectedButton.dataset.correct

    setStatusClass(document.body, correct)
    Array.from(answerButtonsElement.children).forEach((button) => {
        setStatusClass(button, button.dataset.correct)
    })
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove("hide")
    } else {
        // startButton.innerText = "restart"
        // startButton.classList.remove('hide')
        EndOfQuiz()
    }
    if (selectedButton.dataset = correct) {
        quizScore++
        ansResult.textContent = "You have choosen the correct answer";
    } else {
        ansResult.textContent = "You have choosen the wrong answer";
    }
    // document.getElementById('right-answers').innerText = quizScore
}

function setStatusClass(element, correct) {
    clearStatusClass(element)
    if (correct) {
        element.classList.add("correct");

    } else {
        element.classList.add("wrong")

    }
}



function clearStatusClass(element) {
    element.classList.remove('correct')
    element.classList.remove('wrong')
}
var questions = [
    {
        question: "The conditional in an if/else statement is enclosed within?",
        answers: [
            { text: 'quotes', correct: false },
            { text: 'curly brackets', correct: false },
            { text: 'parentheses', correct: true },
            { text: 'square brackets', correct: false },
        ],
    },
    {
        question: "Add Event Listen is a DOM method that attach an event handler to an element, such as ________.",
        answers: [
            { text: 'click', correct: false },
            { text: 'mouseover', correct: false },
            { text: 'resize', correct: false },
            { text: 'any of the above', correct: true },
        ],
    },
    {
        question: "When could hoisting enable you to console.log a variable before defining it.",
        answers: [
            { text: 'In a function declaration ', correct: true },
            { text: 'In a function expression ', correct: false },
            { text: 'In an object', correct: false },
            { text: 'In a loop', correct: false },
        ],
    }, {
        question: "Array in JavaScript can be used to store. ",
        answers: [
            { text: 'Number and string', correct: false },
            { text: 'other arrays', correct: false },
            { text: 'boolean', correct: false },
            { text: 'all the above', correct: true },
        ],
    }, {
        question: "A very successful tool used during development and debugging for printing content to the debugger is ________. ",
        answers: [
            { text: 'console.log', correct: true },
            { text: 'terminal or bash', correct: false },
            { text: 'for loops', correct: false },
            { text: 'JavaScript', correct: false },
        ],
    }, {
        question: "Query Selector methods enable JavaScript file to search an element by_________ from HTML file. ",
        answers: [
            { text: 'id', correct: false },
            { text: 'class', correct: false },
            { text: 'tag', correct: false },
            { text: 'all the above', correct: true },
        ],
    }, {
        question: "In order retrieve information from the local storage, use ______ method.",
        answers: [
            { text: 'localStorage.sentItem', correct: false },
            { text: 'localStorage.getItem', correct: true },
            { text: 'localStorage.saveItem', correct: false },
            { text: 'localStorage.removeItem', correct: false },
        ],
    }, {
        question: "Commonly used data types do not include. ",
        answers: [
            { text: 'string', correct: false },
            { text: 'boolean', correct: false },
            { text: 'alerts', correct: true },
            { text: 'number', correct: false },
        ],
    }, {
        question: "A string value must be enclosed within __________, when being assigned to a variable.",
        answers: [
            { text: 'quotes', correct: true },
            { text: 'curly brackets', correct: false },
            { text: 'parentheses', correct: false },
            { text: 'commas', correct: false },
        ],
    }, {
        question: "Append Child methods allows to make change to an HTML file by: ",
        answers: [
            { text: 'removing a node from list of children.', correct: false },
            { text: 'adding a node to list of children', correct: true },
            { text: 'removing a node from list of parents', correct: false },
            { text: 'adding a node to list of parents', correct: false },
        ],
    }

]
