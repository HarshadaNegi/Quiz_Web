const questions =[
    {
        question:" When an operator’s value is NULL, the typeof returned by the unary operator is?",
        answers:[
            {text:"Boolean", correct: false},
            {text:"Undefined", correct: false},
            {text:"object", correct: true},
            {text:"integer", correct: false},
        ]
    },
    {
        question:"Which of the following is not a Javascript framework?",
        answers:[
            {text:"React", correct: false},
            {text:"Vue", correct: false},
            {text:"Node", correct: false},
            {text:"Cassandra", correct: true},
        ]
    },
    {
        question:"Which of the following keywords is used to define a variable in Javascript?",
        answers:[
            {text:"var", correct: false},
            {text:"let", correct: false},
            {text:"both a and b", correct: true},
            {text:"None of the above", correct: false},
        ]
    },
    {
        question:"Which of the following methods can be used to display data in some form using Javascript?",
        answers:[
            {text:"console.log()", correct: false},
            {text:"window.alert()", correct: false},
            {text:"document.write()", correct: false},
            {text:"All of the above", correct: true},
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer_buttons");
const nextButton = document.getElementById("next_btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "next";
    showQuestion();
}
function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo =currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo +"."+currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect =selectedBtn.dataset.correct === "true";
    if (isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }
    else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";    
}

function showScore(){
    resetState();
    questionElement.innerHTML = 'You scored '+ score +' out of '+ questions.length+' !';
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}
function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex<questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextButton.addEventListener("click",()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }
    else{
        startQuiz();
    }
});

startQuiz();