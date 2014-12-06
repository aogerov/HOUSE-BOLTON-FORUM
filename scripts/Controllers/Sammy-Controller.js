$(function () {
    Sammy('main', function () {
        var mainSelector = $('main');


        this.get('#/', function () {
            mainSelector.text('');
            questionController.getAndVisualizeLastNQuestions(NUMBER_OF_LAST_QUESTIONS_DEFAULT, mainSelector);
        });
        
        this.get('#/view/question/:id', function (context) {
            mainSelector.text('');
            questionController.getAndVisualizeQuestionByID(this.params['id'], mainSelector);
        });
        this.get('#/add/question', function (context) {
            mainSelector.text('');
            questionController.VisualizeAddQuestion(mainSelector);
        });
        this.get('#/view/tag/:id', function (context) {
            mainSelector.text('');
            TagsController.visualizeQuestions(this.params['id'], mainSelector);
        });

        this.get('#/category/:id', function (context) {
            mainSelector.text('');
            categoryController.getAndVisualizeSingleCategory(this.params['id'], mainSelector);
        });

        this.get('#/user/:id', function (context) {
            UserController.isUserOwnsProfile(this.params['id']);
        });
        
        this.get('#/register/', function (context) {
            UserView.registerView();
        });
        
        this.get('#/login/', function (context) {
            UserView.loginView();
        });
        
        this.get('#/logout/', function (context) {
            UserController.loggoutUser();
            // load main page here..
            this.redirect('#/');
        });
    }).run('#/');
});