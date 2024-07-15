const express = require('express');
const bodyParser = require('body-parser');
const multichain = require('multichain-node')({
    host: 'XXXXXX',
    port: XXX,
    user: 'XXXXX',
    pass: 'XXXXXXXX',
});

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(express.static('public')); // Serve static files from the 'public' directory

// Endpoint to generate a new wallet address
app.get('/generateAddress', (req, res) => {
    multichain.getNewAddress((err, address) => {
        if (err) {
            console.error('Error generating new address:', err);
            res.status(500).send('Error generating new address');
        } else {
            console.log('New address:', address);
            res.json({ address });
        }
    });
});

// Endpoint to transfer assets
app.post('/transferAsset', (req, res) => {
    const { fromAddress, toAddress, assetName, quantity } = req.body;

    // Ensure quantity is parsed as a float if it's coming as a string
    const realQuantity = parseFloat(quantity);

    // Check if realQuantity is a valid number
    if (isNaN(realQuantity)) {
        console.error('Invalid quantity:', quantity);
        res.status(400).send('Invalid quantity');
        return;
    }

    multichain.sendAssetFrom({
        from: fromAddress,
        to: toAddress,
        asset: assetName,
        qty: realQuantity
    }, (err, txid) => {
        if (err) {
            console.error('Error transferring asset:', err);
            res.status(500).send('Error transferring asset');
        } else {
            console.log('Transfer txid:', txid);
            res.json({ txid });
        }
    });
});

// Endpoint to check balance
app.post('/checkBalance', (req, res) => {
    const { address, assetName } = req.body;
    multichain.getAddressBalances({ address }, (err, balances) => {
        if (err) {
            console.error('Error checking balance:', err);
            res.status(500).send('Error checking balance');
        } else {
            const assetBalance = balances.find(balance => balance.name === assetName);
            res.json({ balance: assetBalance ? assetBalance.qty : 0 });
        }
    });
});

app.listen(PORT, () => {
    console.log(`App running at http://localhost:${PORT}`);
});






