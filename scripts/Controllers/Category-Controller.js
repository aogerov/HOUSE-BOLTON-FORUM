var categoryController = (function () {
	function getAndVisualizeCategories() {
		var ul = $('<ul>');
		CategoriesModule
			.getAllCategories()
			.success(function(data) {
				$.each(data.results, function (_, category) {
					var li = CategoryView.viewListItemCategory(category);
					li.appendTo(ul);
				});
			});
		$(ul).appendTo('aside#categories');
	}

	function getAndVisualizeSingleCategory(categoryId) {
        var mainSection = $('main');
        mainSection.text('');

		CategoriesModule
			.getCategoryByID(categoryId)
			.success(function (data) {
				var h1 = CategoryView.viewSingleCategory(data);
				$(h1).prependTo('main');
			});
	}

	return {
		getAndVisualizeCategories: getAndVisualizeCategories,
		getAndVisualizeSingleCategory: getAndVisualizeSingleCategory
	}
})();