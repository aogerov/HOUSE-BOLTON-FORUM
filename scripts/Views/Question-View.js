var questionView = (function () {
    function visualizeSmallQuestion(questionID, questionTitle, questionContent, questionAuthor, questionCategory, questionTags, questionVisits, questionVotes, questionAuthorId){
        var title = $('<a href="#/view/question/'+ questionID + '">').append($('<h2 data-id="' + questionID + '">').attr('class', 'small-question-title').text(questionTitle));
        var content = $('<p>').attr('class', 'small-question-content').text(questionContent);
        var author = $('<a href="#/user/' + questionAuthorId + '">').attr('class', 'small-question-author').text(questionAuthor);
        var category = $('<span>').attr('class', 'small-question-category').text(questionCategory);
        var tags = $('<span>').attr('class', 'small-question-tags').text(questionTags);
        var visits = $('<span>').attr('class', 'small-question-visits').text(questionVisits);
        var votes = $('<span>').attr('class', 'small-question-votes').text(questionVotes);

//        <article>
//            <header>
//                <h2><a href="#" rel="bookmark" title="title">Questions</a></h2>
//            </header>
//
//            <footer>
//                <p class="post-info">User</p>
//            </footer>
//
//            <content>
//                <p>Questions</p>
//                <p>Answers</p>
//            </content>
//
//        </article>



        var question = $('<article class="small-question">')
            .append($('<header>').append(title))
            .append($('<main>').append(content))
            .append($('<footer>').append(author).append(category).append(tags).append(visits).append(votes));
        return question;
    }

    function visualizeLargeQuestionWithAnswers(questionTitle, questionContent, questionAuthor) {
        var title = $('<h3>').attr('class', 'large-question-title').text(questionTitle);
        var content = $('<span>').attr('class', 'large-question-content').text(questionContent);
        var author = $('<span>').attr('class', 'large-question-author').text(questionAuthor);

        var article = $('<article>').addClass('large-question');
		var question = $('<header>')
            .append(title)
            .append(content)
            .append(author);
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
                '<select id="category">' +
                '<option value="Kosche">Kosche</option>' +
                '</select>' +
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