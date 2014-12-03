var CategoryView = (function() {
	
	function viewSingleCategory(category) {
		var h1 = $('<h1>');
		h1.data('id', category.objectId).text(category.name);

		return $(h1);
	}

	function viewListItemCategory(category) {
		var li = $('<li>');
		li.append($('<a>')
			.data('id', category.objectId)
			.attr('href', '#/category/' + category.objectId)
			.text(category.name)
		);
		return $(li);
	}

	return {
		viewSingleCategory: viewSingleCategory,
		viewListItemCategory: viewListItemCategory
	}
}());