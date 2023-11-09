const express = require('express');
const res = require('express/lib/response');
const router = express.Router()
const fs = require('fs')
const file = fs.readFileSync('/home/bhaalgorn/Documents/GitHub/evemarketreader/routes/SampleData.json', 'utf-8');
console.log('File read.')
const content = JSON.parse(file)


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

async function fetchRequest(req, res){
    res.json(await send_to_django(content))
}

router.get('/', fetchRequest)

module.exports = router