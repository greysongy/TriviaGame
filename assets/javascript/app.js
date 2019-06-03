// how to do O N^2
var time;
var page1 = {
    question: "Worst-case runtime of finding an element in a non balanced binary search tree",
    answers: ["O(log(n))", "O(n(log(n))", "O(n)", "O(n^2)"],
    correctAnswer: [1]
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

console.log(pages);

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
    $("#answers").show();
    answerCanBeClicked = true;
    // $("#questionWrapper").removeClass("animated lightSpeedIn");
}

function switchPage() {
    pages.shift();
    updatePage();
    answerCanBeClicked = true;
}

function updatePage() {
    currentPage = pages[0];
    setPageInfo();
    startCountdown();
}

function setPageInfo() {
    // $("#questionWrapper").removeClass("animated lightSpeedIn");
    // $("#questionWrapper").addClass("animated lightSpeedIn");
    // $("#questionWrapper").hide();
    // $("#questionWrapper").show();
    //figure out how to make the animation continuous
    $("#question").text(currentPage.question);
    console.log("Current Question:" + currentPage.question);
    for (var i = 1; i < 5; i++) {
        $("#" + i).text(currentPage.answers[i - 1]);
    }
    $("#result").text("Result");
    currentAnswer = currentPage.correctAnswer;
}

function displayResult(str) {
    
    setTimeout(switchPage, 5000);
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