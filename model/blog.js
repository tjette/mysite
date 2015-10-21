// models/blog.js

var mongoose     = require('mongoose');

var BlogSchema   = new mongoose.Schema({
    title: String,
    body: String
});

module.exports = mongoose.model('Blog', BlogSchema);