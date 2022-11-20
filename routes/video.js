const { response } = require('express');
const express = require('express')
const fs = require('fs')
const router = express.Router()
const { v4: uuidv4 } = require('uuid');


const getVideo = () => {
    return JSON.parse(fs.readFileSync("./data/video.json"))
}

router.get('/videos', (req, res) => {
    const videos =  getVideo()
    let resObj = videos.map(ele =>{
        
        let data=
        {
        id: ele.id,
        title : ele.title,
        channel:ele.channel,
        image:ele.image
        }
    return data
    })
    res.json(resObj);
});

router.get('/videos/:id', (req, res) => {
    const allVideos = getVideo()
    const id = req.params.id
    console.log(req.params.id)
    let targetVideo = allVideos.find( video => video.id === id)
   
    if (!targetVideo){
        return res.status(404).send('Video not found.')
    }
    res.send(targetVideo)
})

router.post('/videos', (req, res) => {
    const title = req.body.title
    const description = req.body.description
    if (title == "" || description == ""){
        return res.status(400).send('Form error')
    }

    let videoInfo = { 
            id: uuidv4(),
            title: title,
            channel: "Melody Chung",
            image: "http://localhost:8080/images/example.jpg",
            description: description,
            views: "1,001,023",
            likes: "110,985",
            duration: "4:01",
            video: "https://project-2-api.herokuapp.com/stream",
            timestamp: Date.now(),
            comments: [] 
        }

    const allVideos = getVideo();
    allVideos.push(videoInfo)

    fs.writeFileSync('./data/video.json', JSON.stringify(allVideos))
    return res.json({videoInfo})
})

router.post('/videos/:id/comments', (req, res) =>{
    const comment = req.body.comment
    const allVideos = getVideo()
    const id = req.params.id
    let targetVideo = allVideos.find( video => video.id === id)
    let targetCommentField = targetVideo.comments

    if (comment == ""){
        return res.status(400).send('Form error')
    }

    let postComment = {
        id:uuidv4(),
        name: "Melody",
        comment: comment,
        timestamp: Date.now()
      }

    targetCommentField.push(postComment)
    // console.log(targetCommentField)
    fs.writeFileSync('./data/video.json', JSON.stringify(allVideos))
    return res.json({postComment})
})

module.exports = router;

