var React = require('react');


var BlogComment = React.createClass({
	handleSubmit: function(e) {
		console.log("handleSubmit fired")

		e.preventDefault();
		var body = this.refs.body.getDOMNode().value;
		var blogId = this.props.blogId;
		var data = ({body: body});


		if(!body){
			return;
		}

		$.ajax({
            url: '/api/blog/'+ blogId +'/comment',
            dataType: 'json',
            data: data,
            type:'POST',
                success: function(response){
                	if(this.props.onPost){
                		this.props.onPost()
                	}
                console.log("posting data!",data, response)
                }.bind(this),
                error: function(xhr, status, err){
                    console.log("not posting data!")
                    console.error( status, err.toString());
                }.bind(this)
        })
        this.refs.body.getDOMNode().value = ''
    },

	render: function() {
      return (
        <div>
        	<form> 
          		<div className="form-group">
              		<label>Comment</label>
              		<textarea type="text" ref="body" className="form-control" placeholder="Comment Entry"/>
           		</div>
					<button type="button" onClick={this.handleSubmit} className="btn btn-primary">Submit</button>
        	</form>
        </div>
        );
    }
});

module.exports = BlogComment;






