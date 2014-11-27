var questionController = (function () {
    var promise = questionsModule.getQuestionByID(questionId);
    promise.success(visualizeQuestions);
    promise.error(function(err){
        console.log("Cannot visualize questions");
        console.log(err);
    });
})();