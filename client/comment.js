var React = require('react');
var CommentBox = require('./CommentBox');

var CommentBox = React.createClass({

	loadCommentsFromServer: function() {
    	$.ajax({
      url: this.props.url,
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    	});
	},	

	handleCommentSubmit: function() {
		$.ajax({
      url: this.props.url,
      dataType: 'json',
      type: 'POST',
      data: comment,
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });

	},
	
	getInitialState: function() {
		return {data: []};
	},

	componentDidMount: function() {
		 this.loadCommentsFromServer();
  	},
	render: function() {
		return(
			<div>
			<h1>Comments</h1>
			<CommentList data={this.state.data} />
			<CommentForm onCommentSubmit={this.handleCommentSubmit} />
			</div>
		)
	}
})



var CommentList = React.createClass({
	render: function() {
		var commentNodes = this.props.data.map(function (comment) {
			return(
			<div>	
			<Comment author={comment.author}>
			{comment.text}
			</Comment>
			</div>
			)
		});
		
		return (
			<div>
				{commentNodes}
			</div>
		)
	}
})

var CommentForm = React.createClass({
	handleSubmit: function(e) {
    e.preventDefault();
    var author = this.refs.author.value.trim();
    var text = this.refs.text.value.trim();
    if (!text || !author) {
      return;
    }
    // TODO: send request to the server
    this.props.onCommentSubmit({author: author, body: body});
    this.refs.author.value = '';
    this.refs.text.value = '';
    return;
  },
  render: function() {
    return (
      <form className="commentForm" onSubmit={this.handleSubmit}>
        <input type="text" placeholder="Your name" ref="author" />
        <textarea type="text" placeholder="Say something..." ref="text" />
        <input type="submit" value="Comment" />
      </form>
    );
  }
});

module.exports = CommentBox;

React.render(<CommentBox url="/api/comment"/>, document.getElementById('comment'));