var CategoryView = (function() {
	function visualizeCategories() {
		var categories = CategoriesModule.getAllCategories();
		categories.success(categoriesLoaded);
	}

	function categoriesLoaded(data) {
		var categories = data.results;
		var $categories = $('#categories-sidebar .content');

		$categories.html('');
		$('<ul>').appendTo($categories);
		$.each(categories, function(_, category) {
			$('<a>').attr({'href': 'javascript:;', 'data-catid': category.objectId}).text(category.name).appendTo($('<li>').appendTo($categories));
		});
	}

	return {
		visualizeCategories: visualizeCategories
	}
}());