var TagView = (function() {
	
	function visualizeTags(tag) {
		var tag = $('<a href = #>').attr('class', 'tag-event').text(tag.name);
			tag.attr("data-id", tag.objectId);
			tag.data('tag', tag);
			tag.css({"margin" : "5px"});
			//$('tag-event').css({"font-size": 16 + tag.visited + "px"});
			return tag;
	}
	
	

	return {
		visualizeTags: visualizeTags	
	}

})();