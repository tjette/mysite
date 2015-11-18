var express = require('express');
var bodyParser = require('body-parser');
var axios = require('axios');

var url = "https://api.github.com/users/tjette/events";
console.log("hello")
fetchGitHubEvents = function(req, res){
	console.log("git")
	axios.get(url)
	.then(function(response){
		var myEvents = response.data.map(function(i) {
  return{"id": i.id, "type": i.type, "repo": i.repo}


});
		
		res.json(myEvents);
	})
	.catch(function(response){
		console.log(response.data);
	});
} 

module.exports = fetchGitHubEvents;