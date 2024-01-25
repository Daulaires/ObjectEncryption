// parityCheck.js

function calculateParity(data) {
    let parity = 0;
    for (let i = 0; i < data.length; i++) {
        if ((i + 1) % 2 === 0) {
            parity ^= parseInt(data[i]);
        }
    }
    return parity;
}

function checkParity(originalData, decryptedData) {
    const originalParity = calculateParity(originalData);
    const decryptedParity = calculateParity(decryptedData);
    return originalParity === decryptedParity ? '\x1b[32mOK\x1b[0m' : '\x1b[31mFAIL\x1b[0m';
}

module.exports = {
    calculateParity: calculateParity,
    checkParity: checkParity
};
