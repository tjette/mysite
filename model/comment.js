var mongoose     = require('mongoose');

var CommentSchema   = new mongoose.Schema({
    author: String,
    body: String
});

module.exports = mongoose.model('Comment', CommentSchema);