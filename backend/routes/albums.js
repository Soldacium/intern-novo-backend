const express = require('express');
const router = express.Router();
const Album = require('../models/album');
const multer = require('multer');


router.post('', (req, res, next) => {
    const album = new Album({
        name: req.body.name,
    });

    album.save().then(createdAlbum => {
        res.status(200).json(createdAlbum);
    })
})

router.get('',(req,res,next) => {
    Album.find().then((images) => {
        res.status(200).json(images);
    });
});

router.get('/:id',(req,res,next) => {
    Album.find().then((images) => {
        res.status(200).json(images);
    });
});

router.patch('/:id',(req,res,next) => {
    const album = new Album(req.body)
    Album.updateOne({_id: req.params.id},album).then(result => {
        res.status(200).json(result);
    });
})

router.delete('/:id',(req,res,next) => { 
    Album.deleteOne({_id: req.params.id}).then(result => {
        res.status(200).json(result);
    });
});

module.exports = router;