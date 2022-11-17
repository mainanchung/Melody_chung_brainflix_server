const express = require('express')
const fs = require('fs')
const router = express.Router()
const { v4: uuidv4 } = require('uuid');

const getVideo = () =>{
    return JSON.parse(fs.readFileSync('./data/video.json'))
}

console.log(getVideo())






















module.exports = router;