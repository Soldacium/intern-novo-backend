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

router.post('/:id/pictures',(req,res,next) => {
    Album.updateOne({_id: req.params.id},{$push: {pictures: req.body.pictureId}}).then(updateResult => {
        res.status(200).json(updateResult);
    });
})

router.get('',(req,res,next) => {
    Album.find().then((albums) => {
        res.status(200).json(albums);
    });
});

router.get('/:id',(req,res,next) => {
    Album.find().then((album) => {
        res.status(200).json(album);
    });
});

router.delete('/:id',(req,res,next) => { 
    Album.deleteOne({_id: req.params.id}).then(deleteResult => {
        res.status(200).json(deleteResult);
    });
});

router.delete('/:id/pictures/:pictureId',(req,res,next) => { 
    Album.updateOne({_id: req.params.id},{$pull: {pictures: req.params.pictureId}}).then(updateResult => {
        res.status(200).json(updateResult);
    });
});

router.patch('/:id', (req,res,next) => {
    Album.updateOne({_id: req.params.id},req.body.album).then(updateResult => {
        res.status(200).json(updateResult);
    })
})

module.exports = router;