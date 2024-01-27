const { CustomClass } = require('./dependencies/customclass.js');
const Encrypt = require('./dependencies/encryption.js');
const express = require('express');
const { defineMap } = require('./dependencies/utils/defineMap.js');

const { checkIntegrity } = require('./dependencies/checks/IntegrityCheck.js');
const { checkParity } = require('./dependencies/checks/parityCheck.js');
const { checkCRC } = require('./dependencies/checks/crc.js');

const encryptClass = new Encrypt();
const custClassInstance = new CustomClass();

var start = new Date().getTime();
// if none then default to their username of ther windows account

const app = express();

(async () => {


    // set the path to the Backend
    function Main() {

        // set the path to the FrontEnd
        app.use(express.static('dependencies/FrontEnd/'));
        app.use(express.static('dependencies/FrontEnd/js/'));
        app.use(express.static('dependencies/FrontEnd/css/'));
        
        app.use(express.json());

        app.use(express.urlencoded({ extended: true }));

        // set the headers
        app.use(function (req, res, next) {
            console.log("Headers set");
            next();
        });

        // define a map
        const classMap = defineMap(custClassInstance);

        // show the data of the map
        const encryptedData = encryptClass.EncryptData(classMap, encryptClass.EncryptionKey);

        // show the data of the encrypted map
        for (var [k, v] of classMap) {
            console.log("Encrypting: ", k.toString(), v);
        }

        console.log('-------------------');

        encryptClass.RunEncryption(encryptedData); // show the data of the encrypted map

        console.log('-------------------');

        const decryptedData = encryptClass.DecryptData(encryptedData, encryptClass.EncryptionKey);
        encryptClass.RunDecryption(decryptedData); // show the data of the decrypted map

        console.log('-------------------');

        // now we can check the integrity of the data
        const Checks = {
            integrity: checkIntegrity(classMap, decryptedData),
            parity: checkParity(classMap, decryptedData),
            crc: checkCRC(classMap, decryptedData),
        };

        var end = new Date().getTime();

        // print out the checks
        for (var [key, value] of Object.entries(Checks)) {
            console.log(key, value);

            // get the last key
            var lastKey = Object.keys(Checks)[Object.keys(Checks).length - 1];
            if (key === lastKey) {
                console.log('-------------------');

                // total checks
                console.log("Total checks: %s", Object.keys(Checks).length);
                console.log("Time to run: %s", end - start);

            }
        }

        // get the path to the Backend
        app.listen(3000, '192.168.1.73', function () {
            console.log('Listening on port 3000');
        });
    }

    if (require.main === module) {
        Main();
    }

})();
