const express = require('express');
app = express()

//json
app.use(express.json());

// cookie parser
const cookieParser = require('cookie-parser')
app.use(cookieParser());

// environmental
require('dotenv').config({path:'./.env'})

// cors handling
const cors = require('cors')
const cors_options = {origin: ['http://localhost:5173/', 'http://127.0.0.1:8000/'], methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',}
app.use(cors(cors_options));

// routing
const auth = require('./routes/auth.js')
const callback = require('./routes/callback.js')
const test = require('./routes/get_market_data.js')
const test_local = require('./routes/SendMarketDataToDjango.js')
const getMarketData = require('./routes/getMarketData.js')
app.use('/auth', auth)
app.use('/callback', callback)
app.use('/test', test)
app.use('/SendMarketDataToDjango', test_local)
app.use('/getmarketdata', getMarketData)

app.listen(3001)
