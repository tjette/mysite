var React = require('react');

var BlogBox = require('./blog');
var GitHub = require('./github')

React.render(<BlogBox url="/api/blog/"/>, document.getElementById("blog-list"));
React.render(<GitHub url="/api/github"/>, document.getElementById("github"));