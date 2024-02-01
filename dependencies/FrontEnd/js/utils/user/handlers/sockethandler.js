
module.exports = {
    handleSocket: function (socket,_EncryptCheck_, _Encrypt_, ConsoleContents) {
        socket.on('updateConsoleContents', function (data) {
            const { user, message } = data;
            const consoleContents = ConsoleContents;
            const newMessage = document.createElement('div');
            newMessage.innerHTML = `${user.name}: ${message}`;
            consoleContents.appendChild(newMessage);
            const maxMessages = 10;
            const messages = consoleContents.children;
            if (messages.length > maxMessages) {
                messages[0].remove();
            }
            consoleContents.scrollTop = consoleContents.scrollHeight;
        });
    },
}