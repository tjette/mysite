var React = require('react');

var WakaList = React.createClass({
	render: function(){
		var wakaData = this.props.data.map(function(a){
			var languages = a.languages.map(function(b){
			
				return(
				<div>
					<li>{b.name} - {b.percent}%</li>

				</div>
					)
				})
			
		return(
        
        	
        
            <div className="well">
            <h3> WakaTime Data</h3>
            {languages}
            </div>
          	 )
		});

		return(
			<div>
				<span>{wakaData}</span>	
			</div>
			)
	}
});

var WakaBox = React.createClass({
	getInitialState: function(){
	return(
		{data:[]}
		)
},

	loadWakaFromServer: function(){
	console.log("wakatime");
	$.ajax({
      url: "/api/wakatime/",
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
  this.loadWakaFromServer();
  },
	render: function() {
        return (
        <div>
          <WakaList data={this.state.data}/>
        </div>
        );
    }
});

module.exports = WakaBox;
