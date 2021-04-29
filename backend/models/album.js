const mongoose = require('mongoose');

const albumSchema = mongoose.Schema({
    title: String,
    tags: [String],
});

module.exports = mongoose.model('Album', albumSchema);