var questionView = (function () {
    function visualizeSmallQuestion(questionTitle, questionContent, questionAuthor, questionCategory, questionTags, questionVisits, questionVotes){
        var title = $('<h4>').attr('class', 'small-question-title').text(questionTitle);
        var content = $('<span>').attr('class', 'small-question-content').text(questionContent);
        var author = $('<span>').attr('class', 'small-question-author').text(questionAuthor);
        var category = $('<span>').attr('class', 'small-question-category').text(questionCategory);
        var tags = $('<span>').attr('class', 'small-question-tags').text(questionTags);
        var visits = $('<span>').attr('class', 'small-question-visits').text(questionVisits);
        var votes = $('<span>').attr('class', 'small-question-votes').text(questionVotes);

        var question = $('<ul class="small-question">')
            .append($('<li>').append(title))
            .append($('<li>').append(content))
            .append($('<li>').append(author))
            .append($('<li>').append(category))
            .append($('<li>').append(visits))
            .append($('<li>').append(votes));
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