module.exports = {
    SendMessage:function(sender, receiver, message){
        // Check if the user is in the DM
        if (!receiver.DMs[sender.name]) {
            receiver.DMs[sender.name] = [];
        }

        if (!sender.DMs[receiver.name]) {
            sender.DMs[receiver.name] = [];
        }

        // Add the message to the receiver's DMs list
        receiver.DMs.set(sender.name, receiver.DMs[sender.name].push(message));

        // Add the message to the sender's DMs list
        sender.DMs.set(receiver.name, sender.DMs[receiver.name].push(message));

        // Return the message
        return message;
    },
}