// this is going to initialize the user and assign it per device
const uuid = require('uuid');

module.exports = {
    // we are going to create a function that will assign a uuid to the user and save it in a file to check the name and uuid
    SaveUUID: function (userobj) {
        // save the user object to a file
        var user = userobj;
        // now whenever we save the uuid we are going to assign it with the name so we know it is the same user
        user.uuid = uuid.v4();
        // cache this in the browser so we can check it
        const storage = window.localStorage;
        // save the uuid in the browser
        storage.setItem(user.name, user.uuid);
        return user;
    },
    // make a assign UUID function for each name and save it in a file so we can check the name and uuid
    AssignUUID: function (userobj, uuid) {
        var user = userobj;
        user.uuid = uuid;
        user.isLoaded = true;
        return user;
    },
    // this is going to initialize the user and assign it per device
    UserObj: function (name, age, loaded) {
        var user = {
            name: name,
            age: age,
            DMs: new Map(),
            isLoaded: loaded,
            isEncrypted: false,
        };
        // if passed through the function then assign it
        if (name !== undefined) {
            user.name = name;
        } 
        if (age !== undefined) {
            user.age = age;
        }
        if (loaded !== undefined) {
            user.isLoaded = loaded;
        }
        return user;
    }
}
