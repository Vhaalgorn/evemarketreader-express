const express = require('express')
const router = express.Router()
const path = require('path')


function index(req, res){
    response = res.sendFile()
    return 
}

router.get('/', (req, res) =>{

    return res.sendFile(path.join(__dirname, '../html/index.html'))
})

module.exports = router