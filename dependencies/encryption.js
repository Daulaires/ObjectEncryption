const CryptoJS = require('crypto-js');
const Utils = require('../dependencies/utils/utils.js');
const utilsClass = new Utils.Utils();
class Encrypt{
    constructor(){
        this.EncryptionKey = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    }

    EncryptObject(data){
        var encryptedData = '';
        for (let i = 0; i<data.length; i++){
            encryptedData += String.fromCharCode(data.charCodeAt(i) ^ this.EncryptionKey.charCodeAt(i % this.EncryptionKey.length));
        }
        return encryptedData;
    }

    EncryptNumber(data){
        var encryptedData = '';
        for (let i = 0; i<data.length; i++){
            encryptedData += Number.fromCharCode(data.charCodeAt(i) ^ this.EncryptionKey.charCodeAt(i % this.EncryptionKey.length));
        }
        return encryptedData;
    }


    EncryptString(data){
        var encryptedData = '';
        for (let i = 0; i < data.length; i++) {
            encryptedData += String.fromCharCode(data.charCodeAt(i) ^ this.EncryptionKey.charCodeAt(i % this.EncryptionKey.length));
        }
        return encryptedData;
    }
    
    DecryptString(data){
        var decryptedData = '';
        for (let i = 0; i < data.length; i++) {
            decryptedData += String.fromCharCode(data.charCodeAt(i) ^ this.EncryptionKey.charCodeAt(i % this.EncryptionKey.length));
        }
        return decryptedData;
    }

    DecryptObject(data){
        var decryptedData = '';
        for (let i = 0; i<data.length; i++){
            decryptedData += String.fromCharCode(data.charCodeAt(i) ^ this.EncryptionKey.charCodeAt(i % this.EncryptionKey.length));
        }
        return decryptedData;
    }

    DecryptNumber(data){
        var decryptedData = '';
        for (let i = 0; i<data.length; i++){
            decryptedData += Number.fromCharCode(data.charCodeAt(i) ^ this.EncryptionKey.charCodeAt(i % this.EncryptionKey.length));
        }
        return decryptedData;
    }
    
    EncryptData(data){
        var encryptedData = data;
        
        // if it's a map, then encrypt the keys
        if (data instanceof Map){
            return this.EncryptMap(data);
        }
        if (data instanceof String){
            return this.EncryptString(data);
        }
        if (data instanceof Object){
            return this.EncryptObject(data);
        }
        // if number
        if (data instanceof Number){
            return this.EncryptNumber(data);
        }
        
        return encryptedData;
    }

    DecryptData(data){
        var decryptedData = data;

        // console.log(typeof data ? data instanceof Map : 'not a map');

        // if it's a map, then decrypt the keys
        if (data instanceof Map){
            return this.DecryptMap(data);
        }

        if (data instanceof String){
            return this.DecryptString(data);
        } 

        if (data instanceof Object){
            return this.DecryptObject(data);
        }

        // if number
        if (data instanceof Number){
            return this.DecryptNumber(data);
        }

        return decryptedData;
    }

    EncryptMap(data, key){
        var encryptedData = data;
        var encryptedDataMap = new Map();

        for (var [key, value] of encryptedData){
            if (value instanceof Object){
                var encryptedObject = new Map();
                
                for (var [key2, value2] of Object.entries(value)){
                    var encryptedKey = CryptoJS.AES.encrypt(key2.toString(), this.EncryptionKey);
                    var encryptedValue = CryptoJS.AES.encrypt(value2.toString(), this.EncryptionKey);
                    encryptedObject.set(encryptedKey, encryptedValue);
                }
                encryptedDataMap.set(CryptoJS.AES.encrypt(key.toString(), this.EncryptionKey), encryptedObject);
            } 
        }
        return encryptedDataMap;
    }
    
    DecryptMap(data, key){
        var decryptedData = data;
        var decryptedDataMap = new Map();
    
        for (var [key, value] of decryptedData){
            if (value instanceof Map){
                var decryptedObject = this.DecryptMap(value, key);
                decryptedDataMap.set(CryptoJS.AES.decrypt(key.toString(), this.EncryptionKey.toString(CryptoJS.enc.Utf8)), decryptedObject);
            } else {
                var decryptedKey = CryptoJS.AES.decrypt(key, this.EncryptionKey).toString(CryptoJS.enc.Utf8);
                var decryptedValue = CryptoJS.AES.decrypt(value, this.EncryptionKey).toString(CryptoJS.enc.Utf8);
                decryptedDataMap.set(decryptedKey, decryptedValue);
            }
        }
        return decryptedDataMap;
    }

    RunEncryption(encryptedData) {
        // show the data of the encrypted map
        for (var [key, value] of encryptedData) {
            // if value is a object, then we need to decrypt the keys
            // console.log(key.toString(), value);

            // for each key, decrypt it and dump the contents
            if (value instanceof Map) {
                for (var [key2, value2] of value) {
                    // decrypt the key
                    var decryptedKey = this.DecryptData(key2, this.EncryptionKey);
                    // print out all the attributes of the object
                    console.log(decryptedKey.toString(), value2.ciphertext.toString(), value2.salt.words.toString(), value2.iv.toString());
                }
            }
        }
    }

    RunDecryption(decryptedData) {
        for (var [key, value] of decryptedData) {
            /*
            EXAMPLE TO GET SPECIFIC DATA
            console.log(key.toString(), new Map(value).get('time'));
            */
            const Day = 0;
            const date = 0;
            const time = 0;
            const test = 0;
            const name = 0;
            const getvar = 0;

            const DataMap = new Map();
            DataMap.set('Day', Utils.GetValuesFromMap(value, 'day'));
            DataMap.set('date', utilsClass.GetValuesFromMap(value, 'date'));
            DataMap.set('time', utilsClass.GetValuesFromMap(value, 'time'));
            DataMap.set('test', utilsClass.GetValuesFromMap(value, 'test'));
            DataMap.set('name', utilsClass.GetValuesFromMap(value, 'name'));
            DataMap.set('getvar', utilsClass.GetValuesFromMap(value, 'getvar'),
            );

            // Dump all the data
            console.log(key.toString(), value);

            for (var [k, v] of DataMap) {
                if (v !== undefined) {
                    // check if there are any strings that contain a number
                    if (utilsClass.IsNumber(v)) {
                        // if the string contains a number, then we need to convert it to a number
                        console.log(`${k}:`, parseInt(v));
                    } 
                    else if (utilsClass.IsString(v) && !utilsClass.IsNumber(v)) {
                        console.log(`${k}:`, v);
                    }
                }
            }
        }
    }

}

module.exports = Encrypt;