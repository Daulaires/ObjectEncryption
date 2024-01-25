const { CustomClass } = require('./dependencies/customclass.js');
const Encrypt = require('./dependencies/encryption.js');
const express = require('express');
const { defineMap } = require('./dependencies/utils/defineMap.js');

const { checkIntegrity } = require('./dependencies/checks/IntegrityCheck.js');
const { checkParity } = require('./dependencies/checks/parityCheck.js');
const { checkCRC } = require('./dependencies/checks/crc.js');

const encryptClass = new Encrypt();
const custClassInstance = new CustomClass();

// if none then default to their username of ther windows account

const app = express();

(async () => {
    // set the path to the FrontEnd
    app.use(express.static('.\\dependencies\\FrontEnd\\'), express.json({ limit: '1mb' }));
    
    function Main() {
        var start = new Date().getTime();

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
        app.use(express.json());

        // when someone loads the page print out the data
        app.get('*', (request, response) => {
            console.log('I got a GET request!');
            response.json({
                status: 'success',
                data: decryptedData,
            });
        });

        // get the path to the Backend
        app.listen(3000, () => console.log('listening at 3000'));   
    }

    if (require.main === module) {
        Main();
    }

})();
