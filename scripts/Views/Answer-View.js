var AnswerView = (function(){
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
			visualizeAllAnswers(question.objectId);
		})
	}*/
	
	function visualizeAllAnswers(questionId, questionSelector){
		var promise = answersModule.getAllAnswersFromQuestion(questionId);
		promise.success(function(data) {
			var allAnswers = data.results,
				answerList = $("<ul>")
					.attr("data-id",questionId)
					.attr("data-type","answersToQuestion"),
				questionElement = $(questionSelector);
			
			allAnswers.sort( function(a,b){
				return a.createdAt > b.createdAt;
			});
			
			allAnswers.forEach(function (answer) {
				var answerElement = $('<li>')
					.attr("data-id",answer.objectId)
					.attr("data-type","answer");
				var answerContent = $('<p>').text(answer.content);
				var answerDate = $('<span>').text(answer.createdAt);
				var answerAuthor;
				$.ajaxSetup({ async: false });
				var responseJSONUser = UserModule.getUserById(answer.createdBy.objectId).responseJSON;
				answerAuthor = responseJSONUser.username;
				$.ajaxSetup({ async: true });
				var authorElement = $('<span>').text(answerAuthor);
				answerElement.append(answerContent,answerDate,answerAuthor);
				answerList.append(answerElement);
			});

			questionElement.append(answerList);
			visualizeAddAnswer(questionSelector);
		});
		
		promise.error(function(data){
			console.log("Cannot visualize answers");
			console.log(data);
		});
	}
	
	function visualizeAddAnswer(questionSelector){ 
		var form = $('<form>');
		var question = $(questionSelector);
		var textarea = $('<textarea>');
		var addButton = $('<a href="#">Add answer</a>'); // TODO: link
		form.append(textarea, addButton);
		question.append(form);
	}
	
	return {
        visualizeAllAnswers: visualizeAllAnswers,
		visualizeAddAnswer:visualizeAddAnswer
	}
})();