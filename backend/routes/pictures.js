const express = require('express');
const router = express.Router();
const Picture = require('../models/picture');
const multer = require('multer');

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
    console.log(picture, req.body);
    picture.save().then(result => {
        res.status(200).json(result)
    })
})

router.get('',(req,res,next) => {
    Picture.find().then((images) => {
        res.status(200).json(images);
    });
});

router.patch('/:id',(req,res,next) => {
    const url = req.protocol + '://' + req.get('host');
    const picture = new Picture({
        name: req.body.name,
        description: req.body.description,
        url: url + '/images/' + req.file.filename,
    });
    Picture.updateOne({_id: req.params.id});
})

router.delete('/:id',(req,res,next) => { 
    console.log(req.params)
    Picture.deleteOne({_id: req.params.id}).then(result => {
        res.status(200).json(result);
    });
});

module.exports = router;