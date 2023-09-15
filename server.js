const express = require('express');
app = express()

app.use(express.json());
const cookieParser = require('cookie-parser')
app.use(cookieParser());

require('dotenv').config({path:'./.env'})


const auth = require('./routes/auth.js')
const callback = require('./routes/callback.js')
app.use('/auth', auth)
app.use('/callback', callback)
app.listen(3001)
