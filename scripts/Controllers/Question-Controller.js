var questionController = (function () {
    
    
    //    function addEventHandlerForTitleClick(element) {
    //        element.click(function () {
    //            getAndVisualiseQuestionByID($(element).attr('data-id'));
    //        });
    //    }
    
    function getAndVisualizeLastNQuestions(n) {
        var mainSection = $('main');
        
        mainSection.text('');

        var questionsPromise = questionsModule.getAllQuestions(n);
        questionsPromise.success(function (data) {
            var questions = data.results;
            
            $.each(questions, function (_, question) {
                $.when(UserModule.getUserById(question.createdBy.objectId), CategoriesModule.getCategoryByID(question.category.objectId), QuestionTagRelationModule.getRelationsByQuestion(question.objectId)).done(function (userData, categoryData, relationData) {
                    var questionTitle = question.title;
                    var questionContent = question.content.substr(0, CHARACTERS_TO_BE_DISPLAYED_AT_SMALL_QUESTIONS) + "...";
                    var questionAuthor = userData[0].username;
                    var questionAuthorId = userData[0].objectId;
                    var questionCategory = categoryData[0].name;
                    var questionTags = "some tags";
                    var questionVisits = question.visits;
                    var questionVotes = question.votes;

                    var questionHTML = questionView.visualizeSmallQuestion(question.objectId, questionTitle, questionContent, questionAuthor, questionCategory, questionTags, questionVisits, questionVotes, questionAuthorId);
                    mainSection.append(questionHTML);
                })
            });
        }).error(function (err) {
            console.log(err);
        });
    }
    
    function getAndVisualizeQuestionByID(questionID) {
        var mainSection = $('main');
        
        mainSection.text('');
        var questionPromise = questionsModule.getQuestionByID(questionID);
        questionPromise.success(function (data) {
            var question = data;
            var questionTitle = question.title;
            var questionContent = question.content;
            var questionAuthor;
            $.ajaxSetup({ async: false });
            var responseJSONUser = UserModule.getUserById(question.createdBy.objectId).responseJSON;
            questionAuthor = responseJSONUser.username;
            $.ajaxSetup({ async: true });

            mainSection.append(questionView.visualizeLargeQuestionWithAnswers(questionTitle, questionContent, questionAuthor))
        }).error(function (err) {
            console.log(err);
        });
    }
    return {
        getAndVisualizeLastNQuestions: getAndVisualizeLastNQuestions,
        getAndVisualizeQuestionByID: getAndVisualizeQuestionByID
    }
})();