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
//                $.ajaxSetup({async: false});
                UserModule.getUserById(question.createdBy).success(function (data) {
                    console.log(data.results.username);
//                    questionAuthor = data.results.username;
                }).error(function (err) {
                    console.log(err);
                    questionAuthor = "ERROR";
                });
//                $.ajaxSetup({async: true});

                var questionVisits = question.visits;
                var questionVotes = question.votes;

                questionsTable.append(questionView.visualizeSmallQuestion(questionTitle, questionContent, questionAuthor, questionCategory, questionTags, questionVisits, questionVotes));
            })
        }).error(function (err) {
            console.log(err);
        });
    }

    return {
        getAndVisualizeLastNQuestions: getAndVisualizeLastNQuestions
    }
})();