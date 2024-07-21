// server.js
const express = require('express');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 3000;
const endpoint = "http://45.90.13.151:6041"; // Use your actual endpoint

app.use(express.static('public'));
app.use(express.json());

app.post('/bypass', async (req, res) => {
    const { link } = req.body;

    if (!link) {
        return res.status(400).json({ message: 'Link is required' });
    }

    try {
        const apiUrl = `${endpoint}/?url=${link}`;
        const response = await axios.get(apiUrl);
        const json = response.data;

        if (json.status === 'success') {
            res.json({ message: `Bypassed successfully: ${json.key || json.target}` });
        } else {
            res.json({ message: `Error: ${json.message}` });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error bypassing link' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
