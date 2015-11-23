var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({ extended: true }))

  router.route('/')
    .get(function(req,res){
      mongoose.model('Blog').find({})
      .populate('comments')
      .exec(function(err, blog){
          if(err)
            res.send(err)
          res.send(blog)
        }
        )
    })

  .post(function(req, res){
    var title = req.body.title;
    var body = req.body.body;
    mongoose.model('Blog').create({
      title: title,
      body: body
    }, function(err, blog){
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
        _id: req.params.id }).populate('comments').exec(function(err, blog) {
          if (err)
            res.send(err);
    
        res.json(blog);
        });
     })

    // update with this id (accessed at PUT http://localhost:8080/api/bears/:id)
   .put(function(req, res) {
      mongoose.model('Blog').findById({
        _id: req.params.id }, function(err, blog) {
        
        console.log(req.body.title + " : " + req.body.body);
        blog.title = req.body.title;  // update the blog info
        blog.body = req.body.body;
          if (err)
            res.send(err);
    
        blog.save();
        res.send(blog);

          res.json({ message: 'Blog was updated!' });
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

router.route('/:id/comment')
  .post(function(req, res) {
    console.log("GOING INSIDE COMMENT POST")
    var body = req.body.body;
    var user = req.user;
        mongoose.model('Comment').create({
            body: body,
            user: user,
            blog: req.params.id
        }, function(err, comment) {
            if (err)
                return res.send(err);
            mongoose.model('Blog').findById({
              _id: req.params.id
            }, function(err, blog){
              if(err)
                return res.send(err)
              blog.comments.push(comment._id)
              blog.save();
              console.log("Creating new comment", comment)
              res.json(comment)
            })
        });
    })

router.route('/:id/comments')
 .get(function(req, res){
   mongoose.model('Blog').findById({_id: req.params.id})
    .populate('comments').exec(function(err, comments){
     if(err)
       res.send(err);
     res.send(comments);
    });
 });

module.exports = router;