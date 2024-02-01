// load the test.js but for a website we need to import the js file
// fun the test in the app.js
const {  SetContents} = require('./utils/user/test.js');
const { UserObj, AssignUUID, SaveUUID } = require("./utils/user/object/client.js");
const {SendMessage} = require('./utils/user/utils/Message.js');
const {checkIntegrity} = require('../../checks/IntegrityCheck.js');
const {checkParity} = require('../../checks/parityCheck.js');
const {checkCRC} = require('../../checks/crc.js');
const {GetUUID, GetUUIDKey} = require('../js/utils/browser/browser.js');
const {defineMap, Browser} = require('../../utils/defineMap.js');
const { handleSend } = require('./utils/user/handlers/handleSend.js');
const { handleCreateDM } = require('./utils/user/handlers/CreateDM.js');
const { handleEncrypt } = require('./utils/user/handlers/HandleEncrypt.js');

const {
    Send,Txtmsg,_Encrypt_,
    _EncryptCheck_,CreateDMBtn,
    ToggleButtons,BtnContainer,
    username,ConsoleContents,
    userToDM,consoleHeader
} = require('./utils/getIds.js');

const socket = io();

const Encrypt = require('../../encryption.js');
const { usernameHandler } = require('./utils/user/handlers/username.js');
const { handleSocket } = require('./utils/user/handlers/sockethandler.js');

(async () => {
    const init = () => {
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
            SetContents(GetUUIDKey(username.value),"name");
            SetContents(GetUUID(username.value),"ScriptContents2");
            consoleHeader.textContent = "Welcome " + username.value + "!";
        }
        socket.on('connect', function() {
            var name = document.getElementById('name').textContent.split(" ")[3];
            var uuid = document.getElementById('ScriptContents2');
            var UA = navigator.userAgent;
        
            var user = {
                name: name,
                uuid: uuid.textContent,
                userAgent: UA.toString(),
            }
            socket.emit('join', user);
        });
    }

    init();

    const User = UserObj(username.value,21);
    const User2 = UserObj(userToDM.value,21);

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
        handleSocket(socket, _EncryptCheck_, _Encrypt_,ConsoleContents);
    }

    inputHandler = () => {
        userToDM.addEventListener("change", function(){
            User2.name = userToDM.value;
        });
        
    }

    btnHandler = () => {
        username.addEventListener("change", function(){
            usernameHandler(username, User, AssignUUID, GetUUID, SetContents, SaveUUID);
        });

        Txtmsg.addEventListener("change", function(){
            // if Txtmsg.value is empty then return
            if (Txtmsg.value == ""){
                return;
            }
            _sendMessage_(socket, User, User2, Txtmsg, _EncryptCheck_, Encrypt, encryptClass, SendMessage);
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
                SetContents("Encryption: " + _EncryptCheck_.checked,"EncryptedCheck");
                console.log("You checked the box");
                socket.emit('encryptCheck', User.name + " enabled encryption to " + _EncryptCheck_.checked);
            } else {
                User.isEncrypted = false;
                SetContents("Encryption: " + _EncryptCheck_.checked,"EncryptedCheck");
                socket.emit('encryptCheck', 'User: ' + User.name + " disabled encryption to " + _EncryptCheck_.checked);
                console.log("You unchecked the box");
            }
        });

        ToggleButtons.addEventListener("click", function(){
            
            if (BtnContainer.style.display == "none"){
                BtnContainer.classList.add("fadein");
                BtnContainer.classList.remove("fadeOut");
                BtnContainer.style.animation = "fadein 2s";
                setTimeout(() => {
                    BtnContainer.style.display = "block";
                }, 2000);
            } else {
                
                BtnContainer.classList.remove("fadein");
                BtnContainer.style.animation = "fadeOut 2s";
                BtnContainer.classList.add("fadeOut");
                BtnContainer.style.display = "none";

            }
        });
        return;
    }
    // on change set the SCriptContents
    SetContents("Logged in as: "+username.value,"name");
    SetContents("Checksums: " + InregrityCheck.replace(/\x1b\[[0-9;]*m/g, ''), "CheckSums");
    SetContents("Parity: " + ParityCheck.replace(/\x1b\[[0-9;]*m/g, ''), "Parity");
    SetContents("CRC: " + CRCCheck.replace(/\x1b\[[0-9;]*m/g, ''), "CRC");
    inputHandler();
    btnHandler();
    socketHandler();
    
})();