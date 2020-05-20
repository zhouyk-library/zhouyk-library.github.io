///////////////////////////////////////////////
/// 树型标签
/// V 1.0
/// creat by lee
/// https://github.com/miracleren/tagTree
/// 20190529
/// 运行库 juqery
/// //////////////////////////////////////////


;(function($){

	var defaults ={
		id:"",
		data:[],
		fold:true,
		multiple:false,
		check:function(){},
		done:function(){}
	};

	$.fn.tagTree = function(options){
		var that = $(this);
		options.id = "#" + that.attr("id");
        var opts = $.extend(defaults, options);

        that.addClass("tagtree");
        setTree(defaults.data,that);

        $(defaults.id+' li:has(ul)').addClass('li-top');
        if(defaults.fold)
        	$(defaults.id+" .li-top li").hide('fast');
	    $(defaults.id+' li.li-top > span').on('click', function (e) {
	        var child = $(this).parent('li.li-top').find(' > ul > li');
	        if (child.is(":visible")) {
	            child.hide('fast');
	        } else {
	            child.show('fast');
	        }
	        return false;
      });
      
	    $(defaults.id+' li span').click(function(event) {
        const val = $(this).attr("data-val")
        if(val){
          if(!$(this).hasClass('i-check')){
            $('.i-check').removeClass('i-check')
            $(this).addClass('i-check');
            defaults.click(val);
          }
        }
	    	return false;
	    });
	    defaults.done();
	}

	$.fn.tagTreeValues =function(){
		var vals = [];
		$(defaults.id +" .i-check").each(function(index, el) {
			vals.push($(el).attr('data-val'));
		});
		return vals;
	}

	//递归生成树
	function setTree(data,that)
	{
		var ul = $('<ul></ul>');
		that.append(ul);
		$.each(data,function(index,value){
			var li = $('<li><span data-val="'+(!!value.path? value.path :'')+'">'+value.name+'</span></li>');
			ul.append(li);
		    if(value.child.length > 0)
		    {
		    	li.append('<div class="node-count">'+value.child.length+'</div>');
		    	setTree(value.child,li);
		    }
		});
	}
})(jQuery);