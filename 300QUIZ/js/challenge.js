//处理问题显示，问题选取，问题答案提交逻辑，倒计时功能，判断用户大体情况，提交内容和反馈内容。反馈页面的内容呈现。

//表示当前显示的问题内容。
var _currentQues = null;

//改变现在显示的题目内容
var _exchangeQuestion = function(container, ques){//传递的参数是当前要改变的额内容的父级容器。
    var ex = "";
    
    if(container == document.getElementById("feedback")){
        ex = "f";
    }
    else {
        document.getElementById("number").innerHTML = _currentNumber + "/5";   
    }
    if(ques.option.length == 5){
        for(var i = 0 ; i < 5 ; i++){
            removeStyle(document.getElementById(ex+"option"+(i+1)), "display");
            document.getElementById(ex+"option"+(i+1)).setAttribute("class", ex+"option");  
        }
    }
    if(ques.option.length == 4){
        for(var i = 0 ; i < 5 ; i++){
            if(i == 4){
                addStyle(document.getElementById(ex+"option"+(i+1)), "display:none;");
                continue;
            }
            removeStyle(document.getElementById(ex+"option"+(i+1)), "display");
            document.getElementById(ex+"option"+(i+1)).setAttribute("class", ex+"optionFour");
        }
    }
    if(ques.option.length == 2){
        for(var i = 0 ; i < 5 ; i ++){
            if(i >= 2){
                addStyle(document.getElementById(ex+"option"+(i+1)), "display:none;");
                continue;
            }
            removeStyle(document.getElementById(ex+"option"+(i+1)), "display");
            document.getElementById(ex+"option"+(i+1)).setAttribute("class", ex+"optionFour");   
        }
    }
    for(var i = 0 ; i < ques.option.length ; i++){
        document.getElementById(ex+"option"+(i+1)).getElementsByTagName("p")[0].innerHTML= ques.option[i];   
        eleStyle(document.getElementById(ex+"option"+(i+1)));
    }
    document.getElementById(ex+"question").innerHTML = ques.question;
    if(ques.type == _SINGLE){
        document.getElementById("questionType").setAttribute("style", "background-image:url(./pic/single-choose.png)");
    }
    else if(ques.type == _JUDGE){
        document.getElementById("questionType").setAttribute("style", "background-image:url(./pic/judge-choose.png)");  
    }
    else {
        document.getElementById("questionType").setAttribute("style", "background-image:url(./pic/mult-choose.png)");     
    }
}

//当前的元素中的内容进行适配。?
var eleStyle = function(ele){
    if((/Android|IOS|iPhone|iPad|iPod/g).test(navigator.userAgent)){
        var sizeChange = 1.7;   
    }
    else if(ele.getAttribute("id")[0] == "f"){
        sizeChange = 13;   
    }
    else {
        sizeChange = 15;   
    }
    
    var setter = ele.getElementsByTagName("p")[0];
    setter.removeAttribute("style");
    var inner = setter.innerHTML;
    var styles = window.getComputedStyle(setter);
    var fontSize = parseInt(styles.fontSize.split("p")[0]);
    var notWords = notWord(inner);
    var lineNumber = (Math.floor((((inner.length-notWords)*fontSize)+notWords*0.7*fontSize)/setter.offsetWidth)+1);
    if(lineNumber >= 3){
        if((/Android|IOS|iPhone|iPad|iPod/g).test(navigator.userAgent)){
            addStyle(setter, "font-size:"+sizeChange+"rem;");   
        }
        else{
            addStyle(setter, "font-size:"+sizeChange+"px;");            
        }
        fontSize = parseInt(window.getComputedStyle(setter).fontSize.split("p")[0]);
        lineNumber = (Math.floor((((inner.length-notWords)*fontSize)+notWords*0.7*fontSize)/setter.offsetWidth)+1);
        if(lineNumber >= 4){
            addStyle(setter, "overflow:auto;");
            lineNumber = 3;
        }
    }
    var lineHeight = (setter.offsetHeight)/lineNumber;
    
    addStyle(setter, "line-height:"+lineHeight+"px;");
    
}
/***********************************************************************************************/
//clickOption点击改变当前选项的显示属性。
var _optionChange = function(ele){ //使用改变class样式的方式来改变当前内容选项。
    var classStyle = ele.getAttribute("class");
    
    if((/\d+/g).test(classStyle)){
        ele.setAttribute("class", classStyle.replace(/\d/g, ""));   
    }
    else {
        ele.setAttribute("class", classStyle+"2");   
    }
}

var clickOption = function(ele){
    var type = _currentQues.type;
    var idName = ele.getAttribute("class")[0];
    if(idName == "o"){
        idName = "";   
    }
    if(type == _SINGLE || type == _JUDGE){
        for(var i = 0 ; i < _currentQues.option.length; i++){
            var eleChange = document.getElementById(idName+"option"+(i+1));
            if(eleChange != ele){
                eleChange.setAttribute("class", ele.getAttribute("class").replace(/\d/g, ""));
            }
        }
    }
    _optionChange(ele);
}

/************************************************************************************************/
//clickSubmit点击提交当前的用户大体内容。
var _currentNumber = 1; //当前题目序号

var clickSubmit = function(){
    //获取用户选取内容。更新平台题目数据内容。
    //判断是否还可取题，如果可以则跳转到步骤3，否则跳转步骤4
    //3.显示题号加一，获取当前需要显示的题目，并将_currentQues信息改变。转换当前显示的问题
    //4.但钱关卡题目已经完成，跳出反馈框，并判断当前级别的题目是否已经完成。跳出显示框。
    controller.setQues(_currentNumber, _getUserOption(), _preventTime, _costTime);
    if(_currentNumber != 5){
        _preventTime = _costTime;
        _currentQues = controller.getQuestionData(++_currentNumber);
        _exchangeQuestion(document.getElementById("ques"), _currentQues);
    }
    else {
        clearInterval(inter);
        controller.setChallengeTime(0, _costTime);
        var feedData = challengeFeed();
    }
}

//计算用户选取内容并传递给后台
var _getUserOption = function(){
    var userSelect = new Array();
    
    for(var i = 0; i < 5; i ++){
        var ele = document.getElementById("option"+(i+1));
        if((/display:none;/g).test(ele.getAttribute("style"))){
            continue;   
        }
        else {
            if((/\d+/g).test(ele.getAttribute("class"))){
                userSelect.push((i+1));
            }
        }
    }
    return userSelect;
}

//计算数据，更新内容，显示悬浮窗。
var challengeFeed = function(){
    var feedData = controller.counting();
    //通过星级判断当前的显示内容。
    if(feedData.stars == 0){
        document.getElementById("animate").setAttribute("src", "pic/failed-lighting.png");
        document.getElementById("animate").setAttribute("class", "animate2");
        document.getElementById("star").setAttribute("src","pic/Stars0.png");
        document.getElementById("nextChallenge").setAttribute("src", "pic/nextChallenge2.png"); 
        document.getElementById("nextChallenge").setAttribute("data-donot", "not");
        document.getElementById("fnextChall").setAttribute("src", "pic/nextChallenge2.png"); 
        document.getElementById("fnextChall").setAttribute("data-donot", "not");
        document.getElementById("wrongSong").play();
    }
    else if(feedData.stars == 1){
        document.getElementById("star").setAttribute("src","pic/Stars1.png");   
        document.getElementById("rightSong").play();
    }
    else if(feedData.stars == 2){
        document.getElementById("star").setAttribute("src","pic/Stars2.png");  
        document.getElementById("rightSong").play();
    }
    else{
        document.getElementById("star").setAttribute("src","pic/Stars3.png");  
        document.getElementById("rightSong").play();
    }
    
    if(feedData.rights){
        exchangeData("rights", "+1000");
    }
    else {
        exchangeData("rights", "+0");   
    }
    if(feedData.allRight){
        exchangeData("allRight", "+1500");   
    }else {
        exchangeData("allRight", "+0");   
    }
    
    var quesRight = controller.getQuesRights();
    for(var i = 0 ; i < quesRight.length; i++){
        document.getElementById("quesNum"+(i+1)).setAttribute("class", "quesNum");
        if(!quesRight[i]){
            document.getElementById("quesNum"+(i+1)).setAttribute("class", "quesNum2");   
        }
    }
    exchangeData("rates", ""+feedData.rates);
    exchangeData("challTotal", ""+feedData.score);
    addStyle(document.getElementById("animate"), "display");
    removeStyle(document.getElementById("passing"), "display");
    removeStyle(document.getElementById("animate"), "display");
    var level = controller.HrefOp.level;
    var unit = controller.HrefOp.unit;
    var barrier = controller.HrefOp.barrier;
    if(feedData.accomplish && feedData.stars >= 1 && ((level == 1 && unit == 8 && barrier ==5) ||(level == 2 && unit == 3 &&barrier == 4)|| (level == 3 && unit == 3 && barrier == 3))){
        var levelCheck = controller.getKeyOfChallenge();
        if(levelCheck == 1){
            document.getElementById("accomplishHintDiv").innerHTML = "太棒了，<span class='unitSpan'>第一节</span>的全部课程关卡已经通关了！"   
        }
        if(levelCheck == 2){
            document.getElementById("accomplishHintDiv").innerHTML = "太棒了，<span class='unitSpan'>第二节</span>的全部课程关卡已经通关了！"   
        }
        if(levelCheck == 3){
            document.getElementById("accomplishHintDiv").innerHTML = "太棒了，<span class='unitSpan'>第三节</span>的全部课程关卡已经通关了！"   
        }
        removeStyle(document.getElementById("levelAccomplish"), "display"); 
        var divHeight = document.getElementById("accomplishHintDiv").offsetHeight;
        addStyle(document.getElementById("accomplishHintDiv"), "line-height:"+divHeight/2+"px;");
    }
    return feedData;
}

//为答题界面绑定时间内容。
var quesClick = function(){
    for(var i = 0; i < 5; i++){
        (function(){
            var p = i;
            events.bind(document.getElementById("option"+(p+1)), "click click", function(){
                var cho = document.getElementById("chooseVideo");
                cho.currentTime = 0;
                cho.play();
                clickOption(document.getElementById("option"+(p+1)));
            });
        })();   
    }
    events.bind(document.getElementById("submitBtn"), "click click", function(){
        clickSubmit(); 
    });
}

var moveToExplains = function(){
    addStyle(document.getElementById("ques"), "display:none;");
    addStyle(document.getElementById("passing"), "display:none;");
    removeStyle(document.getElementById("feedback"), "display");
    exchangeFeedbackQues(1);
    document.getElementById("frestart").removeAttribute("style");
    document.getElementById("fnextChall").removeAttribute("style");
}

//反馈悬浮窗显示内容
var quesData = function(){
    events.bind(document.getElementById("explains"), "click click", function(){
        moveToExplains();
    });
    events.bind(document.getElementById("restart"), "click click", function(){
        moveTo(controller.getTransformUrl("challenge.html", RESTART));
    });
    events.bind(document.getElementById("nextChallenge"), "click click", function(){
        if(document.getElementById("nextChallenge").getAttribute("data-donot")){
            return ;   
        }
        if(controller.HrefOp.level == 1 && controller.HrefOp.unit == 1){
            moveTo(controller.getTransformUrl("challenge.html", NEXTCHALLENGE, true));
        }
        else {
            try{
                moveTo(controller.getTransformUrl("challenge.html", NEXTCHALLENGE));  
            }catch(e){
                return;   
            }
        }
    });
}

var nextChallengeChange = function(){
    try{
        controller.getTransformUrl("challenge.html", NEXTCHALLENGE);     
    }catch(e){
        document.getElementById("nextChallenge").setAttribute("src", "pic/nextChallenge2.png");  
        document.getElementById("nextChallenge").setAttribute("data-donot", "not");
        document.getElementById("fnextChall").setAttribute("src", "pic/nextChallenge2.png");  
        document.getElementById("fnextChall").setAttribute("data-donot", "not");
    }
}

//反馈当前等级题目是否已经完成的内容。
var accomplishment = function(){
    events.bind(document.getElementById("levelButton"), "click click", function(){
        addStyle(document.getElementById("levelAccomplish"), "display:none;");
    });
}
/*************************************************************************************************/
var _TIMES = 5; //倒计时时长。分钟为单位。

var _costTime = 0;//通过使用当前记录减去前一次记录。来获取用户答题时间，然后再将现在的时间赋值给这一变量。

var _preventTime = 0;//当前时间内容

var inter = null;
//倒计时间函数。
var timing = function(){
    var minute = _TIMES;
    var second = 0;
    inter = setInterval(function(){
        //判断时间还有30秒的时候进行提示。
        if(minute == 0 && second == 0){
            for(var i = _currentNumber; i <= 5; i++){
                if(i == _currentNumber){
                    controller.setQues(i, [], _preventTime, _costTime); 
                }
                else {
                    controller.setQues(i, [], 0, 0);   
                }
            }
            clearInterval(inter);
            challengeFeed();
        }
        if(!minute && second == 30){
            document.getElementById("timingHint").removeAttribute("style");
            fontCenter(document.getElementById("timingHint"));
        }
        if(!minute && !second){
            //此处为时间到了的情况，调用提交函数。
            clearInterval(inter);
        }
        else if(!second){
            //当秒数为0的话其分钟还有的情况这分钟减少一，秒数变成59;
            minute --;
            second = 59;
        }
        else{
            second --;   
        }
        showTime(minute, second);
        _costTime ++;
    },1000);
}

//时间显示函数：
var showTime = function(min, sec){
    if(sec < 10){
        var showContent = min+":0"+sec;
    }
    else {
        showContent = min+":"+sec;
    }
    document.getElementById("timing").innerHTML = showContent;
}

/*************************************************************************************************/

//函数主要内容通过点击切换当前反馈页面中的内容
var exchangeFeedbackQues = function(num){
    var ques = controller.getQuestionData(num);
    var userCorrect = controller.getQuesRights();
    for(i = 0; i < userCorrect.length; i++){
        if(userCorrect[i]){
            eleTemp= document.getElementById("quesLead"+(i+1));
            eleTemp.setAttribute("class", "quesLead");
        }
    }
    for(i = 0 ; i < 5; i++){
        eleTemp = document.getElementById("foption"+(i+1)).getElementsByClassName("redRight")[0];
        removeStyle(eleTemp, "display");
        addStyle(eleTemp, "display:none;");
    }
    _exchangeQuestion(document.getElementById("feedback"), ques);
    document.getElementById("costTime").innerHTML = "用时:"+ques.time + "秒";
    document.getElementById("explainContent").innerHTML = ques.explain;
    for(var i = 0 ; i < ques.answer.length ; i ++){
        if(ques.answer[i]){
            var eleTemp = document.getElementById("foption"+(i+1));   
            eleTemp.setAttribute("class", eleTemp.getAttribute("class")+2);
            removeStyle(eleTemp.getElementsByClassName("redRight")[0], "display");
        }
    }
    for(var j = 0; j < 5 ; j ++){
        document.getElementById("quesLead"+(j+1)).removeAttribute("style");   
    }
    document.getElementById("quesLead"+(num)).setAttribute("style", "transform:scale(1.3);transition:1s;")
}

//用于反馈页面中页面元素事件绑定。
var feedBackEvents = function(){
    for(var i = 0 ;i < 5; i++){
        (function(){
            var p = i;
            events.bind(document.getElementById("quesLead"+(p+1)), "click click", function(){
                exchangeFeedbackQues(p+1);
            });
        })();
    }
    events.bind(document.getElementById("fnextChall"), "click click", function(){
        if(document.getElementById("nextChallenge").getAttribute("data-donot")){
            return ;   
        }
        if(controller.HrefOp.level == 1 && controller.HrefOp.unit == 1){
            moveTo(controller.getTransformUrl("challenge.html", NEXTCHALLENGE, true));
        }
        else {
            try{
                moveTo(controller.getTransformUrl("challenge.html", NEXTCHALLENGE));  
            }catch(e){
                return;   
            }
        }                     
    });
    events.bind(document.getElementById("frestart"), "click click", function(){
        moveTo(controller.getTransformUrl("challenge.html", RESTART));
    });
}
/*************************************************************************************************/
//初始化当前页面
var challengeInit = function(){
    
    //初始化页面内容。
        //编辑当前关卡显示题目。
    document.getElementById("passing").setAttribute("style", "display:none;");
    document.getElementById("levelAccomplish").setAttribute("style", "display:none;");
    document.getElementById("feedback").setAttribute("style", "display:none;");
    
    //首先读取当前的页面需要显示的问题内容。并转换当前的内容。
    //倒计时开始。
    _currentNumber = 1;
    _currentQues = null;
    _currentQues = controller.getQuestionData(_currentNumber);
    _exchangeQuestion(document.getElementById("ques"), _currentQues);
    showTime(_TIMES, 0);
    timing();
    document.getElementById("challengeTitle").innerHTML = getChallName(controller.HrefOp.level, controller.HrefOp.unit, controller.HrefOp.barrier);
    nextChallengeChange();
    document.getElementById("frestart").setAttribute("style", "display:none;");
    document.getElementById("fnextChall").setAttribute("style", "display:none;");
    
    //为元素绑定事件内容。
    quesClick();
    quesData();
    accomplishment();
    feedBackEvents();
    returnBind("barrier.html");
}

