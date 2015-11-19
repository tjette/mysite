var express = require('express');
var bodyParser = require('body-parser');
var axios = require('axios');

//creating localhost/api/github


var url = "https://api.github.com/users/tjette/events";

fetchGithubEvents = function(req,res){
	axios.get(url)
	  .then(function (response) {
		var myEvents = response.data.slice(0,2).map(function(g){
  			if(g.payload.commits){
    			var coms = g.payload.commits.map(function(c){
      				return {"message": c.message, "url": c.url}
      			})
  			}
      		return { "id": g.id, "timeStamp": g.created_at, "repo": g.repo.name, "coms": coms }
      		});
	    res.json(myEvents);
	  })
	  .catch(function (response) { 
	    console.log(response);
	  });
}

module.exports = fetchGithubEvents;

