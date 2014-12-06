var AnswerView = (function(){
	function visualizeAllAnswers(allAnswers){
		var	answerList = $("<ul>")
					.attr("data-type","answersToQuestion");

		allAnswers.forEach(function (answer) {
			var answerElement = visualizeAnswer(answer);
			answerList.append(answerElement);
		});
		
		return answerList;
	}
	
	function visualizeAnswer(answer){
		var answerElement = $('<li>')
			.attr("data-id",answer.objectId)
			.attr("data-type","answer");
		var answerContent = $('<p>').text(answer.content);
		var answerDate = $('<div>').text(new Date(answer.createdAt).toLocaleString());
		var answerAuthor = answer.createdBy;
		var authorElement = $('<a>').text(answerAuthor.username).attr('href','#/user/'+ answerAuthor.objectId);
		var avatar = $('<img>').attr('src',answerAuthor.avatar.url).addClass('avatar-img');
		var info = $('<div class="post-info">').append(authorElement,answerDate);
		answerElement.append(avatar,info,answerContent);
		
		return answerElement;
	}
	
	function visualizeAddAnswer(questionSelector){ 
		var form = $('<form>');
		var textarea = $('<textarea>').attr('id','answer-content-input');
		var addButton = $('<button>Add answer</button>').attr('id','add-answer-btn');
		form.append(textarea, addButton);
		return form;
	}
	
	return {
        visualizeAllAnswers: visualizeAllAnswers,
		visualizeAddAnswer:visualizeAddAnswer,
		visualizeAnswer:visualizeAnswer
	}
})();