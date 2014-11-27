var questionController = (function () {
    function getAndVisualizeLastNQuestions(n) {
        var questionsPromise = questionsModule.getAllQuestions(n);
        questionsPromise.success(function (data) {
            var questions = data.results;

            $.each(questions, function (_, question) {
                var mainSection = $('main');
                mainSection.text('');

                var questionTitle = question.title;
                var questionContent = question.content;
                var questionAuthor;
                var questionCategory = "IMPLEMENTING";
                var questionTags = "some tags";
                $.ajaxSetup({async: false});
                UserModule.getUserById(question.createdBy).success(function (data) {
                    questionAuthor = data.results.username;
                }).error(function (err) {
                    console.log(err);
                    questionAuthor = "ERROR";
                });
                var questionVisits = question.visits;
                var questionVotes = question.votes;

                mainSection.append(questionView.visualizeSmallQuestion(questionTitle, questionContent, questionAuthor, questionCategory, questionTags, questionVisits, questionVotes));
            })
        }).error(function (err) {
            console.log(err);
        });
        $.ajaxSetup({async: true});
    }

    return {
        getAndVisualizeLastNQuestions: getAndVisualizeLastNQuestions
    }
})();