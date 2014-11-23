var tagModule = (function() {
	function getAllTags() {
		return $.ajax({
			method: "GET",
			headers: {
				"X-Parse-Application-Id": parseConstants.PARSE_APPLICATION_ID,
				"X-Parse-REST-API-Key": parseConstants.PARSE_REST_API_KEY
			},
			url: "https://api.parse.com/1/classes/Tag"
		});
	}

	function addTag(name) {

		var tag = {
			name: name,
			question: {
				__type: "Relation", 
				className:"Question"
			}
		};

		return $.ajax({
			type: "POST",
			headers: {
				"X-Parse-Application-Id": PARSE_APP_ID,
				"X-Parse-REST-API-Key": PARSE_REST_API_KEY
			},
			url: "https://api.parse.com/1/classes/Tag",
			data: JSON.stringify(tag),
			contentType: 'application/json',
			dataType: 'json',
		});

	}

	function deleteTag(tagID){
		return $.ajax({
			method: "DELETE",
			headers: {
				"X-Parse-Application-Id": PARSE_APP_ID,
				"X-Parse-REST-API-Key": PARSE_REST_API_KEY
			},
			url: "https://api.parse.com/1/classes/Tag/" + tagID
		});
	}
	
	return {
		getAllTags: getAllTags,
		addTag: addTag,
		deleteTag: deleteTag
	}

})();
