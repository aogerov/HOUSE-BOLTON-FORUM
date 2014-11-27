var TagView = (function() {
	var counter = 0;
	function visualize() {
		var promise = tagModule.getAllTags();
		promise.success(visualizeTags);
		promise.error(function(data) {
		consol.log("cannot visualize tags");
		});
	}
	
	function checkTagsByName(name) {
		var promise = tagModule.getTagByName(name);
		promise.success(function(data) {
				if (data.results.length) {
					var tagId = data.results[0].objectId;
					console.log(data.results[0].objectId);
				} else {
					tagModule.addTag(name);
				}
		});
		promise.error(handleError);
	}

	function visualizeTags(data) {
		var allTags = data.results;
		var tagList = $('#tags');

		allTags.forEach(function(tag) {
			var tagLink = $("<a href='#'>").text(tag.name);
			tagLink.attr("data-id", tag.objectId);
			console.log(tag.objectId);
			tagLink.data('tag', tag);
			tagLink.css({"margin" : "5px"});
			$(tagLink).css({"font-size": 16 + tag.visited + "px"});
			tagLink.appendTo(tagList);
			$(tagLink).click(tagClick);
			tagLink.click(visualizeQuestionsOnTagClick);
		})
	}
	
	function visualizeQuestionsOnTagClick(){
		var tag = $(this).data('tag'),
			promise = QuestionTagRelationModule.getRelationsByTag(tag.objectId);
		
		promise.success(function(data){
			var allRelations = data.results;
			allRelations.forEach(function(relation){
				//console.log(relation);
				var questionPromise = questionsModule.getQuestionByID(relation.question.objectId);
				questionPromise.success(function(question){
					QuestionAnswerView.visualize(question.objectId);
				});
				questionPromise.error(handleError);
			})
		});
		promise.error(handleError);
	}

	function tagClick() {
		counter++;
		var tag = $(this).data('tag');
		$.ajax({
				method: "PUT",
				headers: {
					"X-Parse-Application-Id": parseConstants.PARSE_APPLICATION_ID,
					"X-Parse-REST-API-Key": parseConstants.PARSE_REST_API_KEY
				},
				url: "https://api.parse.com/1/classes/Tag/" + 
					tag.objectId,
				data: JSON.stringify(
					{"visited": tag.visited + 1}
				),
				contentType: "application/json",
				error: handleError
			});
		var size = tag.visited;
		//console.log(size);
		$(this).css({"font-size": 16 + size + "px"});
	}

	function handleError() {
		console.log("Error");
	 }

	return {
		visualize: visualize,
		checkTagsByName: checkTagsByName,
		visualizeQuestionsOnTagClick: visualizeQuestionsOnTagClick		
	}

})();