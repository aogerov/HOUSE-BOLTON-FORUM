var answersModule = (function(){
	function getAllAnswersFromQuestion(questionID) {
		return $.ajax({
			method: "GET",
			headers: {
				"X-Parse-Application-Id": parseConstants.PARSE_APPLICATION_ID,
				"X-Parse-REST-API-Key": parseConstants.PARSE_REST_API_KEY
			},
			url: 'https://api.parse.com/1/classes/Answer?where={"question":{"__type":"Pointer","className":"Question","objectId":"' + questionID + '"}}'
		});
	}
	
	function addAnswer(questionID, answerContent, userID){
		var answer = { 
			question: {
				__type: "Pointer", 
				className:"Question", 
				objectId: questionID
			}, 
			content: answerContent, 
			createdBy: {
				__type: "Pointer", 
				className:"_User", 
				objectId: userID 
			}
		};
		return $.ajax({
			type: "POST",
			headers: {
				"X-Parse-Application-Id": parseConstants.PARSE_APPLICATION_ID,
				"X-Parse-REST-API-Key": parseConstants.PARSE_REST_API_KEY
			},
			url: "https://api.parse.com/1/classes/Answer",
			data: JSON.stringify(answer),
			contentType: 'application/json',
			dataType: 'json'
		});
	}
	
	function deleteAnswer(answerID){
		return $.ajax({
			method: "DELETE",
			headers: {
				"X-Parse-Application-Id": parseConstants.PARSE_APPLICATION_ID,
				"X-Parse-REST-API-Key": parseConstants.PARSE_REST_API_KEY
			},
			url: "https://api.parse.com/1/classes/Answer/" + answerID
		});
	}
	
	function editAnswer(answerID, newContent){
		return $.ajax({
			method: "PUT",
			headers: {
				"X-Parse-Application-Id": parseConstants.PARSE_APPLICATION_ID,
				"X-Parse-REST-API-Key": parseConstants.PARSE_REST_API_KEY
			},
			data: JSON.stringify({content: newContent}),
			contentType: 'application/json',
			url: "https://api.parse.com/1/classes/Answer/" + answerID
		});
	}
	
	return {
		getAllAnswersFromQuestion: getAllAnswersFromQuestion,
		addAnswer: addAnswer,
		deleteAnswer: deleteAnswer,
		editAnswer: editAnswer
	}
})();