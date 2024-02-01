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
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const hostname = '192.168.1.73';
const port = 443;

(async () => {


    // set the path to the Backend
    function Main() {

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
        
        // set the path to the FrontEnd
        app.get('/', function(req, res) {
            // if (!req.secure && req.get('X-Forwarded-Proto') !== 'https' && process.env.NODE_ENV !== "development") {
            //     return res.redirect('https://' + req.get('host') + req.url);
            // }
            app.use(express.static('dependencies/FrontEnd'));
            app.use(express.static('dependencies/FrontEnd/js'));
            app.use(express.static('dependencies/FrontEnd/css'));
            // create a route to the FrontEnd
            res.sendFile(__dirname + '/dependencies/FrontEnd/index.html');
            // now we set the headers 
            res.setHeader('Content-Type', 'text/html');
        });


        io.on('connection', (socket) => {
            // get the ip of the user
            const ip = socket.handshake.address;

            socket.on('join', (data) => {
                // console.log(ip + " joined" + " | " + data.name);
                console.log(data);
            });
            socket.on('encrypt', (data) => {
                console.log(data);
            });
            socket.on('decrypt', (data) => {
                console.log(data);
            });

            socket.on('send', (data)=>{
                console.log(data);
            });

            socket.on('updateConsoleContents', (data) => {
                console.log(data);
                const { user, message } = data;
                if (!user || !message) return console.log("User or message is undefined");
                // now we check if their objects
                if (user instanceof Object) {
                    console.log("User:", user.name + " | sent: " + message);
                } else {
                    console.log("User: ", user);
                }

                // update the html with the message
                return socket.broadcast.emit('updateConsoleContents', { user: user, message: message });
            });

            socket.on('encryptCheck', (data) => {
                // if object then show object contents
                if (data instanceof Object){
                    data = Object.values(data);
                } else {
                    console.log(data);
                }
            });
            socket.on('user', (data) => {
                console.log(data);
            });
            // print the socke users UserAgent
            // console.log(socket.handshake.headers['user-agent']);
            // print the headers of the user that loaded the page
            // console.log(socket.handshake.headers);
            // send the data to the FrontEnd
            socket.on('disconnect', () => {
                console.log(`${socket.id} disconnected`);
            });

        })

        // get the path to the Backend
        server.listen(port, hostname, () => {
            // print the host url
            console.log(`listening on http://${hostname}:${port}`);
        });
    }

    if (require.main === module) {
        Main();
    }

})();
