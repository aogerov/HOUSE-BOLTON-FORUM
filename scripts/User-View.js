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
        
        //function getUserById() {
        //    var gottenUserById = new UserModule.GetUserById('qZ047wDesX');
        //    console.log('Welcome ' + gottenUserById.username);
        //}
        
        function login() {
            var sameParentContainer = parentContainer;
            var loggedUser = new UserModule.Login($('#userNameLoginInput').val(), $('#passwordLoginInput').val())
            .error(function () {
                // alert('Cannot login with this username and password.');
                $('#loginMessageLabel').text('Cannot login with this username and password.').css('color', 'red').css('display', 'inline-block').fadeOut(5000);
            }).success(function (data) {
                // alert('Successfully logged-in!');
                $('#loginMessageLabel').text('Successfully logged-in!').css('color', 'greenyellow').css('display', 'inline-block').fadeOut(2000);
                // console.log(data);
                userProfileView(sameParentContainer, data);
                
                //// DELETE NOT SAVED IMAGE (if it's not default)
                //if (data.avatar.url !== $('#imageProfileLabel').attr('data-[filename]')) {
                    
                //}

                // returns new user's session token
                // console.log(data);
            });;;

        }
        
        $('#loginButton').click('click', login);
        
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
    
    function userProfileView(parentContainer, user) {
        // check if login container exists in DOM
        //new UserModule.GetDefaultUser().success(function(data) {
        //    console.log(data.defaultAvatar);
        //});
        
        // var userRole = new UserModule.GetRoleByUserId(user.objectId);

        var existingUserProfileContainer = $('#userProfileSection');
        if (existingUserProfileContainer.length == 0) {
            var userProfileContainer = $('<div>').attr('id', 'userProfileSection').appendTo(parentContainer);
            $('<label>').text('Username:').attr('id', 'userNameProfileLabel').appendTo(userProfileContainer);
            $('<input>').attr('id', 'userNameProfileInput').attr('type', 'text').attr('placeholder', 'username...').attr('value', user.username).appendTo(userProfileContainer);
            $('<label>').text('Email:').attr('id', 'emailProfileLabel').appendTo(userProfileContainer);
            $('<input>').attr('id', 'emailProfileInput').attr('type', 'email').attr('placeholder', 'email...').attr('value', user.email).appendTo(userProfileContainer);
            //$('<label>').text('Ranking:' + user.ranking).attr('id', 'rankingProfileLabel').appendTo(userProfileContainer);
            if (!user.avatar) {
                var defaultUser = new UserModule.GetDefaultUser()
                .success(function (data) {
                    $('<img>').attr('id', 'imageProfileLabel').attr('src', data.defaultAvatar.url).attr('alt', user.username).appendTo(userProfileContainer);
                    // console.log(data);
                }).error(function () {
                    $('<img>').attr('id', 'imageProfileLabel').attr('alt', user.username).appendTo(userProfileContainer);
                });
            } else {
                $('<img>').attr('id', 'imageProfileLabel').attr('src', user.avatar.url).attr('alt', user.username).appendTo(userProfileContainer);
            }
            
            $('<input>')
                .attr('id', 'userProfileChangeAvatarButton')
                .attr('type', 'file')
                .attr('value', 'Change avatar')
                .attr('accept', 'image/*')
                .appendTo(userProfileContainer)
                .click(user, changeAvatar);
            
            //$('<label>').text('Rank:' + userRole.name).attr('id', 'imageProfileLabel').attr('src', user.avatar).appendTo(userProfileContainer);
            
            
            $('<input>')
                .attr('id', 'saveChangesButton')
                .attr('type', 'button')
                .attr('value', 'Save')
                .appendTo(userProfileContainer)
                .click('click', saveChanges);
            $('<label>').text('').attr('id', 'loginMessageLabel').appendTo(userProfileContainer);
        }
        
        function changeAvatar() {
            var file;
            // Set an event listener on the Choose File field.
            $('#userProfileChangeAvatarButton').bind("change", function (e) {
                var files = e.target.files || e.dataTransfer.files;
                // Our file var now holds the selected file
                file = files[0];
                var newAvatar = new UserModule.UploadFile(file)
                .success(function (upploadedFile) {
                    $('#imageProfileLabel').attr('src', upploadedFile.url).attr('alt', user.username).attr('data-filename', JSON.stringify(upploadedFile));
                })
                .error(function () {
                    alert('Cannot load that image.');
                });
            });
        }
        
        function saveChanges() {
            var uploadedFile = JSON.parse($('#imageProfileLabel').attr('data-filename'));
            console.log(uploadedFile);
            console.log(user);
            if (uploadedFile) {
                var editedAvatar = new UserModule.EditUserData(user.objectId, user.sessionToken, 'avatar', uploadedFile);
                console.log(editedAvatar);
            }
        }
    }
    
    
    
    
    
    
    return {
        RegisterView: registerView,
        RemoveRegisterView: removeRegisterView,
        LoginView: loginView,
        RemoveLoginView: removeLoginView,
        UserProfileView: userProfileView,
    }
}());


