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
		$.ajax({
			type: "POST",
			headers: {
				"X-Parse-Application-Id": parseConstants.PARSE_APPLICATION_ID,
				"X-Parse-REST-API-Key": parseConstants.PARSE_REST_API_KEY
			},
			url: "https://api.parse.com/1/classes/Answer",
			data: JSON.stringify(answer),
			contentType: 'application/json',
			dataType: 'json',
			success: answerAdded,
			error: answerErrorOnAdd
		});
	}
	
	function deleteAnswer(answerID){
		$.ajax({
			method: "DELETE",
			headers: {
				"X-Parse-Application-Id": parseConstants.PARSE_APPLICATION_ID,
				"X-Parse-REST-API-Key": parseConstants.PARSE_REST_API_KEY
			},
			url: "https://api.parse.com/1/classes/Answer/" + answerID,
			success: answerDeleted,
			error: answerErrorOnDelete
		});
	}
	
	function editAnswer(answerID, newContent){
		$.ajax({
			method: "PUT",
			headers: {
				"X-Parse-Application-Id": parseConstants.PARSE_APPLICATION_ID,
				"X-Parse-REST-API-Key": parseConstants.PARSE_REST_API_KEY
			},
			data: JSON.stringify({content: newContent}),
			contentType: 'application/json',
			url: "https://api.parse.com/1/classes/Answer/" + answerID,
			success: answerEdited,
			error: answerErrorOnEdit
		});
	}
	
	
	function answersLoaded(data) {
		//console.log(data);
		var allAnswers = data.results;
		var answerList = $("<ul>");
		allAnswers.forEach(function (answer) {
			var answerElement = $('<li>').text(answer.content);
			answerList.append(answerElement);
		});
		$(document.body).append(answerList);
	}
		
	function answersErrorOnLoad() {
		console.log("Cannot load answers!");
	}
	
	function answerErrorOnAdd() {
		console.log("Cannot add answer!");
	}
	function answerAdded(data){
		console.log("Added answer!");
		console.log(data);
	}
	
	function answerErrorOnDelete() {
		console.log("Cannot delete answer!");
	}
	function answerDeleted(){
		console.log("Deleted answer!");
	}
	
	function answerErrorOnEdit() {
		console.log("Cannot edit answer!");
	}
	function answerEdited(data){
		console.log("Edited answer!");
		//console.log(data); // returns updatedAt
	}
	
	return {
		getAllAnswersFromQuestion: getAllAnswersFromQuestion,
		addAnswer: addAnswer,
		deleteAnswer: deleteAnswer,
		editAnswer: editAnswer
	}
})();