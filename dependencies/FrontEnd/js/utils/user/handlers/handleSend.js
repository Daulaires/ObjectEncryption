const {notifContents} = require('./../../getIds.js');
const { PushNotification } = require('./../handlers/notification.js');

module.exports = {
    
    handleSend: function (socket,User, User2, Txtmsg, _EncryptCheck_, _Encrypt_, encryptClass, SendMessage) {
        if (_EncryptCheck_.checked) {
            const xtx = encryptClass.EncryptString(Txtmsg.value);
            console.log("msg: ", xtx);
            if (xtx == "") {
                PushNotification(notifContents, "You cannot send an empty message", "red");
                return;
            }
            SendMessage(User, User2, xtx);
            socket.emit('message', { user: User, message: xtx });
            console.log("User: ", User);
            console.log("User2: ", User2);
            updateConsoleContents(User, xtx);
        } else {
            if (Txtmsg.value == "") {
                PushNotification(notifContents, "You cannot send an empty message", "red");
                return;
            }
            SendMessage(User, User2, Txtmsg.value);
            socket.emit('message', { user: User, message: Txtmsg.value });
            console.log("User: ", User);
            console.log("User2: ", User2);
            updateConsoleContents(User, Txtmsg.value);
        }
    }
};

function updateConsoleContents(user, message) {
    socket.emit('updateConsoleContents', { user: user, message: message });
}
