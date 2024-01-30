
// this is going to check the local storage for the uuid
module.exports = {
    GetUUID: function (name) {
        // get the uuid from the local storage
        const storage = window.localStorage;
        var uuid = storage.getItem(name);
        return uuid;
    },
};