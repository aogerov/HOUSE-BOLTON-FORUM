var UserView = (function () {
    function registerView(parentContainer) {
        // check if register container exists in DOM
        var existingRegisterContainer = $('#registerSection');
        if (existingRegisterContainer.length == 0) {
            var registerContainer = $('<div>')
                .attr('id', 'registerSection')
                .appendTo(parentContainer);
            $('<label>')
                .text('register:')
                .attr('id', 'registerLabel')
                .appendTo(registerContainer);
            $('<input>')
                .attr('id', 'userNameInput')
                .attr('type', 'text')
                .attr('placeholder', 'username...')
                .attr('value', '')
                .appendTo(registerContainer);
            $('<input>')
                .attr('id', 'emailInput')
                .attr('type', 'email')
                .attr('placeholder', 'email...')
                .attr('value', '')
                .appendTo(registerContainer);
            $('<input>')
                .attr('id', 'password1Input')
                .attr('type', 'password')
                .attr('placeholder', 'password...')
                .attr('value', '')
                .appendTo(registerContainer);
            $('<input>')
                .attr('id', 'password2Input')
                .attr('type', 'password')
                .attr('placeholder', 'password again..')
                .attr('value', '')
                .appendTo(registerContainer);
            $('<input>')
                .attr('id', 'registerButton')
                .attr('type', 'button')
                .attr('value', 'register')
                .appendTo(registerContainer)
                .click('click', reg);
            
            function reg() {
                // cannot catch thronw errors ?!
                UserController.registerUser($('#userNameInput').val(), $('#emailInput').val(), $('#password1Input').val(), $('#password2Input').val());
            }
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
        // check if login container exists in DOM
        if (!parentContainer) {
            parentContainer = $('#parentContainer');
        }

        var existingLoginContainer = $('#loginSection');
        if (existingLoginContainer.length == 0) {
            var loginContainer = $('<div>')
                .attr('id', 'loginSection')
                .appendTo(parentContainer);
            $('<label>')
                .text('login:')
                .attr('id', 'loginLabel')
                .appendTo(loginContainer);
            $('<input>')
                .attr('id', 'userNameLoginInput')
                .attr('type', 'text')
                .attr('placeholder', 'username...')
                .attr('value', '')
                .appendTo(loginContainer);
            $('<input>')
                .attr('id', 'passwordLoginInput')
                .attr('type', 'password')
                .attr('placeholder', 'password...')
                .attr('value', '')
                .appendTo(loginContainer);
            $('<input>')
                .attr('id', 'loginButton')
                .attr('type', 'button')
                .attr('value', 'login')
                .appendTo(loginContainer)
                .click('click', login);
            $('<label>')
                .text('')
                .attr('id', 'loginMessageLabel')
                .appendTo(loginContainer);
        }
        
        function login() {
            UserController.loginUser($('#userNameLoginInput').val(), $('#passwordLoginInput').val())
            .error(function () {
                $('#loginMessageLabel').text('Cannot login with this username and password.').css('color', 'red').css('display', 'inline-block').fadeOut(5000);
            })
            .success(function () {
                $('#loginMessageLabel').text('Successfully logged-in!').css('color', 'greenyellow').css('display', 'inline-block').fadeOut(2000);;
            });;;
        }
    }
    
    function removeLoginView() {
        // check if login container exists in DOM
        var existingLoginContainer = $('#loginSection');
        if (existingLoginContainer.length !== 0) {
            existingLoginContainer.remove();
        }
    }
    
    function userProfileView(user, isYours) {
        var parentContainer = $('#parentContainer');
        var existingUserProfileContainer = $('#userProfileSection');
        existingUserProfileContainer.remove();
        //console.log(isYours);

        //if (existingUserProfileContainer.length == 0) {
            var userProfileContainer = $('<div>')
                .attr('id', 'userProfileSection')
                .appendTo(parentContainer);
            
            var changeTag = 'label';
            if (isYours) {
                changeTag = 'input';
            }
            
            $('<label>')
                .text('Username:')
                .attr('id', 'userNameProfileLabel')
                .appendTo(userProfileContainer);
            $('<' + changeTag + '>')
                .attr('id', 'userNameProfileInput')
                .text(user.username)
                .attr('type', 'text')
                .attr('placeholder', 'username...')
                .attr('value', user.username)
                .appendTo(userProfileContainer);
            $('<label>')
                .text('Email:')
                .attr('id', 'emailProfileLabel')
                .appendTo(userProfileContainer);
            $('<' + changeTag + '>')
                .attr('id', 'emailProfileInput')
                .text(user.email)
                .attr('type', 'email')
                .attr('placeholder', 'email...')
                .attr('value', user.email)
                .appendTo(userProfileContainer);
            $('<label>')
                .text('Ranking:' + user.ranking)
                .attr('id', 'rankingProfileLabel')
                .appendTo(userProfileContainer);
            
            var avatarImg = $('<img>')
                .attr('id', 'imageProfileLabel')
                .attr('alt', user.username)
                .appendTo(userProfileContainer);
            
            if (!user.avatar) {
                console.log('Missing avatar');
                // default Avatar is set on registration, but if something happened, and there is no avatar, default will be loaded again.
                UserController.getDefaultUser().success(function (data) {
                    avatarImg
                        .attr('src', data.defaultAvatar.url);
                    //.appendTo(userProfileContainer);
                }).error(function () {
                    throw Error('Cannot load (default) user avatar.');
                });
            } else {
                avatarImg.attr('src', user.avatar.url);
            }
            
            if (isYours) {
                $('<input>')
                .attr('id', 'userProfileChangeAvatarButton')
                .attr('type', 'file')
                .attr('value', 'Change avatar')
                .attr('accept', 'image/*')
                .appendTo(userProfileContainer)
                .click(user, changeAvatar);
                
                // TODO: add user role label
                //$('<label>').text('Rank:' + userRole.name).attr('id', 'imageProfileLabel').attr('src', user.avatar).appendTo(userProfileContainer);
                
                $('<input>')
                .attr('id', 'saveChangesButton')
                .attr('type', 'button')
                .attr('value', 'Save')
                .appendTo(userProfileContainer)
                .click('click', saveChanges);
                $('<label>')
                .text('')
                .attr('id', 'loginMessageLabel')
                .appendTo(userProfileContainer);
            }
        
        
        function changeAvatar() {
            var file;
            // Set an event listener on the Choose File field.
            $('#userProfileChangeAvatarButton').bind("change", function (e) {
                var files = e.target.files || e.dataTransfer.files;
                // Our file var now holds the selected file
                file = files[0];
                UserController.uploadFile(file)
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
            //console.log(user);
            if (uploadedFile) {
                var editedAvatar = UserController.editUserSingleColumn(user.objectId, user.sessionToken, 'avatar', uploadedFile);
                console.log(editedAvatar);
            }

            //if ($('#emailProfileInput').text()!== $('#emailProfileInput').val()) {
            //    alert('new Email');
            //}

            
        }
    }
    
    function removeUserProfileView() {
        // check if login container exists in DOM
        var existingUserProfileContainer = $('#userProfileSection');
        if (existingUserProfileContainer.length !== 0) {
            existingUserProfileContainer.remove();
        }
    }
    
    function logoutView() {
        var parentContainer = $('#parentContainer');
        // check if login container exists in DOM
        var loggoutButton = $('#loggout');
        if (loggoutButton.length === 0) {
            $('<button>')
                .attr('id', 'loggout')
                .text('Loggout')
                .click('click', function () {
                    UserController.loggoutUser();
                    $(this).remove();
            }).prependTo(parentContainer);
        }
    }
    
    return {
        registerView: registerView,
        removeRegisterView: removeRegisterView,
        loginView: loginView,
        logoutView: logoutView,
        removeLoginView: removeLoginView,
        userProfileView: userProfileView,
        removeUserProfileView: removeUserProfileView,
    }
}());


