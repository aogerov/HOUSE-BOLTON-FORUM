var QuestionAnswerView = (function(){
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
        answerView: answerView
	}
})();