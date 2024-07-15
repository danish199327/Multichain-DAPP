const multichain = require('multichain-node');
const multichainConfig = require('./multichainConfig');

const multichainClient = multichain(multichainConfig);

multichainClient.getInfo((err, info) => {
    if (err) {
        console.error('Error connecting to Multichain:', err);
    } else {
        console.log('Multichain info:', info);
    }
});
