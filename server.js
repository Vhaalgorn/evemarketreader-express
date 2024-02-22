const express = require('express');
const path = require('path')
app = express()
router = express.Router()

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
const update_orders = require('./routes/market_orders/esi_get_market_data.js')
const index = require(path.join(__dirname, '/routes/index.js'))
const get_market_orders = require(path.join(__dirname, '/routes/market_orders/get_market_orders.js'))

app.use('/auth', auth)
app.use('/callback', callback)
app.use('/update_orders', update_orders)
app.use("/", index)
app.use('/get_market_orders', get_market_orders)


app.listen(3001)



