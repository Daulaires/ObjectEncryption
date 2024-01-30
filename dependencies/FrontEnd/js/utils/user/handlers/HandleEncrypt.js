
module.exports = {
    handleEncrypt:function(User,_EncryptCheck_, _Encrypt_)
    {
    console.log("Encrypted Data: ", encryptedData);
        socket.emit('encrypt', 'User: ' + User.name + " pressed encrypt");
        
        // set the encryption to true but if it pressed again then set it to false and vice versa
        if (User.isEncrypted){
            User.isEncrypted = false;
        } else {
            User.isEncrypted = true;
        }
    },
}