const mongoose = require('mongoose');

const pictureSchema = mongoose.Schema({
    name: String,
    description: String,
    url: String
});

module.exports = mongoose.model('Picture', pictureSchema);