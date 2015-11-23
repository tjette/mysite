var mongoose = require('mongoose');

var blogSchema = new mongoose.Schema({
	title: String,
	body: String,
	comments: [{type: mongoose.Schema.Types.ObjectId, ref: 'Comment'}],
	date: { type: Date, default: Date.now }
});

mongoose.model('Blog', blogSchema);