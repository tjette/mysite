var React = require('react');


var BlogComment = React.createClass({

	alertMe: function(e){
		alert("hello");
		e.preventDefault();
	},

	handleSubmit: function(e) {
		console.log("handleSubmit fired")

		e.preventDefault();
		
		
		var blogId = this.props.blogId;
		console.log(body, blogId)
	
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
                console.log("posting data!",data, response)
                document.location='/blog.html'
                }.bind(this),
                error: function(xhr, status, err){
                    console.log("not posting data!")
                    console.error( status, err.toString());
                }.bind(this)
        });
       
	},

	render: function() {
      return (
        <div>
          <form> 
            <div className="form-group">
              <label>Blog Title</label>
              <input type="text"  className="form-control" placeholder="Blog Title"/>
            </div>

            <div className="form-group">
              <label>Blog Entry</label>
              <textarea type="text" className="form-control" placeholder="Blog Entry"/>
           </div>

        <button type="submit" onClick={this.alertMe}  className="btn btn-primary">Submit</button>
        </form>
        </div>
        );
    }

});

module.exports = BlogComment;