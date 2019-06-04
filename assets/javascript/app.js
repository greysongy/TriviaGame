//page objects that store crtical information 
var time;
var page1 = {
    question: "Worst-case runtime of finding an element in a non balanced binary search tree",
    answers: ["O(log(n))", "O(nlog(n))", "O(n)", "O(n^2)"],
    correctAnswer: "O(n)",
    image: "assets/images/unbalancedBinarySearchTree.png"
}

var page2 = {
    question: "Runtime of the following code",
    answers: ["O(n^2)", "O(2^n)", "O(n)", "O(n!)"],
    correctAnswer: ["O(2^n)"],
    image: "assets/images/fibCode.png"
}

var page3 = {
    question: "Worst-case runtime of QuickSort",
    answers: ["O(n^2)", "O(n^3)", "O(nlog(n))", "O(n)"],
    correctAnswer: ["O(n^2)"],
    image: "assets/images/QuickSort.png"
}

var page4 = {
    question: "Correct Post-Order Traversal of the following tree",
    answers: ["A C H G B F K J I E", "A B D E H I C F G", "D B H E I A F C G", "D H I E B F G C A"],
    correctAnswer: ["D H I E B F G C A"],
    image: "assets/images/postorderTree.png"
}

var page5 = {
    question: "When implementing a priority queue with a heap, what are the runtimes of removeMin and insert respectively",
    answers: ["O(log(n)), O(n)", "O(n), O(n)", "O(log(n)), O(log(n))", "O(n), O(log(n))"],
    correctAnswer: ["O(log(n)), O(log(n))"],
    image: "assets/images/pq2.png"
}

//global variables that are declared and referenced throughout
var pages = [page1, page2, page3, page4, page5];
var currentPage;
var currentAnswer;
var displayResultIsFinished = false;
var answerCanBeClicked = false;
var intervalId;
var numQuestions = 0;
var gameOver = false;
var numCorrect = 0;

//function that displays final info once user has answered all questions
function displayFinalPage() {
    $("#" + (currentPage.answers.indexOf(currentAnswer) + 1)).removeClass("active");
    gameOver = true;
    $("#start").text("Reset");
    $("#upperRow").show();
    $("#lowerRows").hide();
    $("#visual").empty();
    $("#visual").append("<h1>" + numCorrect + "/5 correct");
}

//decrement function that's passed in as a parameter to setInterval and counts down
function decrement() {
    if (time > 0) {
        time--;
        $("#timer").text(":" + time);
    }
    else {
        answerCanBeClicked = false;
        $("#result").text("Out of time");
        clearInterval(intervalId);
        displayResult();
    }
}

//starts countdown  using setINterval method
function startCountdown() {
    time = 30;
    intervalId = setInterval(decrement, 1000);
}

//resets necessary variables
function fullReset() {
    numQuestions = 0;
    gameOver = false;
    numCorrect = 0;
    displayResultIsFinished = false;
    answerCanBeClicked = false;
    pages = [page1, page2, page3, page4, page5];
    $("#lowerRows").show();
}

//calls helper functions to start game, calling a full reset if necessary
function startGame() {
    if (numQuestions === 5) {
        fullReset();
    }
    updatePage();
    $("#upperRow").hide();
    answerCanBeClicked = true;
}

//iteratively switches pages
function switchPage() {
    if (numQuestions === 5) {
        displayFinalPage();
    }
    else {
        pages.shift();
        $("#" + (currentPage.answers.indexOf(currentAnswer) + 1)).removeClass("active");
        updatePage();
        answerCanBeClicked = true;
    }
}

//helper function that updates new Page visually
function updatePage() {
    currentPage = pages[0];
    setPageInfo();
    startCountdown();
    $("#visual").empty();
    $("#visual").append("<img src = '" + currentPage.image + "' style='border:5px solid black'>");
}

//a bit overly lengthy, it's because I wanted the animations to take place iteratively for every page switch
function setPageInfo() {
    $("#questionWrapper").removeClass("animated lightSpeedIn");
    $("#question").hide();
    $("#timerWrapper").removeClass("animated lightSpeedIn");
    $("#timer").hide();
    $("#answersWrapper").removeClass("animated lightSpeedIn");
    $("#answers").hide();
    setTimeout(function () {
        $("#question").show();
        $("#questionWrapper").addClass("animated lightSpeedIn");
        $("#timer").show();
        $("#timerWrapper").addClass("animated lightSpeedIn");
        $("#answers").show();
        $("#answersWrapper").addClass("animated lightSpeedIn");

    }, 1000)

    $("#question").text(currentPage.question);

    for (var i = 1; i < 5; i++) {
        $("#" + i).text(currentPage.answers[i - 1]);
    }
    $("#result").text("");
    currentAnswer = currentPage.correctAnswer;
    numQuestions++;

}

//displays result, and uses setTimeout to define how long before a switch
function displayResult(str) {

    setTimeout(switchPage, 4000);
    if (str === null) {
        str = "Timeout";
    }
    $("#result").text(str);
}

//checks answer and then carries out necessary action
function setCheckAnswer() {
    if (answerCanBeClicked) {
        currentAnswer = this.textContent;
        console.log("Current Answer: " + currentAnswer);
        console.log("Current Answers: " + currentPage.answers);
        console.log("Current Index of 4: " + currentPage.answers.indexOf(4));
        console.log("Index: " + (currentPage.answers.indexOf(currentAnswer)));
        $("#" + (currentPage.answers.indexOf(currentAnswer) + 1)).addClass("active");
        if (currentAnswer === currentPage.correctAnswer.toString()) {
            displayResult("Correct");
            numCorrect++;
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