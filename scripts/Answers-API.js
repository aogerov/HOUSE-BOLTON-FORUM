var answersModule = (function(){
	function getAllAnswersFromQuestion(questionID) {
		$.ajax({
			method: "GET",
			headers: {
				"X-Parse-Application-Id": parseConstants.PARSE_APPLICATION_ID,
				"X-Parse-REST-API-Key": parseConstants.PARSE_REST_API_KEY
			},
			url: 'https://api.parse.com/1/classes/Answer?where={"question":{"__type":"Pointer","className":"Question","objectId":"' + questionID + '"}}',
			success: answersLoaded,
			error: answersErrorOnLoad
		});
	}
	
	
	function answersLoaded(data) {
			console.log(data);
            var allAnswers = data.results;
            var answerList = $("<ul>");
            allAnswers.forEach(function (answer) {
                var answerElement = $('<li>').text(answer.content);
				answerList.append(answerElement);
            });
			$(document.body).append(answerList);
        }

	function answersErrorOnLoad() {
		alert("Cannot load answers!");
	}
	
	return {
            getAllAnswersFromQuestion: getAllAnswersFromQuestion
        }
})();