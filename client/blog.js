var React = require('react');
var BlogComment = require('./blogComment');

var BlogList = React.createClass({

    render: function() {
      
      var blogData = this.props.data.map(function(blog){
        if(blog.comments) {
        var commentData = blog.comments.map(function(a){
          return (
              <div>
              {a.body}
              </div>
          )
        });
      }
        return (
                <div>
                  <h2>{blog.title}</h2>
                  <p>{blog.body}</p>
                

                
                  {commentData}
                  <BlogComment blogId={blog._id}/>
               </div>
        )
    });

        return (
                <div>
                   <ul>
                   {blogData}
                   </ul>
         
                </div>
        );
    }
});

var BlogBox = React.createClass({
  getInitialState: function() {
    return {data: []};
  },


  loadBlogsFromServer: function() {
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

  componentDidMount: function() {
    this.loadBlogsFromServer();
  },
    render: function() {
        return (
        <div>
          <ul>
            <BlogList data={this.state.data}/>
          </ul>
        </div>
        )
    }
});

module.exports = BlogBox;



