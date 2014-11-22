    var questionsModule = (function () {
        function getAllQuestions() {
            return $.ajax({
                method: "GET",
                headers: {
                    "X-Parse-Application-Id": parseConstants.PARSE_APPLICATION_ID,
                    "X-Parse-REST-API-Key": parseConstants.PARSE_REST_API_KEY
                },
                url: "https://api.parse.com/1/classes/Question"
            });
        }
		
        function getAllQuestionsFromCategory(categoryID) {
            return $.ajax({
                method: "GET",
                headers: {
                    "X-Parse-Application-Id": parseConstants.PARSE_APPLICATION_ID,
                    "X-Parse-REST-API-Key": parseConstants.PARSE_REST_API_KEY
                },
                url: 'https://api.parse.com/1/classes/Question?where={"category":{"__type":"Pointer","className":"Category","objectId":"' + categoryID + '"}}',
            });
        }

        function searchQuestionsByTitle(keyword) {
            return $.ajax({
                method: "GET",
                headers: {
                    "X-Parse-Application-Id": parseConstants.PARSE_APPLICATION_ID,
                    "X-Parse-REST-API-Key": parseConstants.PARSE_REST_API_KEY
                },
                url: 'https://api.parse.com/1/classes/Question?where={"title":{"$regex":"' + keyword + '", "$options":"i"}}',
            });
        }

        return {
            getAllQuestions: getAllQuestions,
            getAllQuestionsFromCategory: getAllQuestionsFromCategory,
            searchQuestionsByTitle: searchQuestionsByTitle
        }
    })();