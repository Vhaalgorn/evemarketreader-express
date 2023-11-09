const express = require('express');
const router = express.Router();


async function sendTypeID(typeID)
{

}

async function getMarketData(){
    error_messages = []
    async function getData(page){
        try {
            response = await fetch('http://127.0.0.1:8000/getmarketdata/', {
                method: 'GET',
                headers: { "Content-Type": "application/json"}
            })

            if (response.ok) {
                console.log(`Page ${page} sent.`)
                return response.json()
            } else {
                console.error(`Request for page ${page} failed with status: ${response.status}`);
            }
        } catch(error) {
            console.error(`Error sending data for page ${page}:`, error);
        }
    }

    }
    


async function fetchRequest(req, res){
    // need the type id
    try{
        const typeID = req.query.typeID
        const response = await fetch(`http://127.0.0.1:8000/getmarketdata?typeID=${typeID}`,{ method: 'GET', headers: { "Content-Type": "application/json" } })

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

router.get('/', fetchRequest)

module.exports = router