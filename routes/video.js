const express = require('express')
const fs = require('fs')
const router = express.Router()
const { v4: uuidv4 } = require('uuid');

const getVideo = () => {
    return JSON.parse(fs.readFileSync("./data/video.json"))
}

router.get('/videos', (req, res) => {
    res.send(getVideo());
});

router.get('/videos/:id', (req, res) => {
    const allVideos = getVideo();

})


module.exports = router;


















module.exports = router;