var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var Blog       = require('../model/blog');


router.use(bodyParser.urlencoded({ extended: true }))

router.route('/')
  .get(function(req, res) {
    mongoose.model('Blog').find({}, function(err, blog){
     if(err){
       return console.log(err);
     } else {
       
       res.json(blog);
     }
    });
  })

  .post(function(req, res){
    var title = req.body.title;
    var body = req.body.body;
    mongoose.model('Blog').create({
      title: title,
      body: body
    },

    function(err, blog){
      if(err){
        res.send("houston we have a problem")
      } else {
        console.log("New blog named " + blog + "created!");
        // res.redirect("/blog.html");
       res.send(blog);
      }
    });
  });

router.route('/:id')
  .get(function(req, res) {
    mongoose.model('Blog').findById({
      _id: req.params.id
    }, function(err, blog) {
      if (err)
        res.send(err);            
      res.json(blog);
    });
  })

    // update with this id (accessed at PUT http://localhost:8080/api/bears/:id)
   .put(function(req, res) {
      Blog.findById(req.params.id, function(err, blog) {
        if (err)
          res.send(err);

        console.log(req.body.title + " : " + req.body.body);
        blog.title = req.body.title;  // update the blog info
        blog.body = req.body.body;
        console.log(JSON.stringify(blog));

        // save the bear
        blog.save(function(err) {
          if (err)
            res.send(err);

          res.json({ message: 'Blog was updated!' });
        });
      });
    })

   // delete with this id (accessed at DELETE http://localhost:8080/api/blogs/:id)
   .delete(function(req, res) {
       mongoose.model('Blog').remove({
           _id: req.params.id
       }, function(err, blog) {
           if (err)
               res.send(err);
               res.json({ message: 'Successfully deleted' });
       });
   });

module.exports = router; 