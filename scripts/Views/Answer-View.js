var QuestionAnswerView = (function(){

	// works for all questions, but should for only one, by given Id
	// needs rework after questions-api has been updated
	function visualize(questionId){
		var promise = questionsModule.getQuestionByID(questionId);
		promise.success(visualizeQuestions);
		promise.error(function(data){
			console.log("Cannot visualize questions");
			console.log(data);
		});
	}
	
	function visualizeQuestions(data){
		var question = data;
		var questionsList = $("#questions");
		var questionTitle = $("<h4>").text(question.title),
			questionContent = $("<div>").text(question.content),
			questionElement = $("<li>")
				.attr("data-id",question.objectId)
				.attr("data-type","question")
				.append(questionTitle)
				.append(questionContent)
				.appendTo(questionsList);
		answerView(question.objectId);
		
	}
	
	/*function visualizeQuestions(data){
		var allQuestions = data.results.sort( function(a,b){
			return a.createdAt > b.createdAt;
		});
		var questionsList = $("#questions");
		allQuestions.forEach(function (question) {
			var questionTitle = $("<span>").text(question.title),
				questionElement = $("<li>")
					.attr("data-id",question.objectId)
					.attr("data-type","question")
					.append(questionTitle)
					.appendTo(questionsList);
			answerView(question.objectId);
		})
	}*/
	
	function answerView(questionId){
		var promise = answersModule.getAllAnswersFromQuestion(questionId);
		promise.success(function(data) {
			var allAnswers = data.results,
				answerList = $("<ul>")
					.attr("data-id",questionId)
					.attr("data-type","answersToQuestion"),
				questionElement = $("[data-id='" + questionId + "'][data-type='question']");
			
			allAnswers.sort( function(a,b){
				return a.createdAt > b.createdAt;
			});
			
			allAnswers.forEach(function (answer) {
				var answerElement = $('<li>')
					.text(answer.content)
					.attr("data-id",answer.objectId)
					.attr("data-type","answer");
				answerList.append(answerElement);
			});

			questionElement.append(answerList);
		});
		
		promise.error(function(data){
			console.log("Cannot visualize answers");
			console.log(data);
		});
	}
	
	return {
		visualize: visualize
	}
})();