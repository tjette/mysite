var React = require('react');
var prettydate = require('pretty-date');
var BlogComment = require('./blogComment');

var BlogList = React.createClass({

    render: function() {
      var self=this;
      var blogData = this.props.data.map(function(blog){
        // if(blog.comments) {

        var commentData = blog.comments.map(function(a){
        var commentDate = prettydate.format(new Date(a.date))

          if(a.user){
            var user = a.user.local.email;
          } else {
            var user = "anonymous";
          }
          window.user = a.user;
          window.comm = a.body;
          return (
              <div className="comment-box">
              <h6>{user}</h6>
              <p>{commentDate}</p>
              <p>{commentData}</p>
              <p>{a.body}</p>

              </div>
          )
        }).reverse();
      
        return (
                <div>
                  <h2>{blog.title}</h2>
                  <p>{blog.body}</p>
                  <p>{commentData}</p>
                  <BlogComment blogId={blog._id} onPost={self.props.newData}/>
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
      var self=this;
      var doRefresh = function(){
        self.loadBlogsFromServer();
      }
        return (
        <div>
          <ul>
            <BlogList data={this.state.data} newData={doRefresh}/>
          </ul>
        </div>
        )
    }
});

module.exports = BlogBox;



