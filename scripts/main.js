$(function () {
    //    questionController.getAndVisualizeLastNQuestions(NUMBER_OF_LAST_QUESTIONS_DEFAULT);
    TagsController.getAndVisualizeTags();
    categoryController.getAndVisualizeCategories();
    
    UserController.checkIsUserLoggedIn();
});

function notyTopCenter(type, text, timeInSeconds) {
    var n = noty({
        text        : text,
        type        : type,
        dismissQueue: true,
        layout      : 'topCenter',
        theme       : 'defaultTheme',
        timeout: timeInSeconds * 1000
        //maxVisible  : 10
    });
}

function notyInCustomContainer(container, position, type, text, timeInSeconds) {
    
    // Position:
    // ('top');
    // ('topCenter');
    // ('topLeft');
    // ('topRight');
    // ('center');
    // ('centerLeft');
    // ('centerRight');
    // ('bottom');
    // ('bottomCenter');
    // ('bottomLeft');
    // ('bottomRight');
    
    // Type:
    // ('alert');
    // ('information');
    // ('error');
    // ('warning');
    // ('notification');
    // ('success');

    var n = $(container).noty({
        text: text,
        type: type,
        dismissQueue: true,
        layout: position,
        theme: 'defaultTheme',
        timeout: timeInSeconds * 1000
    });
}
