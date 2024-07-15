// Function to generate a new address
document.getElementById('generate-address').addEventListener('click', async () => {
    try {
        const response = await fetch('/generateAddress');
        const data = await response.json();
        document.getElementById('new-address').innerText = `New Address: ${data.address}`;
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('new-address').innerText = 'Error generating new address';
    }
});

// Function to transfer assets
document.getElementById('transfer-asset').addEventListener('click', async () => {
    const fromAddress = document.getElementById('from-address').value;
    const toAddress = document.getElementById('to-address').value;
    const assetName = document.getElementById('asset-name').value;
    const quantity = document.getElementById('quantity').value;

    try {
        const response = await fetch('/transferAsset', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ fromAddress, toAddress, assetName, quantity })
        });
        const data = await response.json();
        document.getElementById('transfer-result').innerText = `Transfer Result: ${data.txid}`;
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('transfer-result').innerText = 'Error transferring asset';
    }
});

// Function to check balance
document.getElementById('check-balance').addEventListener('click', async () => {
    const address = document.getElementById('check-address').value;
    const assetName = document.getElementById('check-asset-name').value;

    try {
        const response = await fetch('/checkBalance', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ address, assetName })
        });
        const data = await response.json();
        document.getElementById('balance-result').innerText = `Balance: ${data.balance}`;
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('balance-result').innerText = 'Error checking balance';
    }
});
