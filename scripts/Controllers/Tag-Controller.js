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
				var countQuestionWithTag = questionsModule.getAllQuestionRelatedToTag(tag.objectId);
				var countQuestion = countQuestionWithTag.success(function(data) {
					count = data.results.length;
					var tagId = tag.objectId;
					$('#'+tagId).css({"font-size": 16 + count + "px"});
				});
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




	function visualizeQuestions(tagId, selector) {
		questionsModule.getAllQuestionRelatedToTag(tagId).success(function (data) {
            questionController.getAndVisualizeSmallQuestions(data.results, selector);
        })
	}

	function handleError() {
		console.log("Error");
	 }

	return {
		getAndVisualizeTags: getAndVisualizeTags,
		checkIfTagExitsByName: checkIfTagExitsByName,
        visualizeQuestions: visualizeQuestions
	}

})();