var UserController = (function () {
    function registerUser(username, email, pass1, pass2) {
        // checks username exists
        checkPasswords(pass1, pass2);
        
        return UserModule.getUserByUserName(username).success(function (data) {
            if (data.results.length !== 0) {
                throw new Error('User already exist with that username.');
            }
            
            return UserModule.addToDatabase(username, email, pass1).error(function () {
                alert('Cannot create new user.');
                throw new Error('Cannot create new user');
            }).success(function (dbData) {
                // returns new user's session token
                // console.log(dbData);
                alert('Successfully registered!');
                
                // set dedautl user avatar:
                UserModule.getDefaultSettings().success(function (defaultData) {
                    // console.log(defaultData.defaultAvatar);
                    UserController.editUserData(dbData.objectId, dbData.sessionToken, 'avatar', defaultData.defaultAvatar);
                });
            });
        }).error(function () {
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
    
    function loginUser(username, password) {
        if (!username) {
            throw new Error('Username cannot be empty');
        }
        
        if (!password) {
            throw new Error('Password cannot be empty');
        }
        
        return UserModule.login(username, password).success(function () {
            
        }).error(function () {
            
        });
    }
    
    function editUserData(userId, sessionToken, columnToChange, newContent) {
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
        
        return UserModule.editData(userId, sessionToken, columnToChange, newContent).error(function () {
            throw new Error('Cannot edit user data: ' + columnToChange);
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
        editUserData: editUserData,
        getDefaultUser: getDefaultUser,
        uploadFile: uploadFile,
    }
}());