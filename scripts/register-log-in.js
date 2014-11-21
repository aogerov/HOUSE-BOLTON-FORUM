'use strict';

var ForumApp = (function () {

    var PARSE_APP_ID = 'TEDdEUZz4EKdPoByn5Zch6Mq4jX2b9Bwi60XmZcQ';
    var PARSE_REST_API_KEY = 'uFNll3OexgfW71uKS6o3ovDoOm2OIZZXdNJD1QRt';

    var RegisterUser = (function () {
        function RegisterUser(userName, email, pass1, pass2) {
            this.checkValidUserName(userName);
            this.checkPasswords(pass1, pass2);
            this.AddToDB(userName, email, pass1);
        }

        RegisterUser.prototype.checkValidUserName = function (username) {
            console.log(username);
            var isExistingUser = false;
            $.ajax({
                method: 'GET',
                headers: {
                    'X-Parse-Application-Id': PARSE_APP_ID,
                    'X-Parse-REST-API-Key': PARSE_REST_API_KEY
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
                    request.setRequestHeader('X-Parse-Application-Id', PARSE_APP_ID);
                    request.setRequestHeader('X-Parse-REST-API-Key', PARSE_REST_API_KEY);
                },
                // NOT WORKING FOR POST METHOD
                //headers: {
                //    'X-Parse-Application-Id': PARSE_APP_ID,
                //    'X-Parse-REST-API-Key': PARSE_REST_API_KEY
                //},
                url: "https://api.parse.com/1/users",
                data: JSON.stringify({ username: username, password: pass1, email: email }),
                contentType: 'application/json',
                dataType: 'json'
            }).error(function () {
                alert('Cannot create new user.');
            }).success(function (data) {
                alert('Successfully registered!');
                console.log(data);
            });
        }

        return RegisterUser;
    }());

    return {
        GetAppId: PARSE_APP_ID,
        GetRestApiKey: PARSE_REST_API_KEY,
        Register: RegisterUser
    };
}());

$('#registerButton').click('click', reg);

function reg() {
    var newUser = new ForumApp.Register($('#userNameInput').val(), $('#emailInput').val(), $('#password1Input').val(), $('#password2Input').val());
}