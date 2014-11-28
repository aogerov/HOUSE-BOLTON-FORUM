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
			method: "POST",
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

    function getCategoryByID(categoryID) {
        return $.ajax({
            method: "GET",
            headers: {
                "X-Parse-Application-Id": parseConstants.PARSE_APPLICATION_ID,
                "X-Parse-REST-API-Key": parseConstants.PARSE_REST_API_KEY
            },
            url: "https://api.parse.com/1/classes/Category/" + categoryID
        });
    }
    
	function deleteCategory(categoryId) {
		return $.ajax({
			method: "DELETE",
			headers: {
				"X-Parse-Application-Id": parseConstants.PARSE_APPLICATION_ID,
				"X-Parse-REST-API-Key": parseConstants.PARSE_REST_API_KEY
			},
			url: "https://api.parse.com/1/classes/Category/" + categoryId
		});
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
		checkIfCategoryExits: checkIfCategoryExits,
		getCategoryByID: getCategoryByID
	}
})();