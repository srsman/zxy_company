//用户选择章节和关卡，章节选取有放大的效果并依据当前用户选取的内容作出相关的内容的反馈。此页面需要去数据进行当前关卡的内容的输出。

//绑定当前页面返回按键的内容。
returnBind("home.html");

//初始化
var checkTimes = 0;
//绑定元素的动画事件并在所有的动画页面结束之后再调用动画结束事件。
var motion = function(ele, type, animate, callBack, times){
    events.bind(ele, type, function(){
        animate.call(ele);
    });
    events.bind(ele, "transitionend", function(){
        //此处添加共同内容。
        if(times){
            if(checkTimes >= times){
                checkTimes ++;
                return ;
            }
        }
        callBack.call(ele);
    });
}

/************************************************************************************/
//但前组件内容体现的是元素内容的
//表示放大倍数。
var _SCALE = 2;

var changePart = "";

//组件放大函数。
var _trans_scale_up = function(ele){
    //ele表示当前要放大的组建内容的内容
    //将当前的内容共放大的同时移动到中间位置来。
    changePart = ele.getElementsByClassName("cover")[0];
    changePart.setAttribute("style", "display:none;");
    var ele_x = ele.offsetLeft;
    var ele_y = ele.offsetTop;
    var parent_height = document.getElementById("main").offsetHeight;
    var parent_width = document.getElementById("main").offsetWidth;
    var ele_width = ele.offsetWidth;
    var ele_height = ele.offsetHeight;
    var scale_style = "transition:1s;transform-origin:50% 50%;-webkit-transition:1s;-webkit-transform-origin:50% 50%;";
    var image_scale = "transition:1s;-webkit-transition:1s;";
    var translate_x = parent_width/2 - (ele_x+ele.offsetWidth/2);
    var translate_y = parent_height/2 - (ele_y+ele.offsetHeight/2);
    image_scale += "transform: translate("+translate_x+"px,"+translate_y+"px) scale("+_SCALE+");-webkit-transform: translate("+translate_x+"px,"+translate_y+"px) scale("+_SCALE+");";
    scale_style += "transform: translate("+translate_x+"px,"+translate_y+"px) scale("+_SCALE+");-webkit-transform: translate("+translate_x+"px,"+translate_y+"px) scale("+_SCALE+");"; 
    ele.setAttribute("style", scale_style);
    document.getElementById("backgroundImage").setAttribute("style", image_scale);
    //相关组件放大了，把上层盖面隐藏掉。
}

//组件缩小。
var _trans_scale_down = function(ele){
    var scale_style = "transition:1s;transform-origin:50% 50%;-webkit-transition:1s;-webkit-transform-origin:50% 50%;";
    var image_scale = "transition:1s;-webkit-transition:1s;";
    image_scale += "transform: translate(0px,0px) scale(1);-webkit-transform: translate(0px,0px) scale(1);";
    scale_style += "transform: translate(0px,0px) scale(1);-webkit-transform: translate(0px,0px) scale(1);"; 
    ele.setAttribute("style", scale_style);
    document.getElementById("backgroundImage").setAttribute("style", image_scale);
    removeStyle(changePart, "display");
    changePart = "";
}
/********************************************************************************/

var willchangeStatus = true;

//初始化添加关卡元素
var addUnitSection = function(container, unitNumber){
    var nextChallengeCheck = false;
    var challengeInfo = controller.getUnitInfo(controller.HrefOp.level, unitNumber);
    var newEle = document.createElement("div");
    newEle.setAttribute("class", "unitContent");
    newEle.setAttribute("id", "unitContent"+controller.HrefOp.level+"_"+unitNumber);
    newEle.setAttribute("unit-number", ""+unitNumber);
    var title = document.createElement("div");
    title.setAttribute("class", "unitTitle");
    var titleInfo = document.createElement("span");
    if(unitNumber%2){
        titleInfo.setAttribute("class", "unitTotal");
    }
    else {
        titleInfo.setAttribute("class", "unitTotal2");   
    }
    var titleImage = document.createElement("img");
    titleImage.setAttribute("class", "titleImage");
    title.appendChild(titleImage);
    if(willchangeStatus){
        titleImage.setAttribute("src", "pic/"+controller.HrefOp.level+"-"+unitNumber+".png");
        willchangeStatus = false;
        nextChallengeCheck = true;
    }
    else {
        titleImage.setAttribute("src", "pic/"+controller.HrefOp.level+"-"+unitNumber+"2.png"); 
        var lock = document.createElement("img");
        lock.setAttribute("class", "locking");
        lock.setAttribute("src", "pic/lock.png");
        title.appendChild(lock);
    }
    title.appendChild(titleInfo);
    newEle.appendChild(title);
    var infomation = document.createElement("div");
    infomation.setAttribute("class", "unitInfo");
    var imageCount = 0;
    if(controller.HrefOp.level == 1){
        imageCount = 5;
        if(unitNumber == 1){
            imageCount = 4;   
        }
    }
    else if(controller.HrefOp.level == 2){
        imageCount = 4;   
    }
    else{
        imageCount = 3;       
    }
    if(challengeInfo < 10){
        titleInfo.innerHTML = "0"+challengeInfo+"/"+(imageCount*5);   
    }
    else{
        titleInfo.innerHTML = challengeInfo+"/"+(imageCount*5);    
    }
    
    for(var i = 0; i < imageCount; i++){
        var challEle = document.createElement("div");
        challEle.setAttribute("id", "challDiv"+controller.HrefOp.level+"_"+unitNumber+"_"+(i+1));
        challEle.setAttribute("class", "challDiv");
        var imageEle = document.createElement("img");
        imageEle.setAttribute("class", "challenge");
        //关卡状态信息获取。
        var challEmotion = controller.getChallengeData(controller.HrefOp.level + "_" + unitNumber + "_" + (i+1));
        if(i == imageCount-1 && challEmotion && challEmotion.stars != 0){
            willchangeStatus = true;
        }
        if(i == 0 && !challEmotion && unitNumber == 1){
            imageEle.setAttribute("src", "pic/"+controller.HrefOp.level + "-" + unitNumber + "-" + (i+1) + ".png");
            challEle.setAttribute("data-status", "star");
            titleImage.setAttribute("src", "pic/"+controller.HrefOp.level+"-"+unitNumber+".png");
            nextChallengeCheck = false;
            if(lock){
                title.removeChild(lock);
            }
        }
        else {
            if(lock){
                imageEle.setAttribute("src", "pic/"+controller.HrefOp.level + "-" + unitNumber + "-" + (i+1) + "2.png");
                nextChallengeCheck = false;
                willchangeStatus = false;
                challEle.setAttribute("data-status", "lock");
            }
            else if(challEmotion && challEmotion.stars >= 1){
                imageEle.setAttribute("src", "pic/"+controller.HrefOp.level + "-" + unitNumber + "-" + (i+1) + ".png");
                nextChallengeCheck = true;
                challEle.setAttribute("data-status", "star");
            }
            else if(challEmotion && challEmotion.stars == 0){
                imageEle.setAttribute("src", "pic/"+controller.HrefOp.level + "-" + unitNumber + "-" + (i+1) + ".png");
                nextChallengeCheck = false;
                challEle.setAttribute("data-status", "star");
            }
            else if(nextChallengeCheck){
                imageEle.setAttribute("src", "pic/"+controller.HrefOp.level + "-" + unitNumber + "-" + (i+1) + ".png");  
                nextChallengeCheck = false;
                challEle.setAttribute("data-status", "star");
            }
            else {
                imageEle.setAttribute("src", "pic/"+controller.HrefOp.level + "-" + unitNumber + "-" + (i+1) + "2.png"); 
                nextChallengeCheck = false;
                willchangeStatus = false;
                challEle.setAttribute("data-status", "lock");
            }
        }
        challEle.appendChild(imageEle);
        //添加星星
        for(var j = 0; j < 3; j++){
            var stars = document.createElement("img");
            stars.setAttribute("class", "challStar"+(j+1));
            if(challEmotion && j <= challEmotion.stars-1){
                stars.setAttribute("src", "pic/star-light.png");   
            }
            else {
                stars.setAttribute("src", "pic/star-lock.png");   
            }
            challEle.appendChild(stars);
        }
        if((/Android|iPhone|iPad|iPod|IOS/g).test(navigator.userAgent)){
            var challName = document.createElement("p");
            challName.setAttribute("class", "challengeTitle");
            var challNameInfo = document.createElement("span");
            challNameInfo.setAttribute("class","challengeTitleInfo")
            challName.appendChild(challNameInfo);
            challNameInfo.innerHTML = getChallName(controller.HrefOp.level, unitNumber, (i+1));
            challEle.appendChild(challName);
        }
        (function(){
            var p = i ;
            if(challEle.getAttribute("data-status") == "star"){
                events.bind(challEle, "click click", function(ev){
                    var el = document.getElementById("clickVideo");
                    el.currentTime = 0;
                    el.play();
                    click_moveTo(unitNumber, (p+1)); 
                    var e = ev || window.Event;
                    if(e.stopPropagation){
                        e.stopPropagation();   
                    }
                    else {
                        e.cancelBubble = true;   
                    }
                });
            }
            else {
                events.bind(challEle, "click click", function(ev){
                    removeStyle(document.getElementById("barrierLock"), "display");
                    var e = ev || window.Event;
                    if(e.stopPropagation){
                        e.stopPropagation();   
                    }
                    else {
                        e.cancelBubble = true;   
                    }
                });   
            }
        })();
        infomation.appendChild(challEle);
        
    }
    newEle.appendChild(infomation);
    var cover = document.createElement("div");
    cover.setAttribute("class", "cover");
    events.bind(cover, "click click", function(ev){
        click_scale_up(newEle);
        var e = ev || window.Event;
        if(e.stopPropagation){
            e.stopPropagation();   
        }
        else {
            e.cancelBubble=true;  
        }
		return false;
    });
    newEle.appendChild(cover);
    return newEle;
}

var changeChallDiv = null;

var readyStatus = true;

var click_scale_up = function(ele){ //ele为传递的元素内容为当需要放大的元素。
    if(!readyStatus){
        return;      
    }
    if(!changeChallDiv){
        readyStatus = false;
        _trans_scale_up(ele);
        var challDiv = document.getElementById("mainContent").getElementsByClassName("unitContent");
        for(var i = 0 ; i < challDiv.length; i++){
            if(challDiv[i] == ele){
                continue;   
            }
            addStyle(challDiv[i], "display:none;");
        }
        changeChallDiv = ele;
        addStyle(document.getElementById("nextPage"),"display:none;");
        addStyle(document.getElementById("lastPage"),"display:none;");
        setTimeout(function(){readyStatus = true}, 900);
		return;
    }
}

var click_moveTo = function(unitNumber, challengeNumber){
    moveTo("challenge.html?id="+controller.HrefOp.level+"_"+unitNumber+"_"+challengeNumber);
}

var click_scale_down = function(ele){
    if(!readyStatus){
        return;      
    }
    if(ele){
        readyStatus = false;
        _trans_scale_down(ele);
        var challDiv = document.getElementById("mainContent").getElementsByClassName("unitContent");
        setTimeout(function(){
            for(var i = 0 ; i < challDiv.length; i++){
                if(challDiv[i] == ele){
                    continue;   
                }
                removeStyle(challDiv[i], "display");
            }
            if(controller.HrefOp.level == 1){
                removeStyle(document.getElementById("nextPage"),"display");
                removeStyle(document.getElementById("lastPage"),"display");
            }
        },500);
        changeChallDiv = null;
        setTimeout(function(){readyStatus = true}, 900);
		return;
    }
}

/*********************************************************************************************/
//当前页面最低关卡。
var _startUnit = 1;

var pageShow = function(level){
    if(level == 1){
        return 4;   
    }
    else if(level >= 2){
        return 3;   
    }
}

var showPages = function(startUnit){
    if(!changeChallDiv){
        var pageShows = pageShow(controller.HrefOp.level);
        var container = document.getElementById("mainContent");
        container.innerHTML = "";
        if(startUnit == 1){
            willchangeStatus = true;
        }
        for(var i = 0; i < pageShows; i++){
            container.appendChild(addUnitSection(container, startUnit+i));
        }
    }
}
/**********************************************************************************************/

var init = function(){
    //页面元素初始化
    showPages(_startUnit);
    returnBind("home.html");
    events.bind(document.getElementById("main"), "click click", function(){
        click_scale_down(changeChallDiv);
    });
    events.bind(document.getElementById("nextPage"), "click click", function(){
        showPages(5);
    });
    events.bind(document.getElementById("lastPage"), "click click", function(){
        showPages(1);
    });
    if(controller.HrefOp.level != 1){
        addStyle(document.getElementById("nextPage"), "display:none;");
        addStyle(document.getElementById("lastPage"), "display:none;");
    }
    addStyle(document.getElementById("barrierLock"), "display:none;");
    events.bind(document.getElementById("lockBtn"), "click click", function(){
        addStyle(document.getElementById("barrierLock"), "display:none;");   
    });
    Preload.preloadImage("pic/challenge-background.png",
                        "");
}

init();

