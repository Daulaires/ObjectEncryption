// integrityCheck.js
const CryptoJS = require('crypto-js');

function calculateHash(data) {
    return CryptoJS.SHA256(JSON.stringify(data)).toString();
}

function checkIntegrity(originalData, decryptedData) {
    const originalHash = calculateHash(originalData);
    const decryptedHash = calculateHash(decryptedData);
    /*
    if (originalHash !== decryptedHash) {
        console.log('Tampered with: \x1b[31m%s\x1b[0m', 'FAIL');
    } else {
        console.log('Not tampered with: \x1b[32m%s\x1b[0m', 'OK');
    }
    */
    return originalHash === decryptedHash ? '\x1b[32mOK\x1b[0m' : '\x1b[31mFAIL\x1b[0m';
}

module.exports = {
    checkIntegrity: checkIntegrity
};
