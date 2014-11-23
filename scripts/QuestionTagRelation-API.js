var QuestionTagRelationModule = (function(){
	function addRelation(questionId, tagId){
		var relation = {
			tag: {
				__type: "Pointer",
				className: "Tag",
				objectId: tagId
			},
			question: {
				__type: "Pointer",
				className: "Question",
				objectId: questionId
			}
		};

		return $.ajax({
			type: "POST",
			headers: {
				"X-Parse-Application-Id": PARSE_APP_ID,
				"X-Parse-REST-API-Key": PARSE_REST_API_KEY
			},
			url: "https://api.parse.com/1/classes/QuestionTagRelation",
			data: JSON.stringify(relation),
			contentType: 'application/json',
			dataType: 'json',
		});
	}
	
	function getRelationsByTag(tagId){
		return $.ajax({
			method: "GET",
			headers: {
				"X-Parse-Application-Id": parseConstants.PARSE_APPLICATION_ID,
				"X-Parse-REST-API-Key": parseConstants.PARSE_REST_API_KEY
			},
			url: 'https://api.parse.com/1/classes/QuestionTagRelation?where={"tag":{"__type":"Pointer","className":"Tag","objectId":"' + tagId + '"}}'
		});
	}
	
	function getRelationsByQuestion(questionId){
		return $.ajax({
			method: "GET",
			headers: {
				"X-Parse-Application-Id": parseConstants.PARSE_APPLICATION_ID,
				"X-Parse-REST-API-Key": parseConstants.PARSE_REST_API_KEY
			},
			url: 'https://api.parse.com/1/classes/QuestionTagRelation?where={"question":{"__type":"Pointer","className":"Question","objectId":"' + questionId + '"}}'
		});
	}
	
	return{
		addRelation: addRelation,
		getRelationsByTag: getRelationsByTag,
		getRelationsByQuestion: getRelationsByQuestion
	}
})();