//统一处理页面的统一逻辑和同一事件的绑定内容。

var _SINGLE = 1;

var _MULT = 2;

var _JUDGE = 3;

var _WIDTH = 640;

var _HEIGHT = 1008;

this.controller = Controller(location.href);
this.events = Events();

//设置当前的内容显示
var setContainer = function(){
    var container = document.getElementById("container");
    if((/Android|iPhone|iPad|IOS|iPod/g).test(navigator.userAgent)){
        addStyle(container, "width:100%;height:100%;");   
    }
    else {
        var height = document.body.offsetHeight;  
        var width = height * (_WIDTH/_HEIGHT);
        addStyle(container, "width:"+width+"px;height:"+height+"px;");
    }
}

setContainer();

//替换当前元素中的data内容
var exchangeData = function(id, content){
    if(document.getElementById(""+id)){
        var inner = document.getElementById(""+id).innerHTML;
        inner = inner.replace(/data/g, ""+content);
        document.getElementById(""+id).innerHTML = inner;
    }
}

var base = controller.getBaseData();
    
exchangeData("score", ""+base.score);

exchangeData("total", ""+base.total+"/300");

var level = controller.HrefOp.level;
var count = level > 1 ? (level > 2 ? base.manage : base.business): base.tech;
var limit = level > 1 ? (level > 2 ? HIGH_QUES : SENIOR_QUES) : PRIMARY_QUES;

exchangeData("partTotal", ""+count+"/"+limit);

var _currentHelpPage = 1;

var helpBtn = function(){
    if(document.getElementById("helpBtn")){
        events.bind(document.getElementById("helpBtn"), "click click", function(ev){
            document.getElementById("helpVideo").currentTime = 0;
            document.getElementById("helpVideo").play();
            showDialog("<div id='exchangePage1' class='exchangePageOne'></div><div id='exchangePage2' class='exchangePageTwo1' hidden='hidden'></div>","dialog");
            events.bind(showDialogContent, "click click", function(ev){
                closeDialog(); 
                _currentHelpPage = 1;
            });
            events.bind(document.getElementById("exchangePage1"), "click click", function(ev){
                var ele = showDialogContent;
                _currentHelpPage ++;
                if(_currentHelpPage == 2){
                    ele.setAttribute("style", "background-image:url(./pic/help_2.png);")
                    document.getElementById("exchangePage1").setAttribute("class", "exchangePageOne1");
                    document.getElementById("exchangePage2").setAttribute("class", "exchangePageTwo1");
                    document.getElementById("exchangePage2").removeAttribute("hidden");
                }
                else if(_currentHelpPage == 3){
                    ele.setAttribute("style", "background-image:url(./pic/help_0.png);")
                    document.getElementById("exchangePage1").setAttribute("hidden", "hidden");
                    document.getElementById("exchangePage2").setAttribute("class", "exchangePageTwo");  
                }
                var e = ev || window.event;
                if (e.stopPropagation){
                    e.stopPropagation();    
                }
                else{
                    e.cancelBubble=true;
                }
            });
            events.bind(document.getElementById("exchangePage2"), "click click", function(ev){
                var ele = showDialogContent;
                _currentHelpPage --;
                if(_currentHelpPage == 2){
                    ele.setAttribute("style", "background-image:url(./pic/help_2.png);")
                    document.getElementById("exchangePage1").setAttribute("class", "exchangePageOne1");
                    document.getElementById("exchangePage2").setAttribute("class", "exchangePageTwo1");
                    document.getElementById("exchangePage1").removeAttribute("hidden");
                }
                else if(_currentHelpPage == 1){
                    ele.setAttribute("style", "background-image:url(./pic/help_1.png);")
                    document.getElementById("exchangePage2").setAttribute("hidden", "hidden");
                    document.getElementById("exchangePage1").setAttribute("class", "exchangePageOne");  
                }
                var e = ev || window.event;
                if (e.stopPropagation){
                    e.stopPropagation();    
                }
                else{
                    e.cancelBubble=true;
                }
            });
        });
    }
}

helpBtn();

//以上是统一性事件内容的绑定。
/****************************************************************************/
//返回按钮时间绑定
var returnBind = function(href){
    events.bind(document.getElementById("returnBtn"), "click click", function(){
        var el = document.getElementById("helpVideo");
        el.currentTime = 0;
        el.play();
        var url = controller.getTransformUrl(href, BACKTO);
        moveTo(url);
    });
}
//以上都是页面统一的操作和事件绑定函数。初始化但前页面的额内容，以下为但前页面效果优化函数。

var fontCenter = function(ele){
    
    var height = ele.offsetHeight;
    var width = ele.offsetWidth;
    
    var contents = ele.innerHTML;
    var styless = window.getComputedStyle(ele);
    
    var fontSize = parseInt(styless.fontSize.split("p")[0]);
    var paddingLeft = parseInt(styless.paddingLeft.split("p")[0]);
    var paddingRight = parseInt(styless.paddingRight.split("p")[0]);
    var line = Math.ceil(((contents.length - notWord(contents))*fontSize + (notWord(contents))*0.8*fontSize)/(width - paddingLeft - paddingRight));
           
    addStyle(ele, "line-height:"+(height/line)+"px;");
}

//计算字符串中不是中文的个数有多少个。
var notWord = function(str){
    var final = 0;
    
    if((/\w/g).test(str)){
        final += str.match(/\w/g).length;   
    }
    if((/\s/g).test(str)){
        final += str.match(/\s/g).length;   
    }
    if((/[0-9]/g).test(str)){
        final += str.match(/[0-9]/g).length;   
    }
    return final;
}

var getChallName = function(level, unit, number){
    //获取但对应关卡的名称。
    return challName[level+"_"+unit+"_"+number];
}
