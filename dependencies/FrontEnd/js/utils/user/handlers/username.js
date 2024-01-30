module.exports = {
    usernameHandler: function (username, User, AssignUUID, GetUUID, SetScriptContents, SaveUUID, IsUserLoaded) {
        // get rid of any special characters or spaces or symbols
        username.value = username.value.replace(/[^a-zA-Z0-9]/g, "");
        // check their local storage if they have any data
        const storage = window.localStorage;

        // Check if the username is already in localStorage
        if (storage.getItem(username.value)) {
            User.name = username.value;
            AssignUUID(User, storage.getItem(username.value));
            SetScriptContents(username.value, "ScriptContents");
            SetScriptContents(User.uuid, "ScriptContents2");
        } else {
            // If the username is not in localStorage, assign a new UUID
            User.name = username.value;
            AssignUUID(User, GetUUID(User.name));

            // Update the script contents
            SetScriptContents(username.value, "ScriptContents");
            SetScriptContents(User.uuid, "ScriptContents2");

            // Save the UUID to the local storage
            SaveUUID(User);
        }

        // Hide the username button after inputting a username
        username.style.display = "none";
    }
};
