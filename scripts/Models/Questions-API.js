var questionsModule = (function () {

    function addQuestion(title, content, userID, categoryID, tagIDsArray) {
        var question = {
            title: title,
            content: content,
            createdBy: {
                __type: "Pointer",
                className: "_User",
                objectId: userID
            },
            category: {
                __type: "Pointer",
                className: "Category",
                objectId: categoryID
            },
            visits: 0,
            votes: 0,
			tags: { 
				__op: "AddRelation", 
				objects: [] // filled below
			}
        };
		var tagPointers = [];
		tagIDsArray.forEach(function(tagID){
			tagPointers.push({
               __type: "Pointer",
               className: "Tag",
               objectId: tagID
           });
		});
		
		question.tags.objects = tagPointers;

        return $.ajax({
            type: "POST",
            headers: {
                "X-Parse-Application-Id": parseConstants.PARSE_APPLICATION_ID,
                "X-Parse-REST-API-Key": parseConstants.PARSE_REST_API_KEY
            },
            url: "https://api.parse.com/1/classes/Question",
            data: JSON.stringify(question),
            contentType: 'application/json',
            dataType: 'json'
        });
    }

    function getQuestionByID(questionID) {
        return $.ajax({
            method: "GET",
            headers: {
                "X-Parse-Application-Id": parseConstants.PARSE_APPLICATION_ID,
                "X-Parse-REST-API-Key": parseConstants.PARSE_REST_API_KEY
            },
            url: "https://api.parse.com/1/classes/Question/" + questionID
        });
    }

    function getAllQuestions(limit) {
        var howMuchQuestionsToGet;
        if (limit) {
            howMuchQuestionsToGet = '?limit=' + limit;
        } else {
            howMuchQuestionsToGet = '';
        }
        return $.ajax({
            method: "GET",
            headers: {
                "X-Parse-Application-Id": parseConstants.PARSE_APPLICATION_ID,
                "X-Parse-REST-API-Key": parseConstants.PARSE_REST_API_KEY
            },
            url: "https://api.parse.com/1/classes/Question" + howMuchQuestionsToGet
        });
    }

    function getAllQuestionsFromCategory(categoryID) {
        return $.ajax({
            method: "GET",
            headers: {
                "X-Parse-Application-Id": parseConstants.PARSE_APPLICATION_ID,
                "X-Parse-REST-API-Key": parseConstants.PARSE_REST_API_KEY
            },
            url: 'https://api.parse.com/1/classes/Question?where={"category":{"__type":"Pointer","className":"Category","objectId":"' + categoryID + '"}}'
        });
    }

    function getAllQuestionsFromUser(userID) {
        return $.ajax({
            method: "GET",
            headers: {
                "X-Parse-Application-Id": parseConstants.PARSE_APPLICATION_ID,
                "X-Parse-REST-API-Key": parseConstants.PARSE_REST_API_KEY
            },
            url: 'https://api.parse.com/1/classes/Question?where={"createdBy":{"__type":"Pointer","className":"_User","objectId":"' + userID + '"}}'
        });
    }

    function searchQuestionsByTitle(keyword) {
        return $.ajax({
            method: "GET",
            headers: {
                "X-Parse-Application-Id": parseConstants.PARSE_APPLICATION_ID,
                "X-Parse-REST-API-Key": parseConstants.PARSE_REST_API_KEY
            },
            url: 'https://api.parse.com/1/classes/Question?where={"title":{"$regex":"' + keyword + '", "$options":"i"}}'
        });
    }

    function deleteQuestion(questionID) {
        return $.ajax({
            method: "DELETE",
            headers: {
                "X-Parse-Application-Id": parseConstants.PARSE_APPLICATION_ID,
                "X-Parse-REST-API-Key": parseConstants.PARSE_REST_API_KEY
            },
            url: "https://api.parse.com/1/classes/Question/" + questionID
        });
    }

    function editQuestion(questionID, content) {
        return $.ajax({
            method: "PUT",
            headers: {
                "X-Parse-Application-Id": parseConstants.PARSE_APPLICATION_ID,
                "X-Parse-REST-API-Key": parseConstants.PARSE_REST_API_KEY
            },
            data: JSON.stringify({content: content}),
            contentType: 'application/json',
            url: "https://api.parse.com/1/classes/Question/" + questionID
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
        addQuestion: addQuestion,
        getQuestionByID: getQuestionByID,
        getAllQuestions: getAllQuestions,
        getAllQuestionsFromCategory: getAllQuestionsFromCategory,
        getAllQuestionsFromUser: getAllQuestionsFromUser,
        searchQuestionsByTitle: searchQuestionsByTitle,
        deleteQuestion: deleteQuestion,
        editQuestion: editQuestion,
		getAllTagsRelatedToQuestion:getAllTagsRelatedToQuestion
    }
})();