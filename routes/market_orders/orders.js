const express = require('express');
const router = express.Router();


// DEPRECATED

/*
async function main(req, res){
    // need the type id
    try{
        const typeID = req.query.typeID
        const response = await fetch(`http://127.0.0.1:8000/market_orders/orders?typeID=${typeID}`,{ method: 'GET', headers: { "Content-Type": "application/json" } })

        if (response.ok){
            res.json(await response.json())
        }
        else {
            res.status(response.status).json({error: 'Request failed'})
        }
    } catch (error) {
        res.status(500).json({error:'Internal server error'})
    }
    

    // take the typeID and send to django using fetch
}

router.get('/', main)

module.exports = router
*/