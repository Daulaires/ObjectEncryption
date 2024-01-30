// load the test.js but for a website we need to import the js file
// fun the test in the app.js
const {IsUserLoaded, SetScriptContents} = require('./utils/user/test.js');
const { UserObj, AssignUUID, SaveUUID } = require("./utils/user/object/client.js");
const {SendMessage} = require('./utils/user/utils/Message.js');
const {checkIntegrity} = require('../../checks/IntegrityCheck.js');
const {checkParity} = require('../../checks/parityCheck.js');
const {checkCRC} = require('../../checks/crc.js');
const {GetUUID} = require('../js/utils/browser/browser.js');
const {defineMap, Browser} = require('../../utils/defineMap.js');

const { handleSend } = require('./utils/user/handlers/handleSend.js');
const { handleCreateDM } = require('./utils/user/handlers/CreateDM.js');
const { handleEncrypt } = require('./utils/user/handlers/HandleEncrypt.js');

const {

    Send,Txtmsg,_Encrypt_,
    _EncryptCheck_,CreateDMBtn,
    ToggleButtons,BtnContainer,
    username,ConsoleContents
    
} = require('./utils/getIds.js');

const socket = io();

const Encrypt = require('../../encryption.js');
const { usernameHandler } = require('./utils/user/handlers/username.js');

(async () => {
    // make sure the user typed in the username before they can send a message and assning userObj
    if (username.value == ""){
        username.value = "User" + Math.floor(Math.random() * 1000);

    } 
    // check if the window.localStorage has the uuid if it does then get the key to the uuid
    var localStorage = window.localStorage;
    for (var i = 0; i < localStorage.length; i++){
        // if nothing is found in the local storage return
        var key = localStorage.key(i);
        if (key == username.value){
            return;
        }
        // auto set the username to the key
        username.value = key;
        // hide the input box for the username
        SetScriptContents(username.value,"ScriptContents");
    }
    const User = UserObj(username.value,21);
    const User2 = UserObj("AnotherDef",21);
    // if valid useragent then assign it a user
    if (User.isLoaded == false){
        AssignUUID(User, GetUUID(User.name));
        SaveUUID(User);
    }

    console.log(GetUUID(User.name));
    console.log("User: ", User);

    const encryptClass = new Encrypt();
    var encryptedData = encryptClass.EncryptDatabrowser(Browser());
    var decryptedData = encryptClass.DecryptData(encryptedData);
    var InregrityCheck = checkIntegrity(defineMap(), decryptedData);
    var ParityCheck = checkParity(defineMap(), decryptedData);
    var CRCCheck = checkCRC(defineMap(), decryptedData);

    function _sendMessage_(socket, User, User2, Txtmsg, _EncryptCheck_, Encrypt, encryptClass, SendMessage){
        handleSend(socket, User, User2, Txtmsg, _EncryptCheck_, Encrypt, encryptClass, SendMessage);
    }

    socketHandler = () => { 
        socket.on('updateConsoleContents', function (data) {
            const { user, message } = data;
        
            // Update the HTML content
            const consoleContents = ConsoleContents;
            
            const newMessage = document.createElement('div');
            newMessage.innerHTML = `${user.name}: ${message}`;
            
            // Append the new message
            consoleContents.appendChild(newMessage);
        
            // Limit the number of displayed messages to 10
            const maxMessages = 10;
            const messages = consoleContents.children;
            
            if (messages.length > maxMessages) {
                // Remove the oldest message from the DOM
                messages[0].remove();
            }
            
            // Scroll to the bottom
            consoleContents.scrollTop = consoleContents.scrollHeight;
        });
        

    }

    btnHandler = () => {

        username.addEventListener("change", function(){
            usernameHandler(username, User, AssignUUID, GetUUID, SetScriptContents, SaveUUID, IsUserLoaded);
        });
    
        Send.addEventListener("click", function(){
            _sendMessage_(socket, User, User2, Txtmsg, _EncryptCheck_, Encrypt, encryptClass, SendMessage);
        });

        CreateDMBtn.addEventListener("click", function(){
            handleCreateDM(User, User2);
        });

        _Encrypt_.addEventListener("click", function(){
            handleEncrypt(User,_EncryptCheck_, _Encrypt_);
        });


        _EncryptCheck_.addEventListener("change", function(){

            if (_EncryptCheck_.checked){
                User.isEncrypted = true;
                SetScriptContents("Encryption: " + _EncryptCheck_.checked,"EncryptedCheck");
                console.log("You checked the box");
                socket.emit('encryptCheck', 'User: ' + User.name + " enabled encryption to " + _EncryptCheck_.checked);
            } else {
                User.isEncrypted = false;
                SetScriptContents("Encryption: " + _EncryptCheck_.checked,"EncryptedCheck");
                socket.emit('encryptCheck', 'User: ' + User.name + " disabled encryption to " + _EncryptCheck_.checked);
                console.log("You unchecked the box");
            }
            
        });

        ToggleButtons.addEventListener("click", function(){
            // make it so they click it once and it hides the buttons and then click it again and it shows the buttons but give it a animation
            if (BtnContainer.style.display == "none"){
                BtnContainer.style.display = "block";
            } else {
                BtnContainer.style.display = "none";
            }
        });

        return;
    }

    // on change set the SCriptContents
    SetScriptContents(username.value,"ScriptContents");
    SetScriptContents("Checksums: " + InregrityCheck.replace(/\x1b\[[0-9;]*m/g, ''), "CheckSums");
    SetScriptContents("Parity: " + ParityCheck.replace(/\x1b\[[0-9;]*m/g, ''), "Parity");
    SetScriptContents("CRC: " + CRCCheck.replace(/\x1b\[[0-9;]*m/g, ''), "CRC");

    btnHandler();
    socketHandler();
    
})();