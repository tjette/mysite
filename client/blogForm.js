var React = require('react');



var BlogForm = React.createClass({
  handleSubmit: function(e) {
    console.log("posting")
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
            <div className="form-group">
              <label>Blog Title</label>
              <input type="text" ref="title" className="form-control" placeholder="Blog Title"/>
            </div>

            <div className="form-group">
              <label>Blog Entry</label>
              <textarea type="text" ref="body" className="form-control" placeholder="Blog Entry"/>
           </div>
            

        <button onClick={this.handleSubmit} type="submit" className="btn btn-primary">Submit</button>
        </form>
        </div>
        );
    }
});

var Manage = React.createClass({

  update: function(id){
    var id = id;

  var title = React.findDOMNode(this.refs.title).value.trim(); 
  var body = React.findDOMNode(this.refs.body).value.trim();

  if(!title || !body){
      return;
    }

  var data = ({title: title, body: body});

   $.ajax({
      url: this.props.url + id,
      dataType: 'json',
      data: data,
      type:'PUT',
      success: function(response){
        console.log("posting data!", data, response)
        document.location='postblog.html'
      }.bind(this),
      error: function(xhr, status, err){
        console.log("not posting data!")
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    })
  },

 getInititalState: function() {
  return{
    fltr: null
    };
  }, 

  toggle: function(title) {
    console.log(title);
    this.setState({
      fltr: title
    })
  },

  render: function() {
    var updateBlogForm = this.props.data.map(function(blog){
      if (blog.title === this.state.fltr)
        return (
          <form> 
            <h3>{blog.title}</h3>
            <div className="form-group">
              <label>Blog Title</label>
              <input type="text" ref="title" className="form-control" defaultValue={blog.title}/>
            </div>

            <div className="form-group">
              <label>Blog Entry</label>
              <textarea type="text" ref="body" className="form-control" defaultValue={blog.body}/>
           </div>

        <button onClick={this.update.bind(this, blog._id)} type="submit" className="btn btn-primary">Submit {blog.title}</button>
        </form>
          )
    }.bind(this));

  var blogData = this.props.data.map(function(blog){
     return (
       <div>
            <table className="table">
                   <tbody>
                     <tr>
                      <td style={{width:"80%"}}>{blog.title}</td>
                      <td style={{width:"10%"}}><button onClick={that.toggle.bind(that, blog.title)}><i className="fa fa-pencil"></i></button></td>
                      <td style={{width:"10%"}}><button onClick={that.update.bind(this, blog._id)}><i className="fa fa-minus-circle" ></i></button></td>
                      // <td style={{width:"10%"}}><button  onClick={that.deleteClick.bind(this, beer._id)}><i className="fa fa-eye" ></i></button></td>

                     </tr>
                   </tbody>
                 </table>
       </div>
       )
   });

return (

  <div className="container">
  <h1>Blogs:</h1>
  <div className="col-md-4 Update">
  {blogData}
  </div>
  <div className="col-md-8">
  {update}
  </div>
  </div>
  );
}
});

var App = React.createClass({
  getInitialState: function(){
    return {data: []};
  },

  loadBlogs: function(blog) {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      cache: false,
      success: function(data){
        console.log("inside success")
        this.setState({data:data});
      }.bind(this),
      error: function(xhr, status, err){
        console.log("Broken url is " + this.props.url)
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },

  componentDidMount: function(){
    this.loadBlogs();
  },


  render: function() {
    return (
      <div>
      <Manage data={this.state.data} url="/api/blog/"/>
      </div>
      )
  }
})



React.render(<BlogForm url="/api/blog"/>, document.getElementById('post-blog'));
React.render(<App url="/api/blog/"/>, document.getElementById('allBlogs'));

