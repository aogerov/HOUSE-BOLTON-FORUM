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

	function getAndVisualizeSingleCategory(categoryId, selector) {
		CategoriesModule.getCategoryByID(categoryId)
			.success(function (data) {
				var h1 = CategoryView.viewSingleCategory(data).addClass('category-title');
				$(h1).prependTo(selector);
			});
        questionsModule.getAllQuestionsFromCategory(categoryId).success(function (data) {
            questionController.getAndVisualizeSmallQuestions(data.results, selector);
        })
	}

	function fillCategoriesSelect() {
		if ($('select#category').length == 1) {
			select = $('select#category');
		} else {
			var select = $('<select />');
			select.attr('id', 'category');
			$(select).appnedTo('form');
			select = $(select);
		} 
		$.when(CategoriesModule.getAllCategories()).done(function (data) {
			$.each(data.results, function (_, category) {
				var opt = $('<option/>');
				opt
					.val(category.objectId)
					.text(category.name)
					.appendTo($(select));

			});
		});
	}

	return {
		getAndVisualizeCategories: getAndVisualizeCategories,
		getAndVisualizeSingleCategory: getAndVisualizeSingleCategory,
		fillCategoriesSelect: fillCategoriesSelect
	}
})();