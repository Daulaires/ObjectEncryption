const { notifContents } = require("../../getIds");
const { PushNotification } = require("./notification");
module.exports = {
    usernameHandler: function (username, User, AssignUUID, GetUUID, SetScriptContents, SaveUUID) {
        username.value = username.value.replace(/[^a-zA-Z0-9]/g, "");
        // if username.value === "" then return a notification
        if (username.value === "" || username.value === undefined) {
            PushNotification(notifContents, "You cannot have an empty username or symbols", "red");
            return;
        }
        // if the length of it is not less than 20 then return a notification and if it's length is only 1 then return a notification
        if (username.value.length > 20 || username.value.length <= 1) {
            PushNotification(notifContents, "Your username must be less than 20 characters and more than 1 character", "red");
            return;
        }

        const storage = window.localStorage;

        if (storage.getItem(username.value)) {
            User.name = username.value;
            AssignUUID(User, storage.getItem(User.name));
            SetScriptContents(User.name, "name");
            SetScriptContents(GetUUID(User.name), "ScriptContents2");
        } 
        else {
            User.name = username.value;
            AssignUUID(User, GetUUID(User.name));
            SetScriptContents(username.value, "name");
            SetScriptContents(User.uuid, "ScriptContents2");
            SaveUUID(User);
        }
        username.style.display = "none";
    }
};
