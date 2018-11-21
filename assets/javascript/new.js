var questionsArr = [
    {
        question: "Lemurs are native to which island country?",
        answer: ["Madagascar", "Indonesia", "Cyprus", "Papua New Guinea"],
        correct: 0,
    },
    {
        question: "How many times per second can a hummingbird flap its wings?",
        answer: ["40", "80", "120", "160"],
        correct: 1,
    },
    {
        question: "Which animal is born blind?",
        answer: ["Cat", "Fox", "Dog", "Rabbit"],
        correct: 3,
    },
    {
        question: "What is the name for a group of frogs?",
        answer: ["Knot", "Army", "Nest", "Maelstrom"],
        correct: 1,
    },
    {
        question: "Which of the following is an animal?",
        answer: ["Algae", "Seagrass", "Kelp", "Coral"],
        correct: 3,
    },
    {
        question: "What is the fastest land snake?",
        answer: ["King Cobra", "Tiger Snake", "Black Mamba", "Eastern Brown Snake"],
        correct: 2,
    },
    {
        question: "How many pairs of wings does a bee have?",
        answer: ["1", "2", "3", "4"],
        correct: 1,
    },
    {
        question: "What is the weakest of the five senses in primates?",
        answer: ["Sight", "Hearing", "Smell", "Taste"],
        correct: 2,
    },
    {
        question: "Which animal is not a marsupial?",
        answer: ["Platypus", "Wombat", "Wallaby", "Koala"],
        correct: 0,
    },
    {
        question: "How long have crocodiles been around for?",
        answer: ["2 million years", "20 million years", "200 million years", "2 billion years"],
        correct: 2,
    },
];

var imgArr = ["assets/images/lemur.jpg", "assets/images/humming.jpg", "assets/images/rabbit.jpg", "assets/images/frog.jpg", "assets/images/coral.jpg", "assets/images/snake.jpg", "assets/images/bee.jpg", "assets/images/smell.jpg", "assets/images/platy.jpg", "assets/images/croc.jpg"];

var index = 0;
var score = 0;
var time = 30;
var interval;

function resetQuestion() {
        $("#questionText").empty();
        $("#questionText").text(questionsArr[index].question);
        $("#choicesText").empty();
        $("#gifText").empty();
        var choices = questionsArr[index].answer;
        for (i = 0; i < choices.length; i++) {
            var newRadio = $("<input type='radio' name='choice' />");
            var radioLabel = $("<label>").attr("for", i).text(choices[i]);
            newRadio.attr("value", i).attr("id", i);
            $("#choicesText").append(newRadio).append(radioLabel).append("<br>");
        };
        timerStart();
        clickEvent();
};

function startGame() {
    if (index <= (questionsArr.length - 1)) {
        resetQuestion();
    } else {
        $("#questionText").empty();
        $("#choicesText").empty();
        $("#gifText").empty();
        $("p").text("You correctly guessed " + score + " questions!").append("<br>").append("<img src='assets/images/party.jpg'>");
    }
};




function clickEvent() {
    $("input").on("click", function() {
        clearInterval(interval);
        if (questionsArr[index].correct == this.value) {
            var newImg = $("<img>").attr("src", imgArr[index]);
            $("#gifText").append("<p id='correctP'>Correct!</p>").append(newImg);
            index++;
            score++;
            setTimeout(startGame, 4000);
            console.log("correct: " + index);
        } else {
            var newImg = $("<img>").attr("src", imgArr[index]);
            $("#gifText").append("<p id='correctP'>Incorrect!</p>").append(newImg);
            index++;
            setTimeout(startGame, 3500);
            console.log("incorrect: " + index);
        };

    });
};

function timerCount() {
    time--;
    $("#timeText").text(time);
    if (time == 0) {
        var newImg = $("<img>").attr("src", imgArr[index]);
            $("#gifText").append("<p id='correctP'>Out of time!</p>").append(newImg);
            index++;
            clearInterval(interval);
            setTimeout(startGame, 4000);
    }
};

function timerStart() {
    clearInterval(interval);
    time = 30;
    interval = setInterval(timerCount, 1000);
};

$("#startButton").on("click", function () {
    var startButton = $("#startButton");
    var timeP = $("#timeP");
    startButton[0].style.display = "none";
    timeP[0].style.display = "block";
    startGame();

});