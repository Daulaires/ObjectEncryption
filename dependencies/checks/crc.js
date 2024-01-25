// crcCalculator.js
const crc = require('crc');

function calculateCrc(data) {
    let cache = [];
    const str = JSON.stringify(data, (key, value) => {
        if (typeof value === 'object' && value !== null) {
            if (cache.includes(value)) return;
            cache.push(value);
        }
        return value;
    });
    return crc.crc32(str);
}

function checkCRC(originalData, decryptedData) {
    const originalHash = calculateCrc(originalData);
    const decryptedHash = calculateCrc(decryptedData);
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
    calculateCrc: calculateCrc,
    checkCRC: checkCRC
};
