var questionView = (function () {
    function visualizeSmallQuestion(questionTitle, questionContent, questionAuthor, questionCategory, questionTags, questionVisits, questionVotes){
        var title = $('<h4 class="small-question-title">').text(questionTitle);
        var content = $('<p class="small-question-content">').text(questionContent);
        var author = $('<span class="small-question-author">').text(questionAuthor);
        var category = $('<span class="small-question-category">').text(questionCategory);
        var tags = $('<span class="small-question-tags">').text(questionTags);
        var visits = $('<span class="small-question-visits">').text(questionVisits);
        var votes = $('<span class="small-question-votes">').text(questionVotes);

        var question = $('<ul class="small-question">')
            .append($('<li>').text(title))
            .append($('<li>').text(content))
            .append($('<li>').text(author))
            .append($('<li>').text(category))
            .append($('<li>').text(visits))
            .append($('<li>').text(votes));
        return question;
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
      //  answerView(question.objectId);

    }


    return {
        visualizeSmallQuestion: visualizeSmallQuestion
    }
})();