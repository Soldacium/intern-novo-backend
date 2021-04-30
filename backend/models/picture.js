const mongoose = require('mongoose');

const pictureSchema = mongoose.Schema({
    title: String,
    description: String,
    url: String
});

module.exports = mongoose.model('Picture', pictureSchema);