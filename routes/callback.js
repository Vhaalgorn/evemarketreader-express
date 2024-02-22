const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken')



/*
receives a responce after the user is authenticatred throught the eve api portal. Eve api portal sends a get request to this url 
with tokens, the tokens are processed and stored as cookies in the browser which are then updated as they are used.
*/
const url = 'https://login.eveonline.com/v2/oauth/token';
const options = { method:'POST', headers: { Authorization:`Basic ${process.env.ENV_PASS}`, 'Content-Type':'application/x-www-form-urlencoded','host':'login.eveonline.com' }, body:'' }


async function fetchRequest (req, res)
{
    options.body =`grant_type=authorization_code&code=${req.query.code}`
    let response = await fetch(url,options,{credentials:'include'}) //async
    let json_response = await response.json(); //async
    let payload = jwt.decode(json_response.access_token)
    let access_token = json_response.access_token
    let refresh_token = json_response.refresh_token
    let character_id = payload.sub.split(':')[2]
    
    let character = await getCharacter(access_token,character_id)

    res.cookie('access_token', access_token, { maxAge: 900000})
    res.cookie('refresh_token', refresh_token, { maxAge: 900000})
    res.cookie('character_id', character_id, { maxAge: 900000})
    res.cookie('character', JSON.stringify(character), { maxAge: 900000})
    res.redirect('http://localhost:3001/')
}
async function getCharacter(access_token,character_id)
{
    const options = { headers: { Authorization: `Bearer: ${access_token}` } }
    const url = `https://esi.evetech.net/latest/characters/${character_id}/`
    response = await fetch(url,options)
    processed = await response.json()
    //console.log(await processed)
    return await processed
}
//router.get('/',send_get_request)
router.get('/',fetchRequest)
module.exports = router;