var questionView = (function () {
    function visualizeSmallQuestion(questionTitle, questionContent, questionAuthor, questionCategory, questionTags, questionVisits, questionVotes){
        var title = $('<h4>').attr('class', 'small-question-title').text(questionTitle);
        var content = $('<span>').attr('class', 'small-question-content').text(questionContent);
        var author = $('<span>').attr('class', 'small-question-author').text(questionAuthor);
        var category = $('<span>').attr('class', 'small-question-category').text(questionCategory);
        var tags = $('<span>').attr('class', 'small-question-tags').text(questionTags);
        var visits = $('<span>').attr('class', 'small-question-visits').text(questionVisits);
        var votes = $('<span>').attr('class', 'small-question-votes').text(questionVotes);

        var question = $('<tr class="small-question">')
            .append($('<td>').append(title))
            .append($('<td>').append(content))
            .append($('<td>').append(author))
            .append($('<td>').append(category))
            .append($('<td>').append(tags))
            .append($('<td>').append(visits))
            .append($('<td>').append(votes));
        return question;
    }


    return {
        visualizeSmallQuestion: visualizeSmallQuestion
    }
})();