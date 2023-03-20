const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const request = require('request');

// parse application/json
app.use(bodyParser.json());

app.get('/', (req, res) => {
    const hello = {
        message: 'Hello World',
    };
    res.json(hello);
});

app.post('/search', (req, res) => {
    const symbol = req.body.symbol;
    console.log(symbol);

    const url = `https://api.binance.com/api/v3/ticker/24hr?symbol=${symbol}`;
    request(url, { json: true }, (err, r, body) => {
        if (err) {
            const eror = (JSON.stringify(err))
            console.log(eror)
        }
        console.log(JSON.stringify(body))

        try {
            currentPrice = (JSON.stringify(body.lastPrice))
            currentPrice = "\"123288.312\""
            console.log(currentPrice)
            message = JSON.stringify(body["msg"])
            console.log(message)
            if (message) {
                const response_ = {
                    success: "True",
                    message: "Invalid Symbol!!!!"
                }
                res.status(200).json(response_);
            } else {
                const response_ = {
                    success: "True",
                    symbol: symbol,
                    price: currentPrice,
                }
                res.status(200).json(response_);
            }
        } catch (err) {
            const response_ = {
                success: "Flase",
                message: "Invalid Symbol!!!"
            }
            res.send(response_)
        }
    });
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});