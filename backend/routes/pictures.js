const express = require('express');
const router = express.Router();
const Picture = require('../models/picture');
const multer = require('multer');
const Album = require('../models/album');

const MIME_TYPE = {
    'image/png' : 'png',
    'image/jpeg' : 'jpg',
    'image/jpg' : 'jpg'
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const isValid = MIME_TYPE[file.mimetype]
        let error = new Error('invalid mime type')
        if (isValid){
            error = null;
        }
        cb(error, 'backend/images');
    },
    filename: (req,file,cb) => {
        const name = file.originalname.toLowerCase().split(' ').join('-');
        const ext = MIME_TYPE[file.mimetype];
        cb(null,name + Date.now() + '.' + ext)
    }
});

router.post('', multer({storage: storage}).single('image'), (req, res, next) => {
    const url = req.protocol + '://' + req.get('host');
    const picture = new Picture({
        name: req.body.name,
        description: req.body.description,
        url: url + '/images/' + req.file.filename,
    });
    picture
    .save()
    .then(
        picture => res.status(200).json(picture),
        err => {res.status(500).json(err); console.error(err)}
    )
})

router.get('',(req,res,next) => {
    Picture
    .find()
    .then(
        pictures => res.status(200).json(pictures),
        err => {res.status(500).json(err); console.error(err)}
    );
});

router.get('/:id',(req,res,next) => {
    Picture
    .findOne({_id: req.params.id})
    .then(
        picture => res.status(200).json(picture),
        err => {res.status(500).json(err); console.error(err)}
    );
});

router.patch('/:id',(req,res,next) => {
    const picture = new Picture({
        name: req.body.name,
        description: req.body.description,
        url: req.body.url,
    });
    Picture
    .updateOne({_id: req.params.id},picture)
    .then(
        updateResult => res.status(200).json(updateResult),
        err => {res.status(500).json(err); console.error(err)}
    );
})

router.delete('/:id',(req,res,next) => { 
    Picture
    .deleteOne({_id: req.params.id})
    .then(deleteResult => 
        {
            Album
            .updateMany({},{$pull: {pictures: req.params.id}})
            .then(
                updatedAlbums => res.status(200).json(deleteResult),
                err => {res.status(500).json(err); console.error(err)}
            )    
        },
        err => {res.status(500).json(err); console.error(err)}
    );
});

module.exports = router;