var CategoriesModule = (function() {
	function getAllCategories() {
		return $.ajax({
			method: "GET",
				headers: {
				"X-Parse-Application-Id": parseConstants.PARSE_APPLICATION_ID,
				"X-Parse-REST-API-Key": parseConstants.PARSE_REST_API_KEY
			},
			url: "https://api.parse.com/1/classes/Category"
		});
	}

	function addCategory(name) {
		return $.ajax({
			type: "POST",
			headers: {
				"X-Parse-Application-Id": parseConstants.PARSE_APPLICATION_ID,
				"X-Parse-REST-API-Key": parseConstants.PARSE_REST_API_KEY
			},
			url: "https://api.parse.com/1/classes/Category",
			data: JSON.stringify({name: name}),
			contentType: 'application/json',
			dataType: 'json'
		});
	}

	function categoryAdded(data) {
		alert('Category successfully created!')
	}

	function handleCategoryAddError(error) {
		console.log('Could not add new category: ' + error);
		throw new Error("Could not add new category");
	}

	function deleteCategory(categoryId) {
		return $.ajax({
			type: "DELETE",
			headers: {
				"X-Parse-Application-Id": parseConstants.PARSE_APPLICATION_ID,
				"X-Parse-REST-API-Key": parseConstants.PARSE_REST_API_KEY
			},
			url: "https://api.parse.com/1/classes/Category/" + categoryId
		});
	}

	function categoryDeleted(data) {
		alert("Category successfully deleted!");
		console.log(data);
	}

	function handleCategoryDeleteError(err) {
		console.log("Could not delete category!\n" + err);
		throw new Error("Could not delete category");
	}

	function checkIfCategoryExits(categoryId) {
		var categoryExists = false;
		$.ajax({
			method: "GET",
			headers: {
				"X-Parse-Application-Id": parseConstants.PARSE_APPLICATION_ID,
				"X-Parse-REST-API-Key": parseConstants.PARSE_REST_API_KEY
			},
			url: "https://api.parse.com/1/classes/Category/" + categoryId
		}).success(function() {
			categoryExists = true;
		});

		return categoryExists;
	}

	return {
		getAllCategories: getAllCategories,
		addCategory: addCategory,
		deleteCategory: deleteCategory,
		checkIfCategoryExits: checkIfCategoryExits
	}
})();