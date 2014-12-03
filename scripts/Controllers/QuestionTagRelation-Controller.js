var QuestionTagRelationController = (function () {
    function getAllTagsByQuestion(questionID) {
        QuestionTagRelationModule.getRelationsByQuestion(questionID).success(function (data) {
            data = data.results;
            var tags = [];
            $.each(data, function (_, relation) {
                $.when(tagModule.getTagById(relation.tag.objectId)).done(function (tagData) {
                    tags.push(tagData.results[0].name);
                });
            });
            return tags;
        });
    }

    return {
        getAllTagsByQuestion: getAllTagsByQuestion
    }
})();