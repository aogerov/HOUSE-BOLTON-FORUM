var categoriesModule = (function() {

	function getAllCategories() {
		$.ajax({
			method: "GET",
				headers: {
				"X-Parse-Application-Id": parseConstants.PARSE_APPLICATION_ID,
				"X-Parse-REST-API-Key": parseConstants.PARSE_REST_API_KEY
			},
			url: "https://api.parse.com/1/classes/Category",
			success: categoriesLoaded,
			error: function(err) {
				throw new Error("Could not load categories");
			}
		});
	}

	function categoriesLoaded(data) {
		var categories = data.results;
		$categories = $('#categories').length == 0 ? $('body').append('<div id="categories"></div>') : $('#categories');

		$.each(categories, function(_, category) {
			$('<h2>').text(category.name).appendTo($categories);
		});
	}

	function addCategory(name) {
		// implying we have userModule.isLoggedIn, until then ->
		userModule = {isLoggedIn: true}

		if (userModule.isLoggedIn) {
			// We may need to add some checking on name later
			$.ajax({
				type: "POST",
				headers: {
					"X-Parse-Application-Id": parseConstants.PARSE_APPLICATION_ID,
					"X-Parse-REST-API-Key": parseConstants.PARSE_REST_API_KEY
				},
				url: "https://api.parse.com/1/Category",
				data: JSON.stringify({name: name}),
				contentType: 'application/json',
				dataType: 'json',
				success: categoryAdded,
				error: handleCategoryAddError
			});
		}
	}

	function categoryAdded(data) {
		alert('Category successfully created!')
	}

	function handleCategoryAddError(error) {
		console.log('Could not add new category: ' + error);
		throw new Error("Could not add new category");
	}

	function deleteCategory(categoryId) {
		if(userModule.isLoggedIn) {
			$.ajax({
				type: "DELETE",
				headers: {
					"X-Parse-Application-Id": parseConstants.PARSE_APPLICATION_ID,
					"X-Parse-REST-API-Key": parseConstants.PARSE_REST_API_KEY
				},
				url: "https://api.parse.com/1/Category/" + categoryId,
				success: categoryDeleted,
				error: handleCategoryDeleteError
			});
		}
	}

	function categoryDeleted(data) {
		alert("Category successfully deleted!");
		console.log(data);
	}

	function handleCategoryDeleteError(err) {
		console.log("Could not delete category!\n" + err);
		throw new Error("Could not delete category");
	}

	return {
		getAllCategories: getAllCategories,
		addCategory: addCategory,
		deleteCategory: deleteCategory
	}
})();