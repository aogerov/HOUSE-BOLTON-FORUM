var UserView = (function () {
    function registerView(parentContainer) {
        // check if register container exists in DOM
        var existingRegisterContainer = $('#registerSection');
        if (existingRegisterContainer.length == 0) {
            function reg() {
                var newUser = new UserModule.Register($('#userNameInput').val(), $('#emailInput').val(), $('#password1Input').val(), $('#password2Input').val());
                newUser.success(function () {
                    console.log('NEW USER:');
                    console.log(newUser);
                });
            }
            
            var registerContainer = $('<div>').attr('id', 'registerSection').appendTo(parentContainer);
            $('<label>').text('Register:').attr('id', 'registerLabel').appendTo(registerContainer);
            $('<input>').attr('id', 'userNameInput').attr('type', 'text').attr('placeholder', 'username...').attr('value', '').appendTo(registerContainer);
            $('<input>').attr('id', 'emailInput').attr('type', 'email').attr('placeholder', 'email...').attr('value', '').appendTo(registerContainer);
            $('<input>').attr('id', 'password1Input').attr('type', 'password').attr('placeholder', 'password...').attr('value', '').appendTo(registerContainer);
            $('<input>').attr('id', 'password2Input').attr('type', 'password').attr('placeholder', 'password again..').attr('value', '').appendTo(registerContainer);
            $('<input>')
            .attr('id', 'registerButton')
            .attr('type', 'button')
            .attr('value', 'Register')
            .appendTo(registerContainer)
            .click('click', reg);
        }
    }
    
    function removeRegisterView() {
        // check if register container exists in DOM
        var existingRegisterContainer = $('#registerSection');
        if (existingRegisterContainer.length !== 0) {
            existingRegisterContainer.remove();
        }
    }
    
    function loginView(parentContainer) {
        
        function getUserById() {
            var gottenUserById = new UserModule.GetUserById('qZ047wDesX');
            console.log('Welcome ' + gottenUserById.username);
        }
        
        $('#loginButton').click('click', login);
        
        function login() {
            var loggedUser = new UserModule.Login($('#userNameLoginInput').val(), $('#passwordLoginInput').val())
            .error(function () {
                // alert('Cannot login with this username and password.');
                $('#loginMessageLabel').text('Cannot login with this username and password.').css('color', 'red').css('display', 'inline-block').fadeOut(5000);
            }).success(function (data) {
                // alert('Successfully logged-in!');
                $('#loginMessageLabel').text('Successfully logged-in!').css('color', 'greenyellow').css('display', 'inline-block').fadeOut(2000);
                // returns new user's session token
                // console.log(data);
            });;;

        }
        
        // check if login container exists in DOM
        var existingLoginContainer = $('#loginSection');
        if (existingLoginContainer.length == 0) {
            var loginContainer = $('<div>').attr('id', 'loginSection').appendTo(parentContainer);
            $('<label>').text('Login:').attr('id', 'loginLabel').appendTo(loginContainer);
            $('<input>').attr('id', 'userNameLoginInput').attr('type', 'text').attr('placeholder', 'username...').attr('value', '').appendTo(loginContainer);
            $('<input>').attr('id', 'passwordLoginInput').attr('type', 'password').attr('placeholder', 'password...').attr('value', '').appendTo(loginContainer);
            $('<input>')
                .attr('id', 'loginButton')
                .attr('type', 'button')
                .attr('value', 'Login')
                .appendTo(loginContainer)
                .click('click', login);
            $('<label>').text('').attr('id', 'loginMessageLabel').appendTo(loginContainer);
        }
    }
    
    function removeLoginView() {
        // check if login container exists in DOM
        var existingLoginContainer = $('#loginSection');
        if (existingLoginContainer.length !== 0) {
            existingLoginContainer.remove();
        }
    }
    
    function userProfileView() {

    }
    
    return {
        RegisterView: registerView,
        RemoveRegisterView: removeRegisterView,
        LoginView: loginView,
        RemoveLoginView: removeLoginView,
        UserProfileView: userProfileView,
    }
}());


