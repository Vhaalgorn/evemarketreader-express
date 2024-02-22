const express = require('express');
const router = express.Router();

//queries django , pass a typeID in the query string for the localhost3001 at route /get_market_orders

router.get('/', async (req, res)=>{
    const typeID = req.query.typeID
    console.log(typeID)
    const raw = await fetch(`http://localhost:8000/market_orders/orders?typeID=${typeID}`)
    const responce = await raw.json()
    return res.send(responce)
})

module.exports = router