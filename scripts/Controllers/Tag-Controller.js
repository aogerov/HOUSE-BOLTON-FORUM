var TagsController =(function() {

	function getAndVisualizeTags() {
        var tagsAside = $('#tags');
		var tagsDiv = $('<p>');
        tagsAside.append(tagsDiv);
		var tagsPromise = tagModule.getAllTags();
		tagsPromise.success(function(data) {
			var tags = data.results;

			$.each(tags, function(_, tag) {
				var tagsHTML = TagView.visualizeTags(tag);
				tagsHTML.data("tag", tag);
				var count = 0;
				var countQuestionWithTag = tagModule.getAllQuestionRelatedToTag(tag.objectId);
				var countQuestion = countQuestionWithTag.success(function(data) {
					count = data.results.length;
					var tagId = tag.objectId;
					$('#'+tagId).css({"font-size": 16 + count + "px"});
				})
				tagsHTML.click(visualizeQuestionsOnTagClick);
				tagsDiv.append(tagsHTML[0]);

			})
	}).error(function (err) {
        console.log(err);
    });
}

	function checkIfTagExitsByName(name, questionId) {
		var promise = tagModule.getTagByName(name);
		promise.success(function(data) {
				if (data.results.length) {
					var tagId = data.results[0].objectId;
					tagModule.editTag(tagId, questionId);
					console.log(data.results[0].objectId);
				} else {
					var questionIdsArray = [questionId];
					tagModule.addTag(name, questionIdsArray);
				}
		}).error(function (err) {
            console.log(err);
        });
	}



	function visualizeQuestionsOnTagClick(){
		var tag = $(this).data('tag');
		var realationPromise = tagModule.getAllQuestionRelatedToTag(tag.objectId);
		realationPromise.success(function(data){
			var allRelations = data.results;
			console.log("a" + allRelations);

			questionController.VisualizeSmallQuestions(allRelations, 'main');
			})
		realationPromise.error(function (err) {
            console.log(err);
        });
		
	}

	function handleError() {
		console.log("Error");
	 }

	return {
		getAndVisualizeTags: getAndVisualizeTags,
		checkIfTagExitsByName: checkIfTagExitsByName
	}

})();