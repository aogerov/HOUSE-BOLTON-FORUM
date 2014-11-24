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
			name: name
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
	
	function getTagByName(name) {
		return $.ajax({
				method: "GET",
				headers: {
					"X-Parse-Application-Id": PARSE_APP_ID,
					"X-Parse-REST-API-Key": PARSE_REST_API_KEY
				},
				url: 'https://api.parse.com/1/classes/Tag?where={"name":"' + name +'"}',
			});

	}
	function getTagById(tagId) {
		return $.ajax({
				method: "GET",
				headers: {
					"X-Parse-Application-Id": PARSE_APP_ID,
					"X-Parse-REST-API-Key": PARSE_REST_API_KEY
				},
				url: 'https://api.parse.com/1/classes/Tag?where={"objectId":"' + tagId +'"}',
			});

	}
	
	return {
		getAllTags: getAllTags,
		addTag: addTag,
		deleteTag: deleteTag,
		getTagByName: getTagByName,
		getTagById: getTagById
		
	}
})();
