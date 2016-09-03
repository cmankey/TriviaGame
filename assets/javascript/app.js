$(document).ready(function() {

	var questions = [{
		question: "Which of the following is NOT one of the bones of the lower extremity?", 
		answers: ["the humerus", "the tibia", "the femur", "the fibula"],
		answer: 0,
		image: "bonesOfLowerExtremity.jpg"
	}, {
		question: "Which heart valve separates the left atrium and left ventricle?", 
		answers: ["the tricuspid valve", "the mitral valve", "the pulmonic valve", "the aortic valve"],
		answer: 1,
		image: "heartValves.jpg"
	}, {
		question: "Which of the following hormones is produced by the adrenal gland?", 
		answers: ["thyroid stimulating hormone", "estrogen", "testosterone", "cortisol"],
		answer: 3,
		image: "adrenalPhysiology.jpg"
	}, { 
		question: "Which of the following is NOT a bone of the ear?", 
		answers: ["the incus", "the trapezoid", "the malleus", "the stapes"],
		answer: 1,
		image: "earAnatomy.jpg"
	}, {
		question: "Thyroid stimulating hormone is produced in the __________.", 
		answers: ["adrenal gland", "thyroid gland", "parathyroid gland", "pituitary gland"],
		answer: 3,
		image: "hypothalamicPituitaryThyroidAxis.jpg"
	}, {
		question: "The glenohumeral joint is the __________.", 
		answers: ["shoulder", "knee", "ankle", "wrist"],
		answer: 0,
		image: "shoulder.jpg"
	}, {
		question: "Which of the following are NOT salivary glands?", 
		answers: ["the submandibular glands", "the sublingual glands", "the lacrimal glands", "the parotid glands"],
		answer: 2,
		image: "salivaryGlands.jpg"
	}, {
		question: "The most distal segment of the small intestine is the __________.", 
		answers: ["jejunum", "ileum", "duodenum", "colon"],
		answer: 1,
		image: "smallIntestineAnatomy.jpg"
	}]

	var remainingQuestions, currentQuestion, timeLeft, right, wrong, unanswered;

	$("#start").click(newGame);

	$("#start").hover(function () {
				$(this).css("color", "pink");
			},
			function () {
				$(this).css("color", "black");
			});
	
	function newGame() {
		remainingQuestions = questions.slice();
		right = 0;
		wrong = 0;
		unanswered = 0;
		newQuestion();
	}
	
	function selectQuestion() {
		var index = Math.floor(Math.random() * remainingQuestions.length);
		currentQuestion = remainingQuestions[index];
		remainingQuestions.splice(index, 1);
	}

	function newQuestion() {
		if (remainingQuestions.length == 0) {
				gameOver();
		} else {
			selectQuestion();
			var questionAndAnswers = $("<ul class='panel panel-default list-group'></ul>");
			questionAndAnswers.append("<li class='list-group-item question'>" + currentQuestion.question + "</li>")

			for (i = 0; i < currentQuestion.answers.length; i++) {
				questionAndAnswers.append("<li class='list-group-item answer' id='" + i + "'>" + currentQuestion.answers[i] + "</li>")
			}
			$(".content").html(questionAndAnswers);
			addEventListeners();
			startTimer();
		}
	}
	
	function addEventListeners() {
			$(".answer").hover(function () {
				$(this).css("color", "pink");
			},
			function () {
				$(this).css("color", "black");
			});

			$(".answer").click(function () {
				var guessedAnswer = parseInt($(this).attr("id"));
				if (guessedAnswer === currentQuestion.answer) {
					right++;
					result("Right");
				} else {
					wrong++;
					result("Wrong");
				}
			});
	}

	function result(outcome) {
		stopTimer();
		var result = $("<div>");
		result.html("<p class='first'>" + outcome + "!</p><p>The answer is " + currentQuestion.answers[currentQuestion.answer] + ".</p>");
		result.append("<img src='assets/images/" + currentQuestion.image + "' height='300px'>");
		$(".content").html(result);
		setTimeout(newQuestion, 3000);
	}

	function gameOver() {
		$(".content").html("<p class='first'>Game over!</p><p>right answers: " + right + "</p><p>wrong answers: " + wrong + "</p><p>unwanswered questions: " + unanswered + "</p>");
		$(".content").append("<button class='btn-lg' id='restart'>play again</button>");
		$("#restart").hover(function () {
				$(this).css({"color": "pink"});
			},
			function () {
				$(this).css("color", "black");
			});
		$("#restart").click(newGame);

	}

	function countDown() {
		timeLeft--;
		$("#time-left").html("<p>time left: " + timeLeft + " seconds</p>");
		if (timeLeft === 0) {
			stopTimer();
			unanswered++;
			result("Time is up");
		}
	}

	function startTimer() {
		$(".timer").show();
		timeLeft = 15;
		$(".timer").html("<p id='time-left'>time left: " + timeLeft + " seconds</p>"); 
		counter = setInterval(countDown, 1000);
	}

	function stopTimer() {
		clearInterval(counter);
		$(".timer").hide();
	}	

});



