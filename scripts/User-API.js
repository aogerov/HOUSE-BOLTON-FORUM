'use strict';

var UserModule = (function () {
    function UserModule() {

    }

    var RegisterUser = (function () {
        function RegisterUser(userName, email, pass1, pass2) {
            this.isUserNameExists(userName);
            this.checkPasswords(pass1, pass2);
            this.AddToDB(userName, email, pass1);
        }

        RegisterUser.prototype.isUserNameExists = function (username) {
            console.log(username);
            var isExistingUser = false;
            $.ajax({
                method: 'GET',
                headers: {
                    'X-Parse-Application-Id': parseConstants.PARSE_APPLICATION_ID,
                    'X-Parse-REST-API-Key': parseConstants.PARSE_REST_API_KEY
                },
                url: 'https://api.parse.com/1/users',
            }).success(function (data) {

                for (var u in data.results) {
                    var user = data.results[u];
                    if (user.username.toString().toLowerCase() === username.toString().toLowerCase()) {
                        isExistingUser = true;
                        $('#userNameInput').focus().css('background-color', 'red');
                        throw new Error('Username is taken');
                    }
                }

                $('#userNameInput').focus().css('background-color', 'white');
                //alert('No such user!!');
            }).error(function () {
                alert('Cannot load users.');
            });
        }

        RegisterUser.prototype.checkValidEmail = function (email) {
            // TODO: imlement email validation
        }

        RegisterUser.prototype.checkPasswords = function (pass1, pass2) {
            if (!pass1) {
                $('#password1Input').focus().css('background-color', 'red');
                throw new Error('Password cannot be empty or white space(s)');
            }

            if (!pass2) {
                $('#password2Input').focus().css('background-color', 'red');
                throw new Error('Password cannot be empty or white space(s)');
            }

            if (pass1 !== pass2) {
                // may put password length demand
                $('#password2Input').focus().css('background-color', 'red');
                throw new Error('Password is not the same!');
            }

            $('#password1Input').focus().css('background-color', 'white');
            $('#password2Input').focus().css('background-color', 'white');
        }

        RegisterUser.prototype.AddToDB = function (username, email, pass1) {
            $.ajax({
                type: "POST",
                beforeSend: function (request) {
                    request.setRequestHeader('X-Parse-Application-Id', parseConstants.PARSE_APPLICATION_ID);
                    request.setRequestHeader('X-Parse-REST-API-Key', parseConstants.PARSE_REST_API_KEY);
                },
                // NOT WORKING FOR POST METHOD
                //headers: {
                //    'X-Parse-Application-Id': PARSE_APP_ID,
                //    'X-Parse-REST-API-Key': PARSE_REST_API_KEY
                //},
                url: "https://api.parse.com/1/users",
                data: JSON.stringify({ username: username, password: pass1, email: email, rating: 0 }),
                contentType: 'application/json',
                dataType: 'json'
            }).error(function () {
                alert('Cannot create new user.');
            }).success(function (data) {
                alert('Successfully registered!');

                // returns new user's session token
                console.log(data);
            });
        }

        return RegisterUser;
    }());

    var LoginUser = (function () {
        function LoginUser(username, pass) {
            this.Login(username, pass);
        }

        LoginUser.prototype.Login = function (username, password) {
            $.ajax({
                type: "GET",
                beforeSend: function (request) {
                    request.setRequestHeader('X-Parse-Application-Id', parseConstants.PARSE_APPLICATION_ID);
                    request.setRequestHeader('X-Parse-REST-API-Key', parseConstants.PARSE_REST_API_KEY);
                },
                url: "https://api.parse.com/1/login" + '?username=' + encodeURI(username) + '&password=' + encodeURI(password),
                contentType: 'application/json',
                dataType: 'json'
            }).error(function () {
                alert('Cannot login with this username and password.');
            }).success(function (data) {
                alert('Successfully logged-in!');

                // returns new user's session token
                // console.log(data);
            });
        }

        return LoginUser;
    }());

    UserModule.prototype.getUserById = function (userId) {
        var user;
        $.ajax({
            type: "GET",
            beforeSend: function (request) {
                request.setRequestHeader('X-Parse-Application-Id', parseConstants.PARSE_APPLICATION_ID);
                request.setRequestHeader('X-Parse-REST-API-Key', parseConstants.PARSE_REST_API_KEY);
            },
            url: "https://api.parse.com/1/users/" + encodeURI(userId),
            contentType: 'application/json',
            dataType: 'json',
            async: false,
        }).error(function () {
            alert('Cannot get user with that ID.');
            user = {};
            return;
        }).success(function (data) {
            alert('Successfully got user by ID.');
            // console.log(data);
            user = data;
        });

        return user;
    }

    return {
        Register: RegisterUser,
        Login: LoginUser,
        GetUserById: UserModule.prototype.getUserById
    };
}());

$('#registerButton').click('click', reg);

function reg() {
    var newUser = new UserModule.Register($('#userNameInput').val(), $('#emailInput').val(), $('#password1Input').val(), $('#password2Input').val());
}

$('#loginButton').click('click', login);
function login() {
    var loggedUser = new UserModule.Login($('#userNameLoginInput').val(), $('#passwordLoginInput').val());
}

// for TEST add to loginButton to check userByID 
$('#loginButton').click('click', getUserByID);
function getUserByID() {
    var gottenUserById = new UserModule.GetUserById('qZ047wDesX');
    console.log(gottenUserById);
}