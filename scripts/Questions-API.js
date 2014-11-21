    var questionsModule = (function () {
        function getAllQuestions() {
            $.ajax({
                method: "GET",
                headers: {
                    "X-Parse-Application-Id": parseConstants.PARSE_APPLICATION_ID,
                    "X-Parse-REST-API-Key": parseConstants.PARSE_REST_API_KEY
                },
                url: "https://api.parse.com/1/classes/Question",
                success: questionsLoaded,
                error: handleError
            });
        }
        function getAllQuestionsFromCategory(categoryID) {
            $.ajax({
                method: "GET",
                headers: {
                    "X-Parse-Application-Id": parseConstants.PARSE_APPLICATION_ID,
                    "X-Parse-REST-API-Key": parseConstants.PARSE_REST_API_KEY
                },
                url: 'https://api.parse.com/1/classes/Question?where={"category":{"__type":"Pointer","className":"Category","objectId":"' + categoryID + '"}}',
                success: questionsLoaded,
                error: handleError
            });
        }

        function searchQuestionsByTitle(keyword) {
            $.ajax({
                method: "GET",
                headers: {
                    "X-Parse-Application-Id": parseConstants.PARSE_APPLICATION_ID,
                    "X-Parse-REST-API-Key": parseConstants.PARSE_REST_API_KEY
                },
                url: 'https://api.parse.com/1/classes/Question?where={"title":{"$regex":"' + keyword + '", "$options":"i"}}',
                success: questionsLoaded,
                error: handleError
            });
        }



        //This is part of the View - The data is taken, we now have to visualize it
        function questionsLoaded(data) {
            var allQuestions = data.results;
            var questionsList = $("#questions");
            allQuestions.forEach(function (question) {
                var questionElement = $("<li>");
                questionElement.text(question.title);
                questionsList.append(questionElement);
            })
        }

        function handleError() {
            alert("We have an error");
        }

        return {
            getAllQuestions: getAllQuestions,
            getAllQuestionsFromCategory: getAllQuestionsFromCategory,
            searchQuestionsByTitle: searchQuestionsByTitle
        }
    })();