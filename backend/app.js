const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const request = require('request');

// parse application/json
app.use(bodyParser.json());

app.get('/', (req, res) => {
    const hello = {
        message: 'Hello World'
    };
    res.json(hello);
});

app.post('/search', (req, res) => {
    const symbol = req.body.symbol;
    console.log(symbol);

    const url = `https://api.binance.com/api/v3/ticker/24hr?symbol=${symbol}`;
    request(url, { json: true }, (err, r, body) => {
        if (err) {
            const eror = (JSOn.stringify(err))
            console.log(eror)
        }
        currentPrice = (JSON.stringify(body.lastPrice))
        console.log(currentPrice)

        if (currentPrice == undefined) {
            const response_ = {
                message: "Success",
                symbol: "Invalid Argument"
            }
            res.send(response_)
        }
        const response_ = {
            message: "Success",
            symbol: symbol,
            price: currentPrice
        }
        res.send(response_)
    });
});


app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
