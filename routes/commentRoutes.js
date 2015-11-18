var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var Comment = require('../model/comment');

router.use(bodyParser.urlencoded({ extended: true }))

router.route('/')
  .get(function(req, res) {
    mongoose.model('Comment').find({}, function(err, comment){
     if(err){
       return console.log(err);
     } else {
       
       res.json(comment);
     }
    });
  })

  .post(function(req, res){
    var author = req.body.author;
    var body = req.body.body;
    mongoose.model('Comment').create({
      author: author,
      body: body
    },

    function(err, comment){
      if(err){
        res.send("houston we have a problem")
      } else {
        console.log("New comment named " + comment + "created!");
        // res.redirect("/blog.html");
       res.send(comment);
      }
    });
  });

router.route('/:id')

.delete(function(req, res) {
       mongoose.model('Comment').remove({
           _id: req.params.id
       }, function(err, comment) {
           if (err)
               res.send(err);
               res.json({ message: 'Successfully deleted' });
       });
   });

module.exports = router; 