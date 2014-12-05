'use strict';
var UserController = (function () {
    function registerUser(username, email, pass1, pass2) {
        // checks username exists
        checkValidUserName(username);
        checkValidEmail(email);
        checkPasswords(pass1, pass2);
        
        return UserModule.getUserByUserName(username).success(function (data) {
            if (data.results.length !== 0) {
                //alert('User already exist with that username.');
                notyInCustomContainer($('#registerSection'), 'bottomCenter', 'warning', 'Username is taken.', 3);
                throw new Error('User already exist with that username.');
            }
            
            // add new user to DB.
            UserModule.addToDatabase(username, email, pass1).success(function (dbData) {
                // set default user avatar:
                UserModule.getDefaultSettings().success(function (defaultData) {
                    UserController.editUserSingleColumn(dbData.objectId, dbData.sessionToken, 'avatar', defaultData.defaultAvatar);
                });
                
                // sign-in registered user:
                UserController.loginUser(username, pass1);
            }).error(function (error) {
                alert('Cannot create new user. Try again.');
                throw new Error('Cannot create new user. Try again.');
            });
        }).error(function () {
            alert('Cannot connect to DB.');
            throw new Error('Cannot connect to DB.');
        });
    }
    
    function checkValidUserName(username) {
        if (!username) {
            throw new ReferenceError('Username cannot be empty.');
        }
        
        var notValidCharachtersPattern = /[^A-Za-z0-9\_\s\.\-]/;
        if (notValidCharachtersPattern.test(username)) {
            throw new TypeError('Username contains invalid charachters. Only latin letters, digits, space, dot and dash allowed.');
        }
    }
    
    function checkValidEmail(email) {
        if (!email) {
            throw new ReferenceError('Email cannot be empty.');
        }
        
        var validEmailPattern = /([a-zA-Z0-9]+(([._-][a-zA-Z0-9]+)+)?@[a-zA-Z0-9]+(([.-][a-zA-Z0-9]+)+)?[.][a-zA-Z0-9]+)/;
        if (!validEmailPattern.test(email)) {
            throw new TypeError('Invalid email.');
        }
    }
    
    function checkPasswords(pass1, pass2) {
        if (!pass1) {
            throw new ReferenceError('Password cannot be empty or white space(s)');
        }
        
        if (!pass2) {
            throw new ReferenceError('Password cannot be empty or white space(s)');
        }
        
        if (pass1 !== pass2) {
            throw new TypeError('Password is not the same!');
        }
    }
    
    Storage.prototype.setObject = function setObject(key, obj) {
        this.setItem(key, JSON.stringify(obj));
    };
    
    Storage.prototype.getObject = function getObject(key) {
        return JSON.parse(this.getItem(key));
    };
    
    
    function loginUser(username, password) {
        if (!username) {
            throw new Error('Username cannot be empty');
        }
        
        if (!password) {
            throw new Error('Password cannot be empty');
        }
        
        return UserModule.login(username, password).success(function (loggedUser) {
            UserView.removeRegisterView();
            UserView.removeLoginView();
            if (getSessionLoggedUser() === null) {
                setSessionLoggUser(loggedUser);
            } else if (getSessionLoggedUser().sessionToken !== loggedUser.sessionToken) {
                setSessionLoggUser(loggedUser);
            }
            
            window.location = '#/user/' + loggedUser.objectId;
            //UserView.userProfileView(loggedUser, true);
            UserView.showAndHideLoginLogoutRegisterIfUserIsLogged(true, loggedUser.objectId, loggedUser.username);
        });
    }
    
    function loggoutUser() {
        if (getSessionLoggedUser() !== null) {
            sessionStorage.removeItem('loggedUser');
            UserView.showAndHideLoginLogoutRegisterIfUserIsLogged(false);
            UserView.removeUserProfileView();
            UserView.logoutView();
        }
    }
    
    function getSessionLoggedUser() {
        return sessionStorage.getObject('loggedUser');
    }
    
    function setSessionLoggUser(user) {
        sessionStorage.setObject('loggedUser', user);
    }
    
    function checkIsUserLoggedIn() {
        var loggedUser = getSessionLoggedUser();
        if (!loggedUser) {
            UserView.showAndHideLoginLogoutRegisterIfUserIsLogged(false);
        } else {
            UserView.showAndHideLoginLogoutRegisterIfUserIsLogged(true, loggedUser.objectId, loggedUser.username);
        }
    }
    
    function visualizeUserProfile(userId) {
        UserModule.getUserById(userId).success(function (user) {
            if (!getSessionLoggedUser()) {
                UserView.userProfileView(user, false);
            } else {
                var loggedUserToken = getSessionLoggedUser().sessionToken;
                UserModule.retrievingCurrentUser(loggedUserToken).success(function (loggedUser) {
                    if (loggedUser.username !== user.username) {
                        UserView.userProfileView(user, false);
                    } else if (getSessionLoggedUser().sessionToken !== loggedUserToken) {
                        alert('expired session.');
                        UserView.userProfileView(user, false);
                    } else {
                        UserView.userProfileView(user, true);
                    }

                }).error(function () {
                    alert('Cannot connect to DB. Try again.');
                    UserView.userProfileView(user, false);
                });
            }
        }).error(function () {
            alert('Not existing user.');
        });

    }
    
    function editUserSingleColumn(userId, sessionToken, columnToChange, newContent) {
        //var user = getSessionLoggedUser();
        if (columnToChange.toString().toLowerCase() === 'username') {
            throw new Error('Username cannot be changed');
        }
        
        if (columnToChange.toString().toUpperCase() === 'ACL') {
            throw new Error('Access control cannot be changed');
        }
        
        var newJsonString;
        if (typeof (newContent) === 'string') {
            newContent = '{"' + columnToChange + '":"' + newContent + '"}';
        } else {
            if (newContent.url) {
                newContent.__type = 'File';
                newContent = { avatar: newContent };
            } else if (typeof (newContent) === 'number') {
                newJsonString = '{"' + columnToChange + '":' + newContent + '}';
                newContent = JSON.parse(newJsonString);
            }
        }
        
        return UserModule.editUserColumn(userId, sessionToken, columnToChange, newContent)
        .error(function () {
            throw new Error('Cannot edit user data: ' + columnToChange);
        });
    }
    
    function editUser(editedUserId, editorPass, newUserName, newEmail, avatarFile, newCity, newBirthDate, newGender) {
        if (!editedUserId) {
            throw new ReferenceError('Invalid userID.');
        }
        
        if (!editorPass) {
            throw new ReferenceError('You should confirm your password to apply new settings!');
        }
        
        if (!newUserName) {
            throw new ReferenceError('Username cannot be empty.');
        }
        
        if (!newEmail) {
            throw new Error('Email cannot be empty.');
        }
        
        var editedUser = {};
        UserModule.getUserById(editedUserId).success(function (editedUserData) {
            var isNeededLogout = false;
            if (newUserName !== editedUserData.username) {
                editedUser['username'] = newUserName;
                isNeededLogout = true;
            }
            
            if (editedUserData.email.toLowerCase() !== newEmail.toLocaleLowerCase()) {
                editedUser['email'] = newEmail;
            }
            
            if (avatarFile) {
                avatarFile = JSON.parse(avatarFile);
                avatarFile.__type = 'File';
                editedUser['avatar'] = avatarFile;
            }
            
            if (editedUserData.city !== newCity) {
                if (!newCity) {
                    console.log('null set');
                    editedUser['city'] = null;
                } else {
                    console.log('dasdas set');
                    
                    editedUser['city'] = newCity;
                }
            }
            
            newGender = JSON.parse(newGender);
            if (editedUserData.isMale !== newGender) {
                editedUser['isMale'] = newGender;
            }
            
            
            if (Object.keys(editedUser).length) {
                var editor = getSessionLoggedUser();
                UserModule.login(editor.username, editorPass).success(function (editorData) {
                    UserModule.editUser(editedUserId, editorData.sessionToken, editedUser).success(function () {
                        alert('All data was saved.');
                        if (isNeededLogout) {
                            alert('You should login with new username:');
                            loggoutUser();
                            window.location = '#/login/';
                        }

                    }).error(function (error) {
                        throw new Error('Cannot save new settings. ' + JSON.parse(error.responseText).error);
                    });
                }).error(function (error) {
                    throw new Error('Wrong password or you don\'t have permision to edit that user.');
                });
            } else {
                alert('No changes to save.');
            }
        }).error(function () {
            throw new Error('Invalid edited user ID.');
        });
    }
    
    function getDefaultUser() {
        return UserModule.getDefaultSettings();
    }
    
    function uploadFile(file) {
        return UserModule.uploadNewFile(file);
    }
    
    return {
        registerUser: registerUser,
        loginUser: loginUser,
        getLoggedUser: getSessionLoggedUser,
        loggoutUser: loggoutUser,
        isUserOwnsProfile: visualizeUserProfile,
        editUserSingleColumn: editUserSingleColumn,
        editUser: editUser,
        getDefaultUser: getDefaultUser,
        uploadFile: uploadFile,
        checkIsUserLoggedIn: checkIsUserLoggedIn
    }
}());