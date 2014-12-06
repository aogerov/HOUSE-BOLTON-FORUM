var AnswerController = (function () {
    
	function visualizeAllAnswers(questionId, questionSelector){
		var promise = answersModule.getAllAnswersFromQuestion(questionId);
		promise.success(function(data) {
			var allAnswers = data.results.sort( function(a,b){
				return a.createdAt > b.createdAt;
			});
			var answerList = AnswerView.visualizeAllAnswers(allAnswers);
			var addAnswerElement = AnswerView.visualizeAddAnswer();
			
			$(questionSelector).append(answerList);
			if (UserController.getLoggedUser()){
				$(questionSelector).append(addAnswerElement);
				
				$('#add-answer-btn').click(function(){
					var questionID = $('article').attr('data-id');
					var answerContent = $('#answer-content-input').val();
					var user = UserController.getLoggedUser();
					var userID = user.objectId;
					answersModule.addAnswer(questionID, answerContent, userID).success(function (data) {
						answersModule.getAnswerById(data.objectId).success(function(data){
							$('[data-type="answersToQuestion"]').append(AnswerView.visualizeAnswer(data));
							$('#answer-content-input').val('');
						});
					});
				});
			}
		});
		
		promise.error(function(data){
			console.log("Cannot visualize answers");
			console.log(data);
		});
	}
	
	return {
        visualizeAllAnswers: visualizeAllAnswers
	}
	
	/*
    function VisualizeAddQuestion(selector) {
        selector.append(questionView.visualizeAddQuestion());
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
    }*/
})();