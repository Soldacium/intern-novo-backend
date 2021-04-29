const mongoose = require('mongoose');

const imageSchema = mongoose.Schema({
    title: String,
    tags: [String],
});

module.exports = mongoose.model('Album', imageSchema);