/*GIVEN I am taking a code quiz
WHEN I click the start button
todo: link a button event to the start of timer and quiz
THEN a timer starts and I am presented with a question
todo: create question and answer format and library
WHEN I answer a question
todo: use radial format for multiple choice
THEN I am presented with another question
todo: link button event to refresh question area
WHEN I answer a question incorrectly
todo: id correct and incorrect responses
THEN time is subtracted from the clock
todo: if/else that displays correct or incorrect, and subtracts time if
incorrect, and adds points if correct
WHEN all questions are answered or the timer reaches 0
todo: stop timer at 0
THEN the game is over
todo: make game over screen
WHEN the game is over
THEN I can save my initials and my score
create a function that appends a list with an 'initials' input along with
the user's score
*/

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
const hiScore = document.getElementById('scorelist')

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
//Turns button on to start quiz
button.addEventListener('click', makeQuiz)

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
        radios[j].style.visibility = 'visible';
    }
    
    //makes questions visible
    quizPrompt.textContent = allQuestions[i].question;
    labelA.textContent = allQuestions[i].answers.a;
    labelB.textContent = allQuestions[i].answers.b;
    labelC.textContent = allQuestions[i].answers.c;
    
    //this is where the loop repeat begins
    function checkAnswer() {
        
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
            button.removeEventListener('click', checkAnswer)
            displayResults();
        } else {
            quizPrompt.textContent = allQuestions[i].question;
            labelA.textContent = allQuestions[i].answers.a;
            labelB.textContent = allQuestions[i].answers.b;
            labelC.textContent = allQuestions[i].answers.c;
        }
    }
    
}


function displayResults() {
    //resets screen
    timer.style.visibility = 'hidden';
    quizPrompt.textContent = `Thanks for playing! You got ${score} right out of 10 with ${timeRemaining} seconds to spare`;
    labelA.textContent = '';
    labelB.textContent = '';
    labelC.textContent = '';
    
    for (let j=0 ; j < radios.length; j++) {
        radios[j].style.visibility = 'hidden';
    }
    initialsInput.style.visibility = 'visible';
    initialsLabel.textContent = 'Write your initials here!'
    
    function postHighScore() {
        let posterity = document.getElementById('initials').value
        let record = document.createElement('li');
        //code for adding your score
        if(posterity.length > 3){
            window.alert('Limit your initials to three characters')
        } else {
        record.textContent = `${posterity}: ${score} correct ${timeRemaining} seconds`;
        hiScore.appendChild(record);
        button.removeEventListener('click', postHighScore)
        initialsInput.style.visibility = 'hidden';
        initialsLabel.textContent = ''
        }
    }
    button.addEventListener('click', postHighScore)
}