// load the test.js but for a website we need to import the js file
// fun the test in the app.js
const {CompareTest, SomeDivision, IsUserLoaded, SetScriptContents} = require('./utils/test.js');
const {checkIntegrity} = require('../../checks/IntegrityCheck.js');
const {checkParity} = require('../../checks/parityCheck.js');
const {checkCRC} = require('../../checks/crc.js');
const {defineMap} = require('../../utils/defineMap.js');
const Encrypt = require('../../encryption.js');


(async () => {
    
    const encryptClass = new Encrypt();
    const Decrypt = document.getElementById("Decrypt");
    const _Encrypt_ = document.getElementById("Encrypt");
    const _EncryptCheck_ = document.getElementById("EncryptCheck");
    const Txtmsg = document.getElementById("Txtmsg");
    const Send = document.getElementById("Send");


    // encrypt the map
    var encryptedData = encryptClass.EncryptData(defineMap());

    // decrypt the map
    var decryptedData = encryptClass.DecryptData(encryptedData);

    // check the integrity of the map
    var InregrityCheck = checkIntegrity(defineMap(), decryptedData);
    var ParityCheck = checkParity(defineMap(), decryptedData);
    var CRCCheck = checkCRC(defineMap(), decryptedData);

    inputHandler = () => {
        // 
    }

    btnHandler = () => {
        
        _Encrypt_.addEventListener("click", function(){
            console.log("Encrypted Data: ", encryptedData);
            setTimeout(() => {
                SetScriptContents("You pressed Encrypt", "ScriptContents2");
            }, 1000);
            // reset back to default
            setTimeout(() => {
                SetScriptContents(SomeDivision(), "ScriptContents2");
            }, 4000);
        });
        
        Decrypt.addEventListener("click", function(){     
            console.log("Decrypted Data: ", decryptedData);
            setTimeout(() => {
                SetScriptContents("You pressed Decrypted", "ScriptContents");
            }, 1000);
            // reset back to default
            setTimeout(() => {
                SetScriptContents(Object.values(IsUserLoaded()), "ScriptContents");
            }, 4000);
        });

        _EncryptCheck_.addEventListener("click", function(){
            setTimeout(() => {
                SetScriptContents("You pressed Encrypt Check", "ScriptContents2");
            }, 1000);
        });

        Send.addEventListener("click", function(){
            
            // while checkmark is checked this will encrypt the data
            if (_EncryptCheck_.checked){
                // while this is checked we will encrypt the data
                const xtx = encryptClass.EncryptString(Txtmsg.value);
                console.log("xtx: ", xtx);
            } else {
            console.log("Send: ", Txtmsg.value);
            }
            if (Txtmsg.value === ""){
                console.log("You didn't type anything");
                return;
            } 
            if (Txtmsg.value === encryptClass.EncryptionKey.toString()){
                console.log("Hello you typed the encryption key");
            }
            setTimeout(() => {
                SetScriptContents("You sent: " + Txtmsg.value, "ScriptContents2");
            }, 1000);
            // reset back to default
            setTimeout(() => {
                SetScriptContents(SomeDivision(), "ScriptContents2");
            }, 4000);
        });

    }

    SetScriptContents(Object.values(IsUserLoaded()), "ScriptContents");
    SetScriptContents(SomeDivision(), "ScriptContents2");
    SetScriptContents("Checksums: " + InregrityCheck.replace(/\x1b\[[0-9;]*m/g, ''), "CheckSums");
    SetScriptContents("Parity: " + ParityCheck.replace(/\x1b\[[0-9;]*m/g, ''), "Parity");
    SetScriptContents("CRC: " + CRCCheck.replace(/\x1b\[[0-9;]*m/g, ''), "CRC");

    inputHandler();
    btnHandler();
})();




