const express = require('express');
const router = express.Router();
const Image = require('../models/picture');
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

router.put('', multer({storage: storage}).single('image'), (req, res, next) => {
    const url = req.protocol + '://' + req.get('host');
})

router.get('',(req,res,next) => {
    Image.find().then((images) => {
        res.status(200).json(images);
    });
});

router.get('/:id',(req,res,next) => {
    Image.find().then((images) => {
        res.status(200).json(images);
    });
});

router.patch('/:id',(req,res,next) => {
    Image.updateOne({_id: req.params.id});
})

router.delete('/:id',(req,res,next) => { 
    Image.deleteOne({_id: req.params.id}).then(result => {
        res.status(200).json(result);
    });
});

module.exports = router;