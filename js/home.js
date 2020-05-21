$(document).ready(function() {
  var hash = location.hash
  var path = []
  if(!!hash){
    path = hash.substring(1,hash.length).split("/")
    path = path.slice(2,path.length)
  }
  $("#tree-container").tagTree({
    id:"",
    data:window.treeMenue,
    fold:true,
    openName:path,
    multiple:false,
    click:function(val){
      val && val != 'undefined' && renderMarkEvent(val)
    },
    done:function(){
      console.log('tagTree is ok!');
    }
  });
});

function renderMarkEvent(path) {
  location.hash = '#'+path
  $.get(path + "?timestep=" + (new Date().getTime()), function(data) {
    $("#html-context").html(renderMark2Html(data));
  });
}

hljs.initHighlightingOnLoad();
const renderer = new marked.Renderer();

marked.setOptions({
  renderer,
  gfm: true,
  tables: true,
  breaks: false,
  pedantic: false,
  sanitize: false,
  smartLists: true,
  highlight: function(code) {
    return hljs.highlightAuto(code).value;
  }
});

function renderMark2Html(markText) {
  return marked(markText);
}