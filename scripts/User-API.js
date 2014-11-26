'use strict';

var UserModule = (function () {
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
    
    function addUserToDatabase(username, email, pass1) {
        return $.ajax({
            type: "POST",
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
    
    function editData(userId, sessionToken, columnToChange, newContent) {
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
    }
    
    function getDefaultSettings() {
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
    
    function uploadNewFile(file) {
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
        login: login,
        getUserById: getUserById,
        getUserByUserName: getUserByUserName,
        getRoleByUserId : getRoleByUserId,
        addToDatabase: addUserToDatabase,
        editData: editData,
        getDefaultSettings: getDefaultSettings,
        uploadNewFile: uploadNewFile,
        deleteUploadedFile: deleteUploadedFile
    };
}());
