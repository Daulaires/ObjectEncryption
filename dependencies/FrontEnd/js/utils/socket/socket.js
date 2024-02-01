
const socket = io();

const GetUUID = (name) => {
    // get the uuid from the local storage
    const storage = window.localStorage;
    var key = storage.key(name);
    var uuid = storage.getItem(key);
    const str = {
        key: key,
        value: uuid,
    };
    return str;
}

socket.on('connect', function() {
    var name = document.getElementById('name').textContent;
    var uuid = document.getElementById('ScriptContents2');
    var UA = navigator.userAgent;

    var user = {
        name: name,
        uuid: uuid.textContent,
        userAgent: UA.toString(),
    }
    socket.emit('join', user);
});
