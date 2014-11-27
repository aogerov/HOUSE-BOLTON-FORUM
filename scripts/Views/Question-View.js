// works for all questions, but should for only one, by given Id
// needs rework after questions-api has been updated
function visualize(questionId){
    var promise = questionsModule.getQuestionByID(questionId);
    promise.success(visualizeQuestions);
    promise.error(function(data){
        console.log("Cannot visualize questions");
        console.log(data);
    });
}

function visualizeQuestions(data){
    var question = data;
    var questionsList = $("#questions");
    var questionTitle = $("<h4>").text(question.title),
        questionContent = $("<div>").text(question.content),
        questionElement = $("<li>")
            .attr("data-id",question.objectId)
            .attr("data-type","question")
            .append(questionTitle)
            .append(questionContent)
            .appendTo(questionsList);
    answerView(question.objectId);

}
	