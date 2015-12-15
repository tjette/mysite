var React = require('react');
var BlogComment = require('./blogComment');
var prettydate = require('pretty-date');
var md5 = require('MD5');


var BlogList = React.createClass({

    render: function() {
      var self=this;
      var blogData = this.props.data.map(function(blog){
        // if(blog.comments) {

        var commentData = blog.comments.map(function(a){
        var commentDate = prettydate.format(new Date(a.date)) 
        var GRAVATAR_URL = "http://gravatar.com/avatar";

          if(a.user){
            var email = a.user.local.email;
            var hash = md5(email);
            console.log(hash)
            var url = GRAVATAR_URL + "/" + hash;
          } else {
            var email = "Anonymous";
          }
          window.user = a.user;
          window.comm = a.body;
          return (
              <div>
              <div className='panel panel-primary'>
              <img src={url}/> {email}
              </div>
              <div className='panel-body'>
              <p>{commentDate}</p>
              
              <p>{a.body}</p>
              </div>
              </div>
              
          )
        }).reverse();
      
        return (
                <div>
                  <h2><span className="label label-success">{blog.title}</span></h2>
                  <p>{blog.body}</p>
                  <img src={blog.img}/>
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



