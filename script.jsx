// Code goes here

var pad = function(n, width, z) {
  z = z || '0';
  n = n + '';
  return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}

var formatLastYearDate = function(d) {
  var d = new Date();
  d.setFullYear(d.getFullYear() - 1);
  return d.getFullYear() + '/' + pad((d.getMonth() + 1),2,'') + '/' + pad(d.getDate(),2,'');
};


var SearchResults = React.createClass({
  getInitialState: function() {
    return {res:{items: []}, term: 'שקשוקה', where:'תל אביב'};
  },
  componentDidMount: function() {
    this._getRes();
  },
  _getRes: _.debounce(function(){
    var that = this;
    

    $.getJSON('https://www.googleapis.com/customsearch/v1?cx=000906061606609421206:dphwd3wqns8&key=AIzaSyB7Wa01pcFXsDLi5mkicHlrcIG1U3qOVWU&q=' + 
      encodeURIComponent('"' + this.state.term + '"') +
      '%20-%D7%9E%D7%AA%D7%9B%D7%95%D7%A0%D7%99%D7%9D%20-%D7%9E%D7%AA%D7%9B%D7%95%D7%9F%20-%22%D7%A7%D7%9C%20%D7%9C%D7%94%D7%9B%D7%A0%D7%94%22%20%D7%AA%D7%A4%D7%A8%D7%99%D7%98%20' +
      encodeURIComponent('+"' +this.state.where + '"'),
      function(res){
	console.log(res);
	that.setState({res: res});
      });
  },500),
  setTerm: function(e) {
    this.setState({term:e.target.value});
    this._getRes();
  },
  setWhere: function(e) {
    this.setState({where:e.target.value});
    this._getRes();
  },
  render: function() {
    var resultsdom = this.state.res.items.map(function(r){
      return (<div className="result">
        <a href={r.link} target="_blank">{r.title}</a>
        <div className="snippet">
        <pre dangerouslySetInnerHTML={{__html: r.htmlSnippet}}></pre>
        </div>
        </div>);
    });
    return (
      <div>
      <div className="searchboxwrap">
      <input id="term" type="text" placeholder="EAT WHAT?" onChange={this.setTerm} value={this.state.term} />
      <input id="where" type="text" placeholder="WHERE EAT?" onChange={this.setWhere} value={this.state.where}/>
      </div>
      <div className="results">{resultsdom}</div>
      </div>);
  }
});

React.render(
  <SearchResults />,
  document.getElementById('example')
);


