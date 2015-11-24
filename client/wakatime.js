var React = require('react');

var WakaList = React.createClass({
	render: function(){
		var wakaData = this.props.data.map(function(a){
			
      			return(
				<div>
					<p>{a.user}</p>
				</div>
				)
			
		return(
        
          <div className="panel panel-default">
            <h3 className="panel-header">
               {a.name}</h3>
            <div className="panel-body">
               {wakaData}
            </div>
            </div>
       		)
			})
		
	}
});

var WakaBox = React.createClass({
	getInitialState: function(){
	return(
		{data:[]}
		)
},

	loadWakaFromServer: function(){
	console.log("WAKATIME!!!!")
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
