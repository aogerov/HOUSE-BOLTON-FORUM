var questionController = (function () {

    function getAndVisualizeLastNQuestions(n) {
        var mainSection = $('main');

        mainSection.text('');
        mainSection.append($('<table id="questions">'));
        var questionsTable = $('#questions');
        questionsTable.append($('<thead>').append($('<tr><th>Title</th><th>Content</th><th>Author</th><th>Category</th><th>Tags</th><th>Visits</th><th>Votes</th></tr>')));

        var questionsPromise = questionsModule.getAllQuestions(n);
        questionsPromise.success(function (data) {
            var questions = data.results;

            $.each(questions, function (_, question) {
                var questionTitle = question.title;
                var questionContent = question.content.substr(0, CHARACTERS_TO_BE_DISPLAYED_AT_SMALL_QUESTIONS) + "...";
                var questionAuthor;
                var questionCategory = "IMPLEMENTING";
                var questionTags = "some tags";
                $.ajaxSetup({async: false});
                var responseJSONUser = UserModule.getUserById(question.createdBy.objectId).responseJSON;
                questionAuthor = responseJSONUser.username;
                $.ajaxSetup({async: true});
                var questionVisits = question.visits;
                var questionVotes = question.votes;

                questionsTable.append(questionView.visualizeSmallQuestion(question.objectId, questionTitle, questionContent, questionAuthor, questionCategory, questionTags, questionVisits, questionVotes));
            });

            $('.small-question-title').click(function () {
                getAndVisualiseQuestionByID($(this).attr('question-id'));
            })
        }).error(function (err) {
            console.log(err);
        });
    }

    function getAndVisualiseQuestionByID(questionID) {
        var mainSection = $('main');

        mainSection.text('');
        mainSection.append($('<table id="question">'));
        var questionPromise = questionsModule.getQuestionByID(questionID);
        questionPromise.success(function (data) {
            var question = data;
            var questionTitle = question.title;
            var questionContent = question.content;
            var questionAuthor;
            $.ajaxSetup({async: false});
            var responseJSONUser = UserModule.getUserById(question.createdBy.objectId).responseJSON;
            questionAuthor = responseJSONUser.username;
            $.ajaxSetup({async: true});

            $('#question').append(questionView.visualizeLargeQuestionWithAnswers(questionTitle, questionContent, questionAuthor))
        }).error(function (err) {
            console.log(err);
        });
    }
    return {
        getAndVisualizeLastNQuestions: getAndVisualizeLastNQuestions
    }
})();