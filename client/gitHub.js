var React = require('react');


var GitHubList = React.createClass({
	render: function(){
	var gitHubData = this.props.data.map(function(git){
		return(
			<div>
				<ul>
					<li>{"id": id}</li> 
					<li>{"type": type}</li> 
					<li>{"repo":repo}</li>
				</ul>
			</div>
		)
	});
		return(
			<div>
			<article>{gitHubData}</article>
			</div>
		)
	}
});	

var GitHubBox = React.createClass({
	getInitialState: function(){
	return(
		{data:[]}
		)
},

	loadGitHubsFromServer: function(){
	$.ajax({
      url: this.props.url,
      dataType: 'json',
      cache: false,
      success: function(data) {
        console.log("inside success")
        this.setState({data: data});
      }.bind(this),
      error:function(xhr, status, err) {
        console.log("broken url is " + this.props.url)
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },

  componentDidMount: function(){
  this.loadGitHubsFromServer();
  },
	render: function() {
        return (
        <div>
          
          <ul>
            <GitHubList data={this.state.data}/>
          </ul>
        </div>
        );
    }
});

module.exports = GitHubBox;