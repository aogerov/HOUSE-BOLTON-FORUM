var tagModule = (function() {
	function getAllTags() {
		return $.ajax({
			method: "GET",
			headers: {
				"X-Parse-Application-Id": parseConstants.PARSE_APPLICATION_ID,
				"X-Parse-REST-API-Key": parseConstants.PARSE_REST_API_KEY
			},
			url: "https://api.parse.com/1/classes/Tag?"
		});
	}

	function addTag(name, questionIdsArray) {
		var tag = {
			name: name,
			question: {
				__op: "AddRelation",
				objects: []
			}
		};

		var questionPointers = [];
		questionIdsArray.forEach(function(questionId){
			questionPointers.push({
				__type: "Pointer",
				className: "Question",
				objectId: questionId
			})
		});

		tag.question.objects = questionPointers;

		return $.ajax({
			type: "POST",
			headers: {
				"X-Parse-Application-Id": parseConstants.PARSE_APPLICATION_ID,
                "X-Parse-REST-API-Key": parseConstants.PARSE_REST_API_KEY
			},
			url: "https://api.parse.com/1/classes/Tag",
			data: JSON.stringify(tag),
			contentType: 'application/json',
			dataType: 'json'
		});

	}

	function deleteTag(tagID){
		return $.ajax({
			method: "DELETE",
			headers: {
				"X-Parse-Application-Id": parseConstants.PARSE_APPLICATION_ID,
                "X-Parse-REST-API-Key": parseConstants.PARSE_REST_API_KEY
			},
			url: "https://api.parse.com/1/classes/Tag/" + tagID
		});
	}
	
	function getTagByName(name) {
		return $.ajax({
				method: "GET",
				headers: {
					"X-Parse-Application-Id": parseConstants.PARSE_APPLICATION_ID,
           			 "X-Parse-REST-API-Key": parseConstants.PARSE_REST_API_KEY
				},
				url: 'https://api.parse.com/1/classes/Tag?where={"name":"' + name +'"}'
			});

	}
	function getTagById(tagId) {
		return $.ajax({
				method: "GET",
				headers: {
					"X-Parse-Application-Id": parseConstants.PARSE_APPLICATION_ID,
                "X-Parse-REST-API-Key": parseConstants.PARSE_REST_API_KEY
				},
				url: 'https://api.parse.com/1/classes/Tag?where={"objectId":"' + tagId +'"}'
			});

	}
	
	function editTag(tagId, questionId) {
		var tag = {
			question: {
				__op: "AddRelation",
				objects: []
			}
		}

			tag.question.objects.push({
				__type: "Pointer",
				className: "Question",
				objectId: questionId
		});

		return $.ajax({
				method: "PUT",
				headers: {
					"X-Parse-Application-Id": parseConstants.PARSE_APPLICATION_ID,
					"X-Parse-REST-API-Key": parseConstants.PARSE_REST_API_KEY
				},
				url: "https://api.parse.com/1/classes/Tag/" + tagId,
				data: JSON.stringify(tag),
				contentType: "application/json"
			});
	}



    function getAllTagsRelatedToQuestion(questionID){
        return $.ajax({
            method: "GET",
            headers: {
                "X-Parse-Application-Id": parseConstants.PARSE_APPLICATION_ID,
                "X-Parse-REST-API-Key": parseConstants.PARSE_REST_API_KEY
            },
            data: 'where=' + JSON.stringify({
                $relatedTo:{
                    object: {
                        __type: "Pointer",
                        className:"Question",
                        objectId: questionID
                    },
                    key: "tags"
                }
            }),
            url: 'https://api.parse.com/1/classes/Tag'});
    }
	
	return {
		getAllTags: getAllTags,
		addTag: addTag,
		deleteTag: deleteTag,
		getTagByName: getTagByName,
		getTagById: getTagById,
		editTag: editTag,
        getAllTagsRelatedToQuestion: getAllTagsRelatedToQuestion
		
	}
})();
