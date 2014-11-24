'use strict';

var UserModule = (function () {
    function UserModule() {
      
    }
    
    var RegisterUser = (function () {
        function RegisterUser(userName, email, pass1, pass2) {
            // checks username exists
            return getUserByUserName(userName)
            .success(function (data) {
                if (data.results.length !== 0) {
                    throw new Error('User already exist with that username.');
                }
                
                checkPasswords(pass1, pass2);
                
                return addToDatabase(userName, email, pass1)
                    .error(function () {
                    alert('Cannot create new user.');
                    throw new Error('Cannot create new user');
                })
                    .success(function (dbData) {
                    alert('Successfully registered!');
                    return dbData;
                    // returns new user's session token
                    // console.log(dbData);
                });
            })
            .error(function () {
                throw new Error('Cannot connect to DB.');
            });
            

        }
        
        function isUserNameExists(username) {
            var isExists;
            getUserByUserName(username)
            .success(function (data) {
                if (data.results.length !== 0) {
                    isExists = true;
                } else {
                    isExists = false;
                }
            }).error(function () {
                throw new Error('Cannot connect to DB.');
            });
            console.log('IN isUserName');
            return isExists;
        }
        
        function getUserByUserName(username) {
            return $.ajax({
                method: 'GET',
                headers: {
                    'X-Parse-Application-Id': parseConstants.PARSE_APPLICATION_ID,
                    'X-Parse-REST-API-Key': parseConstants.PARSE_REST_API_KEY
                },
                url: 'https://api.parse.com/1/users?where={"username":"' + username + '"}',
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
        
        function addToDatabase(username, email, pass1) {
            
            return $.ajax({
                type: "POST",
                //beforeSend: function (request) {
                //    request.setRequestHeader('X-Parse-Application-Id', parseConstants.PARSE_APPLICATION_ID);
                //    request.setRequestHeader('X-Parse-REST-API-Key', parseConstants.PARSE_REST_API_KEY);
                //},
                headers: {
                    'X-Parse-Application-Id': parseConstants.PARSE_APPLICATION_ID,
                    'X-Parse-REST-API-Key': parseConstants.PARSE_REST_API_KEY
                },
                url: "https://api.parse.com/1/users",
                data: JSON.stringify({ username: username, password: pass1, email: email, ranking: 0 }),
                contentType: 'application/json',
                dataType: 'json'
            });
        }
        
        return RegisterUser;
    }());
    
    var LoginUser = (function () {
        function LoginUser(username, pass) {
            return login(username, pass);
            //.error(function () {
            //    alert('Cannot login with this username and password.');
            //}).success(function (data) {
            //    alert('Successfully logged-in!');
            //    // returns new user's session token
            //    // console.log(data);
            //});;
        }
        
        function login(username, password) {
            return $.ajax({
                type: "GET",
                beforeSend: function (request) {
                    request.setRequestHeader('X-Parse-Application-Id', parseConstants.PARSE_APPLICATION_ID);
                    request.setRequestHeader('X-Parse-REST-API-Key', parseConstants.PARSE_REST_API_KEY);
                },
                url: "https://api.parse.com/1/login" + '?username=' + encodeURI(username) + '&password=' + encodeURI(password),
                contentType: 'application/json',
                dataType: 'json'
            });
        }
        
        return LoginUser;
    }());
    
    function getUserById(userId) {
        return $.ajax({
            type: "GET",
            beforeSend: function (request) {
                request.setRequestHeader('X-Parse-Application-Id', parseConstants.PARSE_APPLICATION_ID);
                request.setRequestHeader('X-Parse-REST-API-Key', parseConstants.PARSE_REST_API_KEY);
            },
            url: "https://api.parse.com/1/users/" + encodeURI(userId),
            contentType: 'application/json',
            dataType: 'json',
        }).error(function () {
            alert('Cannot get user with that ID.');
        }).success(function (data) {
            // alert('Successfully got user by ID.');
            // console.log(data);
        });
    }
    
    function editUserData(userId, sessionToken, columnToChange, newContent) {
        if (columnToChange === 'username') {
            throw new Error('Username cannot be changed');
        }
        //if (columnToChange === 'ranking') {
        //    throw new Error('Ranking cannot be changed');
        //}
        if (columnToChange === 'ACL') {
            throw new Error('Access control cannot be changed');
        }
        
        //var x = new Object();
        //var propertyName = columnToChange;
        //var propertyValue = newContent;
        //eval("x." + propertyName + "='" + propertyValue + "'");
        
        var newJsonString;
        if (typeof (newContent) === 'string') {
            newJsonString = '{"' + columnToChange + '":"' + newContent + '"}';
        } else {
            if (newContent.url) {
                newContent.__type = 'File';
                newContent = { avatar: newContent };
                // newJsonString = JSON.stringify(newContent);
            } else if (typeof (newContent) === 'number') {
                newJsonString = '{"' + columnToChange + '":' + newContent + '}';
                newContent = JSON.parse(newJsonString);
            }
        }
        
        // var obj = JSON.parse(newJsonString);
        // console.log(obj);
        console.log(newContent);
        
        return $.ajax({
            method: "PUT",
            beforeSend: function (request) {
                request.setRequestHeader('X-Parse-Application-Id', parseConstants.PARSE_APPLICATION_ID);
                request.setRequestHeader('X-Parse-REST-API-Key', parseConstants.PARSE_REST_API_KEY);
                request.setRequestHeader('X-Parse-Session-Token', sessionToken);
            },
            
            data: JSON.stringify(newContent),
            contentType: 'application/json',
            url: "https://api.parse.com/1/users/" + userId
        });
    }
    
    function getRoleByUserId(userId) {
        return $.ajax({
            type: "GET",
            beforeSend: function (request) {
                request.setRequestHeader('X-Parse-Application-Id', parseConstants.PARSE_APPLICATION_ID);
                request.setRequestHeader('X-Parse-REST-API-Key', parseConstants.PARSE_REST_API_KEY);
            },
            url: "https://api.parse.com/1/roles/" + encodeURI(userId),
            contentType: 'application/json',
            dataType: 'json',
        });
        //.error(function () {
        //    alert('Cannot get user with that ID.');
        //}).success(function (data) {
        //    // alert('Successfully got user by ID.');
        //    // console.log(data);
        //});
    }
    
    function getDefaultUser() {
        return $.ajax({
            type: "GET",
            beforeSend: function (request) {
                request.setRequestHeader('X-Parse-Application-Id', parseConstants.PARSE_APPLICATION_ID);
                request.setRequestHeader('X-Parse-REST-API-Key', parseConstants.PARSE_REST_API_KEY);
            },
            url: "https://api.parse.com/1/classes/DefaultUser/m9s8Nzs8yW",
            contentType: 'application/json',
            dataType: 'json',
        });
    }
    
    function uploadFile(file) {
        
        // This function is called when the user clicks on Upload to Parse. It will create the REST API request to upload this image to Parse.
        var serverUrl = 'https://api.parse.com/1/files/' + file.name;
        
        return $.ajax({
            type: "POST",
            beforeSend: function (request) {
                request.setRequestHeader("X-Parse-Application-Id", parseConstants.PARSE_APPLICATION_ID);
                request.setRequestHeader("X-Parse-REST-API-Key", parseConstants.PARSE_REST_API_KEY);
                request.setRequestHeader("Content-Type", file.type);
            },
            url: serverUrl,
            data: file,
            processData: false,
            contentType: false,
            success: function (data) {
                console.log("File available at: " + data.url);
                // alert("File available at: " + data.url);
            },
            error: function (data) {
                var obj = jQuery.parseJSON(data);
                alert(obj.error);
            }
        });
    }
    
    
    function deleteUploadedFile(fileName) {
        var serverUrl = 'https://api.parse.com/1/files/' + fileName;
        
        return $.ajax({
            type: "DELETE",
            beforeSend: function (request) {
                request.setRequestHeader("X-Parse-Application-Id", parseConstants.PARSE_APPLICATION_ID);
                request.setRequestHeader("X-Parse-Master-Key", 'N4JvXVmG7tyNEIrUKc4H1MPU0MLIAdpRzdnicAlI');
            },
            url: serverUrl,
            success: function (data) {
                console.log("File deleted!");
                // alert("File available at: " + data.url);
            },
            error: function (data) {
                var obj = jQuery.parseJSON(data);
                alert(obj.error);
            }
        });
    }
    return {
        Register: RegisterUser,
        Login: LoginUser,
        GetUserById: getUserById,
        GetRoleByUserId : getRoleByUserId,
        EditUserData: editUserData,
        GetDefaultUser: getDefaultUser,
        UploadFile: uploadFile,
        DeleteUploadedFile: deleteUploadedFile
    };
}());
