
module.exports = {
    handleSend: function (socket,User, User2, Txtmsg, _EncryptCheck_, _Encrypt_, encryptClass, SendMessage) {
        if (_EncryptCheck_.checked) {
            // while this is checked we will encrypt the data
            const xtx = encryptClass.EncryptString(Txtmsg.value);

            console.log("msg: ", xtx);

            SendMessage(User, User2, xtx);

            // Emit the message to all connected users
            socket.emit('message', { user: User, message: xtx });

            console.log("User: ", User);
            console.log("User2: ", User2);

            updateConsoleContents(User, xtx);
        } else {
            if (Txtmsg.value == "") {
                return;
            }

            // Send the message to the server
            SendMessage(User, User2, Txtmsg.value);

            // Emit the message to all connected users
            socket.emit('message', { user: User, message: Txtmsg.value });

            console.log("User: ", User);
            console.log("User2: ", User2);

            updateConsoleContents(User, Txtmsg.value);
        }
    }
};

function updateConsoleContents(user, message) {
    // Function to update the console contents on the client side
    socket.emit('updateConsoleContents', { user: user, message: message });
}
