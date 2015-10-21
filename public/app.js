var BlogList = React.createClass({
    render: function() {
      var blogData = this.props.data.map(function(blog){
        return (
                <div>
                  <h2>{blog.title}</h2>
                  <article>{blog.body}</article>
               </div>
        )
    });

        return (
                <div>
                   <article>{blogData}</article>
         
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
        );
    }
});



React.render(<BlogBox url="/api/blog/"/>, document.getElementById("blog-list"));

