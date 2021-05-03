const express = require('express');
const router = express.Router();
const Album = require('../models/album');


router.post('', (req, res, next) => {
    const album = new Album({
        name: req.body.name,
        description: req.body.description
    });
    album
    .save()
    .then(
        createdAlbum => res.status(200).json(createdAlbum),
        err => {res.status(500).json(err); console.error(err)}
    )
})

router.post('/:id/pictures',(req,res,next) => {
    Album
    .updateOne({_id: req.params.id},{$push: {pictures: req.body.pictureId}})
    .then(
        updateResult => res.status(200).json(updateResult),
        err => {res.status(500).json(err); console.error(err)}
    );
})

router.get('',(req,res,next) => {
    Album
    .find()
    .then(
        albums => res.status(200).json(albums),
        err => {res.status(500).json(err); console.error(err)}
    );
});

router.get('/:id',(req,res,next) => {
    Album
    .findOne({_id: req.params.id})
    .then(
        album => res.status(200).json(album),
        err => {res.status(500).json(err); console.error(err)}
    );
});

router.delete('/:id',(req,res,next) => { 
    Album
    .deleteOne({_id: req.params.id})
    .then(
        deleteResult => res.status(200).json(deleteResult),
        err => {res.status(500).json(err); console.error(err)}
    );
});

router.delete('/:id/pictures/:pictureId',(req,res,next) => { 
    Album
    .updateOne({_id: req.params.id},{$pull: {pictures: req.params.pictureId}})
    .then(
        updateResult => res.status(200).json(updateResult),
        err => {res.status(500).json(err); console.error(err)}
    );
});

router.patch('/:id', (req,res,next) => {
    Album
    .updateOne({_id: req.params.id},req.body.album)
    .then(
        updateResult => res.status(200).json(updateResult),
        err => {res.status(500).json(err); console.error(err)}
    )
})

module.exports = router;