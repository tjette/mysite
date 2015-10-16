var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true }));

var validBlogs = [];

function filterByTitle(obj) {
 if ('title' in obj && typeof(obj.title) === 'string') {
   validBlogs.push(obj);
   return true;
 } else {
   return false;
 }
};



router.use(function(req, res, next) {
  console.log("Something is happening");
  next();
});

router.routes('/blog')

/* GET All Blogs */

 .get(function(req, res) {
   mongoose.model('blog').find({}, function(err, blog){
     if(err){
       return console.log(err);
     } else {
       var arrByTitle = blog.filter(filterByTitle);
       res.json(arrByTitle);
     }
   });
 })

 .post(function(req, res){
   var title = req.body.title;
   var body = req.body.body;

   mongoose.model('blog').create({
     title: title,
     body: body
   }, function(err, blog){
     if(err){
       res.send("houston we have a problem")
     } else{
       console.log("New blog named " + blog + "created!");
       res.send(blog);
     }
   });
 });


 router.route('/:id')
   .get(function(req, res) {
       mongoose.model('blog').findById({
           _id: req.params.id
       }, function(err, blog) {
           if (err)
               res.send(err);

           res.json(blog);
       });
   })

   // update the bear with this id (accessed at PUT http://localhost:8080/api/bears/:id)
   .put(function(req, res) {
       mongoose.model('blog').findById({
           _id: req.params.id,
           title: req.params.title,
           body: req.params.body
       }, function(err, blog) {
           if (err)
               res.send(err);

           res.json(blog);
           res.send("blog was updated")
       });
   })
   // delete the bear with this id (accessed at DELETE http://localhost:8080/api/blogs/:id)
   .delete(function(req, res) {
       mongoose.model('blog').remove({
           _id: req.params.id
       }, function(err, blog) {
           if (err)
               res.send(err);

           res.json({ message: 'Successfully deleted' });
       });
   });

module.exports = router;