var tagModule = (function() {
	function getAllTags() {
		$.ajax({
			method: "GET",
			headers: {
				"X-Parse-Application-Id": parseConstants.PARSE_APPLICATION_ID,
                "X-Parse-REST-API-Key": parseConstants.PARSE_REST_API_KEY
			},
			url: "https://api.parse.com/1/classes/Tag",
			success: tagLoaded,
			error: handleError
		});
	}

	function tagLoaded(data) {
			var allTags = data.results;
			var tagItem = $('<ul>');

			// allTags.forEach(function(tag) {
			// 	var tagLink = $("<li><a href='#'></li>").text(tag.name);
			// 	$(tagLink).data('tag', tag);
			// 	tagLink.appendTo(tagItem);
			// 	$(tagLink).click(tagClick);
			// 	tagItem.appendTo($('#tags'));
			// })

			$.each(allTags, function(i, tag) {
				var tagLink = $("<li><a href='#'>").text(tag.name);
			 	$(tagLink).data('tag', tag);
			 	tagLink.appendTo(tagItem);
			 	$(tagLink).click(tagClick);
			 	tagItem.appendTo($('#tags'));
			 	//console.log(tag.question);
			});

	}

	function tagClick() {
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
	}

	function handleError() {
		alert("Error");
	}
	return {
		getAllTags: getAllTags
	}

})();
