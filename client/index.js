var React = require('react');


var GitHubBox = require('./gitHub');
var WakaBox = require('./wakatime');

React.render(<GitHubBox />, document.getElementById("github"));
React.render(<WakaBox />, document.getElementById("wakatime"));

