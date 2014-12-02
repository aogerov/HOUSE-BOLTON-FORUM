var TagsController =(function() {

	function getAndVisualizeTags() {
		$(document.body).append($('<div id="tags">'));
		var tagsDiv = $('#tags');
		var tagsPromise = tagModule.getAllTags();
		tagsPromise.success(function(data) {
			var tags = data.results;

			$.each(tags, function(_, tag) {
				var tagsHTML = TagView.visualizeTags(tag);
				$('.tag-event').css({"font-size": 16 + tag.visited + "px"});
				tagsHTML.data("tag", tag);
				var count = 0;
				var countQuestionWithTag = QuestionTagRelationModule.getRelationsByTag(tag.objectId);
				var countQuestion = countQuestionWithTag.success(function(data) {
					count = data.results.length;
					var editTagSize = tagModule.editTag(tag.objectId, count);
					editTagSize.success(function(data2) {
					
						var number = tag.visited;
						var tagId = tag.objectId;
						$('#'+tagId).css({"font-size": 16 + number + "px"});
						
						
					})

				})
				tagsHTML.click(visualizeQuestionsOnTagClick);
			// 	tagsHTML.click(function() {
			// 		var tag = $(this).data('tag');
			// 			console.log(tag);
			// 			realationPromise = QuestionTagRelationModule.getRelationsByTag(tag.objectId);
						
			// 			realationPromise.success(function(data){
			// 			var allRelations = data.results;
			// 			allRelations.forEach(function(relation){
			// 			var questionPromise = questionsModule.getQuestionByID(relation.question.objectId);
			// 			questionPromise.success(function(question){
			// 				questionController.getAndVisualizeQuestionByID(question.objectId);
			// 			});
			// 			realationPromise.error(handleError);
			// 		})
			// 	}).error(function (err) {
		 //            console.log(err);
		 //       	 });
			// });
						
				tagsDiv.append(tagsHTML[0]);

			})
	}).error(function (err) {
        console.log(err);
    });
}

	function checkIfTagExitsByName(name) {
		var promise = tagModule.getTagByName(name);
		promise.success(function(data) {
				if (data.results.length) {
					var tagId = data.results[0].objectId;
					//console.log(data.results[0].objectId);
				} else {
					tagModule.addTag(name);
				}
		}).error(function (err) {
            console.log(err);
        });
	}



	function visualizeQuestionsOnTagClick(){
		var tag = $(this).data('tag');
		realationPromise = QuestionTagRelationModule.getRelationsByTag(tag.objectId);
		
		realationPromise.success(function(data){
			var allRelations = data.results;
			console.log(allRelations);
			allRelations.forEach(function(relation){
				//console.log(relation);
				var questionPromise = questionsModule.getQuestionByID(relation.question.objectId);
				questionPromise.success(function(question){
					questionController.getAndVisualizeQuestionByID(question.objectId);
				});
				realationPromise.error(handleError);
			})
		}).error(function (err) {
            console.log(err);
        });
	}

	//function tagClick() {
	//	counter++;
	//	var tag = $(this).data('tag');
	//	$.ajax({
	//			method: "PUT",
	//			headers: {
	//				"X-Parse-Application-Id": parseConstants.PARSE_APPLICATION_ID,
	//				"X-Parse-REST-API-Key": parseConstants.PARSE_REST_API_KEY
	//			},
	//			url: "https://api.parse.com/1/classes/Tag/" + 
	//				tag.objectId,
	//			data: JSON.stringify(
	//				{"visited": tag.visited + 1}
	//			),
	//			contentType: "application/json",
	//			error: handleError
	//		});
	//	var size = tag.visited;
	//	//console.log(size);
	//	$(this).css({"font-size": 16 + size + "px"});
	//}

	function handleError() {
		console.log("Error");
	 }

	return {
		getAndVisualizeTags: getAndVisualizeTags,
		checkIfTagExitsByName: checkIfTagExitsByName
	}

})();