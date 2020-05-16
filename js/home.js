$(document).ready(function() {
  function generate(treeMenue, par) {
    treeMenue.forEach(item => {
      var ele = document.createElement('li');
      if (!item.child || item.child.length === 0)
        ele.innerHTML = item.name;
      else {
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