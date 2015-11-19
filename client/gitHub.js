var React = require('react');


var GitHubList = React.createClass({
	render: function(){
	var gitHubData = this.props.data.map(function(git){
		if(git.coms) {
		var commitInfo = git.coms.map(function(c){
			return(
				<div>
					<p>{c.message}</p>
					
				</div>
				)
		})
	}
		return(
        
          <div className="panel panel-default gitub-box">
            <h3 className="panel-header"><i className="fa fa-code-fork">
              </i> {git.name}</h3>
            <div className="panel-body">
               {commitInfo}
            </div>
            <div className="panel-footer">
            <p> {git.timeStamp}</p>
            </div>
            </div>
       
        )
    });
		return(
			<div className="col-md-4">
			<span>{gitHubData}</span>
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
	console.log("RIGHT BEFORE AJAX")
	$.ajax({
      url: "/api/github/",
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
          <GitHubList data={this.state.data}/>
        </div>
        );
    }
});

module.exports = GitHubBox;