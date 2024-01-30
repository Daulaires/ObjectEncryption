
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
    var name = document.getElementById('ScriptContents').textContent;
    var uuid = GetUUID(name);
    var UA = navigator.userAgent;

    var user = {
        name: GetUUID(name).key,
        uuid: uuid.value,
        userAgent: UA.toString(),
    }
    socket.emit('join', user);
});
