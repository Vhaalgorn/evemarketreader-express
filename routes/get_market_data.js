const express = require('express')
const router = express.Router()


// Step 1: Get location_1.
async function CharacterLocation(access_token, character_id)
{
    const options = { headers: { Authorization: `Bearer ${access_token}`, Accept: 'application/json' } }
    const url = `https://esi.evetech.net/latest/characters/${character_id}/location/`
    response = await fetch(url,options)
    processed = await response.json()
    return await processed['structure_id']
}

// Step 2: Get market data for location_id.
async function MarketsStructures(access_token, structure_id, x_page, content, debug = false)
{
    const options = { headers: { Authorization:`Bearer ${access_token}`, Accept: 'application/json' } } 
    const url = `https://esi.evetech.net/latest/markets/structures/${structure_id}/?page=${x_page}`
    stream = await fetch(url,options)
    result = await stream.json()
    content.push(await result)
    console.log(`Page ${x_page} loaded.`)

    //send_to_django(content,structure_id)

    if(x_page < parseInt(stream.headers.get('X-pages')) && debug == false)
    {
        return await MarketsStructures(access_token, structure_id, x_page + 1, content)
    }
    else
    {
        
        return content
    }
}

async function send_to_django(content){
    error_messages = []
    async function send_page(page){
        try {
            response = await fetch('http://127.0.0.1:8000/hello/', {
                method: 'POST',
                headers: { "Content-Type": "application/json"},
                body: JSON.stringify(content[page])
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
    for(let page = 0; page<content.length; page++){
        const response = await send_page(page)
        error_messages.push(response)
    }
    final = await Promise.all(error_messages);
    return final
}

async function fetchRequest(req, res)
{
    access_token = req.cookies.access_token
    character_id = req.cookies.character_id
    structure_id = await CharacterLocation(access_token, character_id) // get structure ID, character must be inside the private structure
    all_pages = await MarketsStructures(access_token, structure_id, 1, content = []) // produce a object that contains ALL orders in that structure
    res.json(await send_to_django(all_pages))
}

router.get('/', fetchRequest)

module.exports = router