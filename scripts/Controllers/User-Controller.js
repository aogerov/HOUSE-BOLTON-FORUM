'use strict';
var UserController = (function () {
    function registerUser(username, email, pass1, pass2) {
        // checks username exists
        checkPasswords(pass1, pass2);
        
        return UserModule.getUserByUserName(username).success(function (data) {
            if (data.results.length !== 0) {
                alert('User already exist with that username.');
                throw new Error('User already exist with that username.');
            }
            
            // add new user to DB.
            return UserModule.addToDatabase(username, email, pass1).success(function (dbData) {
                alert('Successfully registered!');
                
                // set default user avatar:
                UserModule.getDefaultSettings().success(function (defaultData) {
                    UserController.editUserSingleColumn(dbData.objectId, dbData.sessionToken, 'avatar', defaultData.defaultAvatar);
                });
                
                // sign-in registered user:
                UserController.loginUser(username, pass1);
            }).error(function () {
                alert('Cannot create new user. Try again.');
                throw new Error('Cannot create new user. Try again.');
            });
        }).error(function () {
            alert('Cannot connect to DB.');
            throw new Error('Cannot connect to DB.');
        });
    }
    
    function checkValidEmail(email) {
        // TODO: imlement email validation
    }
    
    function checkPasswords(pass1, pass2) {
        if (!pass1) {
            throw new Error('Password cannot be empty or white space(s)');
        }
        
        if (!pass2) {
            throw new Error('Password cannot be empty or white space(s)');
        }
        
        if (pass1 !== pass2) {
            throw new Error('Password is not the same!');
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
            //console.log(loggedUser);
            if (getSessionLoggedUser() === null) {
                setSessionLoggUser(loggedUser);
            } else if (getSessionLoggedUser().sessionToken !== loggedUser.sessionToken) {
                setSessionLoggUser(loggedUser);
            }

            UserView.userProfileView(loggedUser, true);
            // UserView.logoutView();
            UserView.showAndHideLoginLogoutRegisterIfUserIsLogged(true, loggedUser.objectId, loggedUser.username);
        });
    }
    
    function loggoutUser() {
        if (getSessionLoggedUser() !== null) {
            sessionStorage.removeItem('loggedUser');
            UserView.showAndHideLoginLogoutRegisterIfUserIsLogged(false);
            
            //sessionStorage.setObject('loggedUser',null);
            UserView.removeUserProfileView();
            alert('Successfuly loggout.');
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
        if (loggedUser === null) {
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
        
        return UserModule.editUserColumn(userId, sessionToken, columnToChange, newContent).error(function () {
            throw new Error('Cannot edit user data: ' + columnToChange);
        });
    }
    
    function editUser(userId, sessionToken, username, email, password, avatar) {
        UserModule.retrievingCurrentUser(sessionToken).success(function (oldUser) {
            var editedUser = {};
            if (oldUser.email.toLowerCase() !== email.toLocaleLowerCase()) {
                editUser[email] = email;
            }
            
            if (oldUser.password !== password) {
                editUser[password] = password;
            }
            
            
            if (oldUser.avatar.url !== avatar.url) {
                editUser[avatar] = avatar;
            }
            
            
            if (oldUser.username != username) {
                UserModule.getUserByUserName(username).success(function (existingUsername) {
                    if (existingUsername.results.length != 0) {
                        throw new Error('Username already exists.');
                    } else {
                        UserModule.editUser(editedUser);
                    }
                }).error(function () {
                    alert('Cannot edit username.');
                    throw new Error('Cannot edit username.');
                });
            }
            
            UserModule.editUser(editedUser).success(function () {
                alert('All data was saved.');
            }).error(function () {
                throw new Error('Cannot save new settings.');
            });

        }).error(function () {
            throw new Error('Invalid user ID.');
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
        loggoutUser: loggoutUser,
        isUserOwnsProfile: visualizeUserProfile,
        editUserSingleColumn: editUserSingleColumn,
        editUser: editUser,
        getDefaultUser: getDefaultUser,
        uploadFile: uploadFile,
        checkIsUserLoggedIn: checkIsUserLoggedIn
    }
}());