const mongoose = require('mongoose');

const albumSchema = mongoose.Schema({
    name: String,
    description: String,
    pictures: [String],
});

module.exports = mongoose.model('Album', albumSchema);