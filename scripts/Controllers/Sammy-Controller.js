$(function () {
    Sammy('main', function() {
        this.get('#/', function () {
            questionController.getAndVisualizeLastNQuestions(NUMBER_OF_LAST_QUESTIONS_DEFAULT);
        });
        this.get('#/view-question/:id', function(context) {
            questionController.getAndVisualizeQuestionByID(this.params['id']);
        });

    }).run('#/');
});