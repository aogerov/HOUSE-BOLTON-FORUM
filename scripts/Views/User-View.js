'use strict';

var UserView = (function () {
    function registerView() {
        function reg() {
            // cannot catch thronw errors ?!
            UserController.registerUser($('#userNameInput').val(), $('#emailInput').val(), $('#password1Input').val(), $('#password2Input').val());
        }
        
        var parentContainer = $('main');
        parentContainer.children().remove();
        
        // check if register container exists in DOM
        var existingRegisterContainer = $('#registerSection');
        if (existingRegisterContainer.length == 0) {
            var registerContainer = $('<article>')
                .attr('id', 'registerSection')
                .attr('class', 'small-question')
                .appendTo(parentContainer);
            
            $('<h2>')
                .text('Registration:')
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
    
    function loginView() {
        function login() {
            UserController.loginUser($('#userNameLoginInput').val(), $('#passwordLoginInput').val()).error(function () {
                $('#loginMessageLabel')
                        .text('Cannot login with this username and password.')
                        .css('color', 'red').css('display', 'inline-block')
                        .fadeOut(5000);
            });
        }
        
        var parentContainer = $('main');
        parentContainer.children().remove();
        
        
        var existingLoginContainer = $('#loginSection');
        if (existingLoginContainer.length == 0) {
            var loginContainer = $('<article>')
                .attr('id', 'loginSection')
                .attr('class', 'small-question')
                .appendTo(parentContainer);
            $('<h2>')
                .text('Login:')
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
                .attr('value', 'Login')
                .appendTo(loginContainer)
                .click('click', login);
            $('<label>')
                .text('')
                .attr('id', 'loginMessageLabel')
                .appendTo(loginContainer);
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
        var parentContainer = $('body main');
        parentContainer
                .children()
                .remove();
        
        var existingUserProfileContainer = $('#userProfileSection');
        existingUserProfileContainer.remove();
        
        var userProfileContainer = $('<article>')
                .attr('id', 'userProfileSection')
                .appendTo(parentContainer);
        
        $('<h2>')
                .text(user.username + ' profile:')
                .attr('id', 'userProfileSectionHeading')
                .appendTo(userProfileContainer);
        
        var profileImageContainer = $('<div>')
                .attr('id', 'profileImageContainer')
                .appendTo(userProfileContainer);
        
        var avatarImg = $('<img>')
                .attr('id', 'profileImage')
                .attr('alt', user.username)
                .appendTo(profileImageContainer);
        
        var changeTag = 'label';
        if (isYours) {
            changeTag = 'input';
        }
        
        var profileInfoContainer = $('<div>')
                .attr('id', 'profileInfoContainer')
                .appendTo(userProfileContainer);
        $('<h4>')
                .attr('id', 'personalInfoHeading')
                .text('Personal info:')
                .appendTo(profileInfoContainer);
        $('<label>')
                .text('Username:')
                .attr('id', 'userNameProfileLabel')
                .appendTo(profileInfoContainer);
        $('<' + changeTag + '>')
                .attr('id', 'userNameProfileInput')
                .text(user.username)
                .attr('type', 'text')
                .attr('placeholder', 'username...')
                .attr('value', user.username)
                .appendTo(profileInfoContainer);
        $('<label>')
                .text('Email:')
                .attr('id', 'emailProfileLabel')
                .appendTo(profileInfoContainer);
        $('<' + changeTag + '>')
                .attr('id', 'emailProfileInput')
                .text(user.email)
                .attr('type', 'email')
                .attr('placeholder', 'email...')
                .attr('value', user.email)
                .appendTo(profileInfoContainer);
        $('<label>')
                .text('Ranking:' + user.ranking)
                .attr('id', 'rankingProfileLabel')
                .appendTo(profileInfoContainer);
        
        
        
        if (!user.avatar) {
            console.log('Missing avatar');
            // default Avatar is set on registration, but if something happened, and there is no avatar, default will be loaded again.
            UserController.getDefaultUser().success(function (data) {
                avatarImg.attr('src', data.defaultAvatar.url);
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
                .click(user, changeAvatar)
                .appendTo(profileImageContainer);
            
            // TODO: add user role label
            //$('<label>').text('Rank:' + userRole.name).attr('id', 'profileImage').attr('src', user.avatar).appendTo(userProfileContainer);
            
            $('<input>')
                .attr('id', 'saveChangesButton')
                .attr('type', 'button')
                .attr('value', 'Save')
                .appendTo(userProfileContainer)
                .click('click', saveChanges);
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
                    $('#profileImage').attr('src', upploadedFile.url).attr('alt', user.username).attr('data-filename', JSON.stringify(upploadedFile));
                })
                .error(function () {
                    alert('Cannot load that image.');
                });
            });
        }
        
        function saveChanges() {
            var uploadedFile = JSON.parse($('#profileImage').attr('data-filename'));
            console.log(uploadedFile);
            //console.log(user);
            if (uploadedFile) {
                var editedAvatar = UserController.editUserSingleColumn(user.objectId, user.sessionToken, 'avatar', uploadedFile);
                console.log(editedAvatar);
            }

            // TODO : apply other changes
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
    
    //function logoutView() {
    //    var parentContainer = $('#parentContainer');
    //    // check if login container exists in DOM
    //    var loggoutButton = $('#loggout');
    //    if (loggoutButton.length === 0) {
    //        $('<button>')
    //            .attr('id', 'loggout')
    //            .text('Loggout')
    //            .click('click', function () {
    //            UserController.loggoutUser();
    //            $(this).remove();
    //        }).prependTo(parentContainer);
    //    }
    //}
    
    function showAndHideLoginLogoutRegisterIfUserIsLogged(isLogged, id, name) {
        var navUl = $('body header nav ul');
        var registerLi = $('#registerLi');
        var loginLi = $('#loginLi');
        var logoutLi = $('#logoutLi');
        var userProfileLi = $('#userProfileLi');
        
        if (isLogged) {
            
            if (loginLi.length !== 0) {
                loginLi.remove();
            }
            
            if (registerLi.length !== 0) {
                registerLi.remove();
            }
            
            if (logoutLi.length === 0) {
                logoutLi = $('<li>').attr('id', 'logoutLi').appendTo(navUl);
            }
            
            $('<a>')
            .attr('href', "#/logout/")
            .text('Logout')
            .attr('id', 'logoutAtag')
            .appendTo(logoutLi);
            
            if (userProfileLi.length === 0) {
                userProfileLi = $('<li>').attr('id', 'userProfileLi').appendTo(navUl);
            }
            
            $('<a>')
            .attr('href', "#/user/" + id)
            .text(name + "' profile")
            .attr('id', 'userProfile')
            .appendTo(userProfileLi);

        } else {
            if (logoutLi.length !== 0) {
                logoutLi.remove();
            }
            
            if (userProfileLi.length !== 0) {
                userProfileLi.remove();
            }
            
            if (loginLi.length === 0) {
                loginLi = $('<li>').attr('id', 'loginLi').appendTo(navUl);
            }
            
            $('<a>')
            .attr('href', "#/login/")
            .text('Login')
            .attr('id', 'loginAtag')
            .appendTo(loginLi);
            
            if (registerLi.length === 0) {
                registerLi = $('<li>').attr('id', 'registerLi').appendTo(navUl);
            }
            
            $('<a>')
            .attr('href', "#/register/")
            .text('Register')
            .attr('id', 'registerAtag')
            .css('display', 'inline-block')
            .appendTo(registerLi);
        }


    }
    
    return {
        registerView: registerView,
        removeRegisterView: removeRegisterView,
        loginView: loginView,
        //logoutView: logoutView,
        removeLoginView: removeLoginView,
        userProfileView: userProfileView,
        removeUserProfileView: removeUserProfileView,
        showAndHideLoginLogoutRegisterIfUserIsLogged: showAndHideLoginLogoutRegisterIfUserIsLogged
    }
}());


