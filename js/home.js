$(document).ready(function() {
  function generate(treeMenue, par) {
    treeMenue.forEach(item => {
      var ele = document.createElement('li');
      if (!item.child || item.child.length === 0) {
        ele.innerHTML = item.name;
        ele.onclick = renderMarkEvent;
        ele.setAttribute("path", item.path)
      } else {
        ele.innerHTML = '<span onclick="nodeclickevent(this)"><span class="switch-open"></span>' + item.name + '</span>';
        var nextpar = document.createElement('ul');
        ele.appendChild(nextpar);
        generate(item.child, nextpar);
      }
      par.appendChild(ele);

    })
  }
  generate(window.treeMenue, document.getElementsByClassName('left-tree-container')[0]);


});

//处理展开和收起
function nodeclickevent(eve) {
  var par = eve.nextElementSibling;
  if (par.style.display == 'none') {
    par.style.display = 'block';
    // eve.className = 'switch-open';
  }
  else {
    par.style.display = 'none';
    // eve.className = 'switch-close';
  }
}


function renderMarkEvent(eve) {
  var path = eve.toElement.getAttribute("path");
  $.get(path + ".md", function(data) {
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