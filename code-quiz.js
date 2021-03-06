
//List of constant variables
const timer = document.getElementById('timer');
const button = document.getElementById('button');
const quizBox = document.getElementById('quiz-box');
const quizPrompt = document.getElementById('quiz-prompt');
const labelA = document.querySelector('label[for= "a"]');
const labelB = document.querySelector('label[for= "b"]');
const labelC = document.querySelector('label[for= "c"]');
const radios = document.querySelectorAll('input[type= "radio')
const initialsLabel = document.querySelector('label[for= "initials"]')
const initialsInput = document.querySelector('input[type= "text"]')
const hiScoreBox = document.getElementById('scorelist')
const posterity = document.getElementById('initials')

//stores score, initials, and time
class Record {
    constructor(inits, scor, seconds) {
        this.posterityLog = inits;
        this.scoreLog = scor;
        this.timeRemainingLog = seconds;
    }
}

//Array of questions
const allQuestions = [
    {
        question:'What javascript function do we use to add and element to the end of an array?',
        answers: {
            a: 'pop()',
            b: 'push()',
            c: 'add()',
        },
        correctAnswer: 'b',
    },
    {
        question:'What is the first thing you add to an HTML file?',
        answers: {
            a: '<!DOCTYPE html>',
            b: '<html></html>',
            c: '<title></title>',
        },
        correctAnswer: 'a',
    },
    {
        question:'If you were to see "flex: 1 3 30px" in a stylesheet, what properties would those numbers refer to?',
        answers: {
            a: 'They are a set of coordinates and a basic width',
            b: 'Flex-grow, flex-shrink, and flex-basis',
            c: 'Flex-order, flex-shift, and flex-gap',
        },
        correctAnswer: 'b',
    },
    {
        question:'What font-size unit is relative to the root element?',
        answers: {
            a: 'em',
            b: 'vw',
            c: 'rem',
        },
        correctAnswer: 'c',
    },
    {
        question:'In HTML, where will the contents of the title tag appear on your screen when you load your page?',
        answers: {
            a: "Title is part of the head so it won't appear at all",
            b: 'It will appear at the top of the page',
            c: 'It will appear in the tab',
        },
        correctAnswer: 'c',
    },
    {
        question:'What HTML element is referenced by this CSS selector: section.articles',
        answers: {
            a: 'All sections with the class "articles"',
            b: 'All articles that are children of a section',
            c: 'All articles and all sections',
        },
        correctAnswer: 'a',
    },
    {
        question:'Which of these is NOT a primitive data type?',
        answers: {
            a: 'object',
            b: 'boolean',
            c: 'undefined',
        },
        correctAnswer: 'a',
    },
    {
        question:'Which of these will NOT increment myAge by one?',
        answers: {
            a: 'myAge + 1',
            b: 'myAge++',
            c: 'myAge += 1',
        },
        correctAnswer: 'a',
    },
    {
        question:'Which of these terms can be used to declare a variable?',
        answers: {
            a: 'while',
            b: 'const',
            c: 'x',
        },
        correctAnswer: 'b',
    },
    {
        question:'If two adjacent elements of block display have a margin: 20px 10px. How far apart are they?',
        answers: {
            a: '20px',
            b: '40px',
            c: '30px',
        },
        correctAnswer: 'a',
    },
];

//mutable variables
let score = 0;
let timeRemaining = 120;
let finalTime = 0;
let highScores = [];

//Turns button on to start quiz

function init() {
    getHighScores()
    button.addEventListener('click', makeQuiz)
}
//this begins the initial premise of the question loop
function makeQuiz() {
    button.removeEventListener('click', makeQuiz)
    button.textContent = 'Submit';
    let i = 0;
    
    button.addEventListener('click', checkAnswer)
    //clock function
    const timeInterval = setInterval(function () {
        timeRemaining--;
        timer.textContent = timeRemaining;
        
        if (timeRemaining === 0){
            clearInterval(timeInterval);
            timer.textContent = "Time's up!";
            button.removeEventListener('click', checkAnswer)
            displayResults();
        }
    }, 1000)
    //makes radio inputs visible
    for (let j=0 ; j < radios.length; j++) {
        radios[j].style.display = 'inline-block';
    }
    
    //makes questions visible
    quizPrompt.textContent = allQuestions[i].question;
    labelA.textContent = allQuestions[i].answers.a;
    labelB.textContent = allQuestions[i].answers.b;
    labelC.textContent = allQuestions[i].answers.c;
    
    //this is where the loop repeat begins
    function checkAnswer() {
       //this checks if your answer is correct 
        let selected = document.querySelector('input[name="question"]:checked').value;
        if (selected == false) {
            checkAnswer()
        } else if (selected === allQuestions[i].correctAnswer) {
            score++;
        } else {
            timeRemaining -= 5;
        };
        
        i++;
        
        if (i === allQuestions.length) {
            clearInterval(timeInterval);
            timer.textContent = "";
            button.removeEventListener('click', checkAnswer);
            displayResults();
        } else {
            quizPrompt.textContent = allQuestions[i].question;
            labelA.textContent = allQuestions[i].answers.a;
            labelB.textContent = allQuestions[i].answers.b;
            labelC.textContent = allQuestions[i].answers.c;
        }
    }
    
}
//creates new object containing user score data, pushes it to an array and sorts it high to low
function scoreSort() {
    if (localStorage.length != 0){
        highScores = JSON.parse(window.localStorage.getItem('highScores'));  
    } 
    let record = new Record(posterity.value, score, timeRemaining);
    highScores.push(record);
    highScores = highScores.sort((a,b) => {return b.scoreLog - a.scoreLog})
    if (highScores.length > 10) {
        highScores.pop()
        };
    
    window.localStorage.setItem('highScores', JSON.stringify(highScores))
}
//gets scores from storage and creates a list in html
function getHighScores() {
    hiScoreBox.innerHTML = '';
    if (localStorage.length != 0) {
    highScores = JSON.parse(window.localStorage.getItem('highScores'));
    }
    for (i=0; i < highScores.length; i++){
        let ranking = document.createElement('li');
        ranking.textContent = `${highScores[i].posterityLog}: ${highScores[i].scoreLog} correct in ${(120 - highScores[i].timeRemainingLog)} seconds`;
        hiScoreBox.appendChild(ranking);
    }
}

function displayResults() {
    //resets screen
    timer.style.visibility = 'hidden';
    quizPrompt.textContent = `Thanks for playing! You got ${score} right out of 10 with ${timeRemaining} seconds to spare`;
    labelA.textContent = '';
    labelB.textContent = '';
    labelC.textContent = '';
    //hides radio inputs
    for (let j=0 ; j < radios.length; j++) {
        radios[j].style.display = 'none';
    }
    //reveals initials input
    initialsInput.style.display = 'inline-block';
    initialsLabel.textContent = 'Write your initials here!'
    
    function postHighScore() {

        //code for adding your score
        if(posterity.value.length > 3){
            window.alert('Limit your initials to three characters')
        } else {

            scoreSort()
            getHighScores()

            //reset screen
            button.removeEventListener('click', postHighScore)
            initialsInput.style.display = 'none';
            initialsLabel.textContent = ''
        }
    }
    button.addEventListener('click', postHighScore)
}

init()