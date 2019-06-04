// how to do O N^2
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
    question: "When implementing a priority queue with a heap, what are",
    answers: ["1", "2", "3", "4"],
    correctAnswer: ["1"], 
    image: "assets/images/pq2.png"
}

var page6 = {
    question: "placeholder6",
    answers: ["1", "2", "3", "4"],
    correctAnswer: ["1"], 
    image: "none"
}

var page7 = {
    question: "placeholder7",
    answers: ["1", "2", "3", "4"],
    correctAnswer: ["1"], 
    image: "none"
}

var page8 = {
    question: "placeholder8",
    answers: ["1", "2", "3", "4"],
    correctAnswer: ["1"], 
    image: "none"
}

var page9 = {
    question: "placeholder9",
    answers: ["1", "2", "3", "4"],
    correctAnswer: ["1"], 
    image: "none"
}

var page10 = {
    question: "placeholder10",
    answers: ["1", "2", "3", "4"],
    correctAnswer: ["1"], 
    image: "none"
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
        // console.log("Index" + (currentPage.answers.indexOf(currentAnswer) + 1));
        $("#" + (currentPage.answers.indexOf(currentAnswer) + 1)).removeClass("active");
        // $("#1").removeClass("active");
        updatePage();
        answerCanBeClicked = true;
    }
}

function updatePage() {
    currentPage = pages[0];
    setPageInfo();
    startCountdown();
    $("#visual").empty();
    $("#visual").append("<img src = '" + currentPage.image + "' style='border:5px solid black'>");
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
    $("#result").text("");
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
        // console.log("Text" + this.textContent);
        currentAnswer = this.textContent;
        //  console.log("Index: " + pages.indexOf(currentAnswer));
        // console.log("Index" + (currentPage.answers.indexOf(currentAnswer) + 1));
        console.log("Current Answer: " + currentAnswer);
        console.log("Current Answers: " + currentPage.answers);
        console.log("Current Index of 4: " + currentPage.answers.indexOf(4));
        console.log("Index: " + (currentPage.answers.indexOf(currentAnswer)));
        $("#" + (currentPage.answers.indexOf(currentAnswer) + 1)).addClass("active");
        // $("#1").addClass("active");
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