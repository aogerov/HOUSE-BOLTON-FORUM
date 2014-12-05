var questionController = (function () {
    
    
    function VisualizeSmallQuestions(questions, selector) {
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
                selector.append(questionHTML);
            })
        });
    }
    
    function getAndVisualizeLastNQuestions(n, selector) {
        var questionsPromise = questionsModule.getAllQuestions(n);
        questionsPromise.success(function (data) {
            var questions = data.results;
            
            VisualizeSmallQuestions(questions, selector);
        }).error(function (err) {
            console.log(err);
        });
    }
    
    function getAndVisualizeQuestionByID(questionID, selector) {
        var questionPromise = questionsModule.getQuestionByID(questionID);
        questionPromise.success(function (question) {
            $.when(UserModule.getUserById(question.createdBy.objectId)).done(function (userData) {
                var questionTitle = question.title;
                var questionContent = question.content;
                var questionAuthor;
                questionAuthor = userData.username;

                selector.append(questionView.visualizeLargeQuestionWithAnswers(questionTitle, questionContent, questionAuthor, question.objectId));
                AnswerController.visualizeAllAnswers(questionID, "article");
            });
        }).error(function (err) {
            console.log(err);
        });
    }


    function VisualizeAddQuestion(selector) {
        selector.append(questionView.visualizeAddQuestion());
        categoryController.fillCategoriesSelect();
        $('#add-question-button').click(function () {
            var title = $('#title').val();
            var content = $('#content').val();
            var user = 'i2Mq1WP3sN'; //TODO;
            var tags = $('#tags').val();
            var category = 'Q3V1RqV0JD'; // TODO: $('#category').find(":selected").val();
            questionsModule.addQuestion(title, content, user, category, tags).success(function (data) {
                window.history.pushState('Home', 'Home', '#/view/question/' + data.objectId);
            });
        })
    }

    return {
        getAndVisualizeLastNQuestions: getAndVisualizeLastNQuestions,
        getAndVisualizeQuestionByID: getAndVisualizeQuestionByID,
        getAndVisualizeSmallQuestions: VisualizeSmallQuestions,
        VisualizeAddQuestion: VisualizeAddQuestion
    }
})();