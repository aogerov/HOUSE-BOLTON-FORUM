var TagView = (function() {
	var counter = 0;
	function visualize() {
		var promise = tagModule.getAllTags();
		promise.success(visualizeTags);
		promise.error(function(data) {
		consol.log("cannot visualize tags");
		});
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
		})
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
		alert("Error");
	 }

	return {
		visualize: visualize
	}

})();