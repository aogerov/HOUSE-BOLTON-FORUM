$(function () {
    Sammy('main', function () {
        this.get('#/', function () {
            questionController.getAndVisualizeLastNQuestions(NUMBER_OF_LAST_QUESTIONS_DEFAULT);
        });
        
        this.get('#/view-question/:id', function (context) {
            questionController.getAndVisualizeQuestionByID(this.params['id']);
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