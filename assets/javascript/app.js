// how to do O N^2
var time;
var page1 = {
    question: "Worst-case runtime of finding an element in a non balanced binary search tree",
    answers: ["O(log(n))", "O(n(log(n))", "O(n)", "O(n^2)"],
    correctAnswer: "O(n)"
}

var page2 = {
    question: "placeholder2",
    answers: [1, 2, 3, 4],
    correctAnswer: [1]
}

var page3 = {
    question: "placeholder3",
    answers: [1, 2, 3, 4],
    correctAnswer: [1]
}

var page4 = {
    question: "placeholder4",
    answers: [1, 2, 3, 4],
    correctAnswer: [1]
}

var page5 = {
    question: "placeholder5",
    answers: [1, 2, 3, 4],
    correctAnswer: [1]
}

var page6 = {
    question: "placeholder6",
    answers: [1, 2, 3, 4],
    correctAnswer: [1]
}

var page7 = {
    question: "placeholder7",
    answers: [1, 2, 3, 4],
    correctAnswer: [1]
}

var page8 = {
    question: "placeholder8",
    answers: [1, 2, 3, 4],
    correctAnswer: [1]
}

var page9 = {
    question: "placeholder9",
    answers: [1, 2, 3, 4],
    correctAnswer: [1]
}

var page10 = {
    question: "placeholder10",
    answers: [1, 2, 3, 4],
    correctAnswer: [1]
}

var pages = [page1, page2, page3, page4, page5, page6, page7, page8, page9, page10];
var currentPage;
var currentAnswer;
var displayResultIsFinished = false;
var answerCanBeClicked = false;
var intervalId;
// maybe do numQuestions, and that can be a conditional in some checking
var numQuestions = 0;
//could do another boolean to represent gameOver
var gameOver = false;

console.log(pages);

//create a final display function 

function displayFinalPage() {
    gameOver = true;
}

function decrement() {
    if (time > 0) {
        time--;
        $("#timer").text(":" + time);
    }
    else {
        clearInterval(intervalId);
        displayResult();
    }
}

function startCountdown() {
    time = 30;
    intervalId = setInterval(decrement, 1000);
}

function startGame() {
    updatePage();
    $("#upperRow").remove();
    // $("#answers").show();
    answerCanBeClicked = true;
    // $("#questionWrapper").removeClass("animated lightSpeedIn");
}

function switchPage() {
    if (numQuestions === 10) {
        console.log("We would switch");
        displayFinalPage();
    }
    else {
        pages.shift();
        updatePage();
        answerCanBeClicked = true;
    }
}

function updatePage() {
    currentPage = pages[0];
    setPageInfo();
    startCountdown();
}

function setPageInfo() {
    $("#questionWrapper").removeClass("animated lightSpeedIn");
    $("#question").hide();
    $("#timerWrapper").removeClass("animated lightSpeedIn");
    $("#timer").hide();
    $("#answersWrapper").removeClass("animated lightSpeedIn");
    $("#answers").hide();
    setTimeout(function(){
        $("#question").show();
        $("#questionWrapper").addClass("animated lightSpeedIn");
        $("#timer").show();
        $("#timerWrapper").addClass("animated lightSpeedIn");
        $("#answers").show();
        $("#answersWrapper").addClass("animated lightSpeedIn");

    }, 1000)
    // $("#questionWrapper").hide();
    // $("#questionWrapper").show();
    //figure out how to make the animation continuous

    $("#question").text(currentPage.question);

    for (var i = 1; i < 5; i++) {
        $("#" + i).text(currentPage.answers[i - 1]);
    }
    $("#result").text("Result");
    currentAnswer = currentPage.correctAnswer;
    numQuestions++;

}

function displayResult(str) {

    setTimeout(switchPage, 2000);
    if (str === null) {
        str = "Timeout";
    }
    $("#result").text(str);
}

function setCheckAnswer() {
    if (answerCanBeClicked) {
        console.log("Text" + this.textContent);
        currentAnswer = this.textContent;
        if (currentAnswer === currentPage.correctAnswer.toString()) {
            displayResult("Correct");
        }
        else {
            displayResult("Incorrect");
        }
        answerCanBeClicked = false;
        clearInterval(intervalId);
    }
}

$("#start").on("click", startGame);

$(".input-answer").on("click", setCheckAnswer);

$("#answers").hide();

// startCountdown();