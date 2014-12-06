var questionView = (function () {
    function visualizeSmallQuestion(questionID, questionCreatedAt, questionTitle, questionContent, questionAuthor, questionCategory, questionCategoryID, questionTags, questionVisits, questionVotes, questionAuthorId){
        var title = $('<h2 data-id="' + questionID + '">').attr('class', 'small-question-title').append($('<a href="#/view/question/'+ questionID + '">').text(questionTitle));
        var content = $('<p>').attr('class', 'small-question-content').text(questionContent);
        var $divPostInfo = $('<div>').addClass('post-info');
        var author = $('<a href="#/user/' + questionAuthorId + '">').attr('class', 'small-question-author').text('Author: ' + questionAuthor);
        var date = $('<span>').text(new Date(questionCreatedAt).toLocaleString());
        var category = $('<a href="#/category/' + questionCategoryID + '">').attr('class', 'small-question-category').text(questionCategory);
        var tags = [];
        $.each(questionTags, function (_, tag) {
            tags.push($('<a href="#/view/tag/' + tag.objectId + '">').text(tag.name));
        });

        var visits = $('<span>').attr('class', 'small-question-visits').text('Visits: ' + questionVisits);

        var question = $('<article class="small-question">').attr('data-id', questionID)
            .append($('<header>').append(category).append(title).append($divPostInfo.append(author).append(date).append(visits)))
            .append($('<main>').append(content))
            .append($('<footer>').append(tags));
        return question;
    }

    function visualizeLargeQuestionWithAnswers(questionTitle, questionContent, questionAuthor, questionAuthorID, questionID) {
        var title = $('<h3>').attr('class', 'large-question-title').text(questionTitle);
        var content = $('<span>').attr('class', 'large-question-content').text(questionContent);
        var author = $('<div>').addClass('post-info').append($('<a href="#/user/' + questionAuthorID + '">').text(questionAuthor));

        var article = $('<article>').addClass('large-question').attr('data-id',questionID);
		var question = $('<header>')
            .append(title)
            .append(author)
            .append(content);
			article.append(question);
        return article;
    }

    function visualizeAddQuestion() {
        var view = $(
                '<div id="add-question">' +
                '<label for="title">Title:</label><input type="text" id="title">' +
                '<label for="content">Content:</label><textarea id="content"></textarea>' +
                '<label for="tags">Tags:</label><input type="text" id="tags">' +
                '<label for="category">Category:</label>' +
                '<select id="category"></select>' +
                '<button id="add-question-button">Add Question</button>' +
                '</div>'
        );
        return $('<article class="small-question">').append(view);
    }

    return {
        visualizeSmallQuestion: visualizeSmallQuestion,
        visualizeLargeQuestionWithAnswers: visualizeLargeQuestionWithAnswers,
        visualizeAddQuestion: visualizeAddQuestion
    }
})();