var categoriesModule = (function() {

	function getAllCategories() {
		$.ajax({
			method: "GET",
				headers: {
				"X-Parse-Application-Id": parseConstants.PARSE_APPLICATION_ID,
				"X-Parse-REST-API-Key": parseConstants.PARSE_REST_API_KEY
			},
			url: "https://api.parse.com/1/classes/Category",
			success: handleCategories,
			error: function(err) {
				alert(err);
			}
		});
	}

	function handleCategories(data) {
		var categories = data.results;

		if ($('#categories').length == 0) {
			$('body').append('<div id="categories"></div>');
			$categories = $('#categories');
		};

		$.each(categories, function(_, category) {
			$('<h2>').text(category.name).appendTo($categories);
			questionsModule.getAllQuestionsFromCategory(category.objectId);
		});
	}

	return {
		getAllCategories: getAllCategories
	}
})();