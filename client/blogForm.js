var React = require('react');



var BlogForm = React.createClass({
  handleSubmit: function(e) {
    e.preventDefault();
      
      var title = React.findDOMNode(this.refs.title).value.trim(); 
      var body = React.findDOMNode(this.refs.body).value.trim();

      if (!title){
        return;
      }

    var data = ({title: title, body: body});

    $.ajax({
      url: this.props.url,
      dataType: 'json',
      type: 'POST',
      data: data,
      success: function(response) {
        console.log("inside success", data, response)
        document.location='/blog.html'
      }.bind(this),
      error:function(xhr, status, err) {
        console.log("broken url is " + this.props.url)
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    })
  },


  render: function() {
      return (
        <div>
          <form> 
            <div className="form-group" method="POST">
              <label>Blog Title</label>
              <input type="text" ref="title" className="form-control" placeholder="Blog Title"/>
            </div>

            <div className="form-group" method="POST">
              <label>Blog Entry</label>
              <textarea type="text" ref="body" className="form-control" placeholder="Blog Entry"/>
           </div>

        <button onClick={this.handleSubmit} type="submit" className="btn btn-primary">Submit</button>
        </form>
        </div>
        );
    }
});

// var Manage = React.createClass({

//   update: function(id){
//     var id = id;

//   var title = React.findDOMNode(this.refs.title).value.trim(); 
//   var body = React.findDOMNode(this.refs.body).value.trim();

//   if(!name){
//       return;
//     }

//   var data = ({title: title, body: body});
//    $.ajax({
//       url: this.props.url + id,
//       dataType: 'json',
//       data: data,
//       type:'PUT',
//       success: function(response){
//         console.log("posting data!", data, response)
//         document.location='/enter_beer'
//       }.bind(this),
//       error: function(xhr, status, err){
//         console.log("not posting data!")
//         console.error(this.props.url, status, err.toString());
//       }.bind(this)
//     })
//   },

//  getInititalState: function() {

//  } 

// })

React.render(<BlogForm url="/api/blog"/>, document.getElementById('post-blog'));

