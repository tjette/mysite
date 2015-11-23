var React = require('react');
var BlogBox = require('./blog');

React.render(<BlogBox url="/api/blog/"/>, document.getElementById("blog-list"));