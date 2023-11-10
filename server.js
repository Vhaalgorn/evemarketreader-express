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
const update_orders = require('./routes/market_orders/esi_get_market_data.js')

app.use('/auth', auth)
app.use('/callback', callback)
app.use('/update_orders', update_orders)


app.listen(3001)
