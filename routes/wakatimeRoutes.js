var express = require('express');
var bodyParser = require('body-parser');
var axios = require('axios');

var url="https://wakatime.com/api/v1/users/current/stats/?api_key=8eb45a96-c89f-4d5f-83c6-3a554570a10b";

fetchWaka = function(req,res){
	axios.get(url)
	  .then(function (response) {
		var user = response.data.map(function(waka){
  			if(waka.languages.name){
      		return {"name": waka.name}
      		}
      	});
	    	res.json(user);
	    	console.log(user)
	  })
	  console.log(user)
	  .catch(function (response) { 
	    console.log(response);
	  });
}

module.exports = fetchWaka;

