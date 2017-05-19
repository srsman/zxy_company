//当前的内容表示的是模块化时间内容，当前的事件的内容是用于元素事件的绑定和事件的预设置。表示的当前页面中的大部分时间的的设置。

var Events = function(){
    //Event事件是时间总体的集合，返回的当前的事件对象本身并且依据但钱用户输入的对象的内容在构造函数中直接为元素绑定事件。
    
    //当前的内容将会返回一个当前的对象内容并可以在这里对其进行相关的操作。
    var events = new Events.prototype.init();

    //对于当前的events对象可以再这里进行相关的实行和方法的添加。
    
    //返回单前新建的对象。
    return events;
}

Events.prototype = {

    //init函数是用于当前的对象初始化的内容的。
    init:function(){
        
        //返回的相关操作。
        
        //返回当前新生的对象。
        return this;   
    },
    
    //绑定元素的对象内容。
    bind:function(ele, eve, callBack){ //ele表示的是当前的需要绑定事件的元素，eve表示的时间类型，callBack表示的是用户编写的回调逻辑，time表示的是当前的对象是否需要延时执行。eve可以为一个字符串和中间通过空格来间隔开来的内容，表示的是PC端和移动端分别要绑定的事件。
        
        //判断当前传入的事件字符串是否为双事件如果为双事件这把当前的对象内容分解开来并做最总判断。
        if((/^\w+\s+\w+$/g).test(eve)){
            //判断正确的话则说明是两个事件
            eve = eve.split(" ");
            if((/(Android|iPod|iPad|iPhone|IOS)/g).test(navigator.userAgent)){
                eve = eve[1];
            }
            else {
                eve = eve[0];   
            }
        }
        //到此时我们eve变量将会是我们最终要绑定的事件的类型。
        
        //这里只适配IE9版本以上的内容。和其他主流的浏览器。
        ele.addEventListener(""+eve, callBack,false);
        
    },
};

Events.prototype.init.prototype = Events.prototype;

//当前属性的style属性或是class属性的编辑
var addClass = function(ele, className){
    //为当前的的对象添加class
    var origin = ele.getAttribute("class");
    if(!origin){
        origin = "";   
    }
    origin += " "+className;
    ele.setAttribute("class", ""+origin);
}

//删除当前的某一个class值
var removeClass = function(ele, className){
    
    var origin = ele.getAttribute("class");
    if(!origin){
        origin = new Array();   
    }
    else {
        origin = origin.split(" ");
    }
    
    for(var i = 0 ; i < origin.length ; i++){
        if(origin[i] == className){
            origin.splice(i,1);   
            break;
        }
    }
    
    var final = "";
    for(var i = 0 ; i < origin.length ; i++){
        final += origin[i];
        if(i != origin.length-1){
            final += " ";   
        }
    }
    
    ele.setAttribute("class", ""+final);
}

//添加样式
var addStyle = function(ele, styles){
    
    var origin = ele.getAttribute("style");
    
    if(!origin){
        origin = "";   
    }
    if((/display/g).test(styles) && (/display:none;/g).test(origin)){
        origin += "";
    }
    else {
        origin += styles;
    }
    ele.setAttribute("style", ""+origin);
}

//删除某一样式
var removeStyle = function(ele, styles){
    
    var origin = ele.getAttribute("style");
    if(!origin){
        origin = new Array();   
    }
    else {
        origin = origin.split(";");   
    }
    
    for(var i = 0 ; i < origin.length ; i++){
        if(origin[i] == styles || origin[i].split(":")[0] == styles){
            origin.splice(i,1);
            break;
        }
    }
    
    var final = "";
    
    for(var i = 0 ; i < origin.length ; i++){
        if(origin[i]){
            final += origin[i]+";";   
        }
    }
    ele.setAttribute("style", ""+final);
}

//预定义的方法对象内容定义在外为了方便直接的调用的。
//跳转到指定的页面。
var moveTo = function(href, newPage){
    document.body.setAttribute("style", "animation:opShow3 0.7s 0s ease-in both;");
    setTimeout(function(){
        location.href = ""+href;
    },800);
    
}

//隐藏页面元素的内容。
var hidden = function(ele){
    addStyle(ele, "display:none;");
}

//显示页面元素内容。
var show = function(ele){
    
    removeStyle(ele, "display");
    
}

var showDialogContent = null;

//显示悬浮窗内容
var showDialog = function(content, style){
            
    var dialog = document.createElement("div");
    dialog.setAttribute("class",""+style);
    dialog.innerHTML = "" + content;
    showDialogContent = dialog;
    document.getElementById("container").appendChild(dialog);

}

//悬浮窗内容删除
var closeDialog = function(){
    
    if(window.showDialogContent){
        document.getElementById("container").removeChild(showDialogContent);   
    }
    
}

//转换元素中的内容。并返回原内容
var exchangeInner = function(ele, newContent){
    
    var oldContent = ele.innerHTML;
    
    ele.innerHTML = newContent;
    
    return oldContent;
    
}