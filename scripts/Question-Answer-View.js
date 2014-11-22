var QuestionAnswerView = (function(){

	// works for all questions, but should for only one, by given Id
	// needs rework after questions-api has been updated
	function visualize(){
		var promise = questionsModule.getAllQuestions();
		promise.success(visualizeQuestions);
		promise.error(function(data){
			console.log("Cannot visualize questions");
			console.log(data);
		});
	}
	
	function visualizeQuestions(data){
		var allQuestions = data.results.sort( function(a,b){
			return a.createdAt > b.createdAt;
		});
		var questionsList = $("#questions");
		allQuestions.forEach(function (question) {
			var questionElement = $("<li>")
			var questionTitle = $("<span>");
			questionTitle.text(question.title);
			questionElement.attr("id","question" + question.objectId);
			questionElement.append(questionTitle)
			questionsList.append(questionElement);
			answerView(question.objectId);
		})
	}
	
	function answerView(questionId){
		var promise = answersModule.getAllAnswersFromQuestion(questionId);
		promise.success(function(data) {
			var allAnswers = data.results;
			var answerList = $("<ul>");
			answerList.attr("id","answersTo" + questionId);
			
			allAnswers.sort( function(a,b){
				return a.createdAt > b.createdAt;
			});
			
			allAnswers.forEach(function (answer) {
				var answerElement = $('<li>').text(answer.content).attr("id","answer" + answer.objectId);
				answerList.append(answerElement);
			});
			
			var questionElementId = "#question" + questionId;
			var questionElement = $(questionElementId);
			questionElement.append(answerList);
		});
		
		promise.error(function(data){
			console.log("Cannot visualize answers");
			console.log(data);
		});
	}
	
	return {
		visualize: visualize,
	}
})();