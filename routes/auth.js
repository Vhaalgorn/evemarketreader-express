const express = require('express');
const router = express.Router();

/*
After clicking the `auth` button the user is redirected to this route, which redirects the user to the authntification portal of Eve Online
where thye will be able to log in. Once logged in, the the eve api will send a get request to the callbak url. 
The responce is processed there.
*/

const authUrl = 'https://login.eveonline.com/v2/oauth/authorize/';
const redirectUrl = 'http://localhost:3001/callback/';            
const query = {
    response_type: 'code',
    redirect_uri: redirectUrl,
    client_id: process.env.ENV_CLIENTID,
    scope: process.env.ENV_SCOPES,
    state: '102'
};

const queryStr = new URLSearchParams(query).toString();
url = authUrl+'?'+queryStr;
router.get('/',(req,res) =>{res.redirect(url)});

module.exports = router;
