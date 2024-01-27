// load the test.js but for a website we need to import the js file
// fun the test in the app.js
const {CompareTest, SomeDivision, IsUserLoaded, SetScriptContents} = require('./utils/test.js');
const {checkIntegrity} = require('../../checks/IntegrityCheck.js');
const {checkParity} = require('../../checks/parityCheck.js');
const {checkCRC} = require('../../checks/crc.js');
const {defineMap, Browser} = require('../../utils/defineMap.js');
const {ConsoleContents,Decrypt,Send,Txtmsg,_EncryptCheck_,_Encrypt_} = require('./utils/getIds.js');
const Encrypt = require('../../encryption.js');


(async () => {
    
    const encryptClass = new Encrypt();
    var encryptedData = encryptClass.EncryptDatabrowser(Browser());
    var decryptedData = encryptClass.DecryptData(encryptedData);
    var InregrityCheck = checkIntegrity(defineMap(), decryptedData);
    var ParityCheck = checkParity(defineMap(), decryptedData);
    var CRCCheck = checkCRC(defineMap(), decryptedData);

    var User = "Default";
    var Age = 0;

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
            setTimeout(() => {
                SetScriptContents(Object.values(IsUserLoaded(User, 0)), "ScriptContents");
            }, 4000);
        });

        _EncryptCheck_.addEventListener("change", function(){
            // Set that the user pressed it
            setTimeout(() => {
                SetScriptContents("You pressed Encrypt Check", "ScriptContents2");
            }, 1000);

            if (_EncryptCheck_.checked){
                
            } else {
                console.log("You unchecked the box");
            }
            
            // reset back to default
            setTimeout(() => {
                SetScriptContents(SomeDivision(), "ScriptContents2");
            }, 4000);
        });

        Send.addEventListener("click", function(){
            
            // while checkmark is checked this will encrypt the data
            if (_EncryptCheck_.checked){
                // while this is checked we will encrypt the data
                const xtx = encryptClass.EncryptString(Txtmsg.value);
                console.log("xtx: ", xtx);
                if (ConsoleContents.innerHTML === "") {
                    ConsoleContents.innerHTML = IsUserLoaded(User, Age).name + ": " + xtx;
                } else {
                    // limit how many messages can be shown in the console
                    if (ConsoleContents.innerHTML.split("<br>").length < 10){
                        ConsoleContents.innerHTML += "<br>" + IsUserLoaded(User,Age).name + ": " + xtx;
                    } else {
                        // remove the first message and add the new message to the end
                        var split = ConsoleContents.innerHTML.split("<br>");
                        split.shift();
                        split.push(IsUserLoaded(User,Age).name + ": " + xtx);
                        ConsoleContents.innerHTML = split.join("<br>");
                    }
                }
            } 
            else {
                console.log("Send: ", Txtmsg.value);
                // if ConsoleContents is empty then set it to the value of Txtmsg if it's not empty add the value of Txtmsg to the end of ConsoleContents
                if (ConsoleContents.innerHTML === ""){
                    ConsoleContents.innerHTML = IsUserLoaded(User,Age).name + ": " + Txtmsg.value;
                } else {
                    // limit how many messages can be shown in the console
                    if (ConsoleContents.innerHTML.split("<br>").length < 10){
                        ConsoleContents.innerHTML += "<br>" + IsUserLoaded(User,Age).name + ": " + Txtmsg.value;
                    } else {
                        // remove the first message and add the new message to the end
                        var split = ConsoleContents.innerHTML.split("<br>");
                        split.shift();
                        split.push(IsUserLoaded(User,Age).name + ": " + Txtmsg.value);
                        ConsoleContents.innerHTML = split.join("<br>");
                    }
                }
            } 
            
            if (Txtmsg.value === ""){
                ConsoleContents.innerHTML = "You didn't type anything";
                console.log("You didn't type anything");
                Console
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

    SetScriptContents(Object.values(IsUserLoaded(User,Age)), "ScriptContents");
    SetScriptContents(SomeDivision(), "ScriptContents2");
    SetScriptContents("Checksums: " + InregrityCheck.replace(/\x1b\[[0-9;]*m/g, ''), "CheckSums");
    SetScriptContents("Parity: " + ParityCheck.replace(/\x1b\[[0-9;]*m/g, ''), "Parity");
    SetScriptContents("CRC: " + CRCCheck.replace(/\x1b\[[0-9;]*m/g, ''), "CRC");
    
    btnHandler();
})();




