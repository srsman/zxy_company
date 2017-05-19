var loading = function(){
    
    //在此处设置答案!!!以 "数字_数字"的形式设置每一对连线! 以逗号分隔每一组连线!
    var ansStr = "1_1,2_2,3_3,4_4";
    
    var disable = false;
    var linkEve = function(){
        
        
        //当前的页面的中的元素 partLeft和partRight的设置。
        if(linkEve.prototype.setData === undefined){
            linkEve.prototype.setData = function(){
                this.left = document.getElementById("partLeft");
                this.right = document.getElementById("partRight");
                if(this.left && this.right){  return true; }
                return false;
            }
        }
        
        //基础数据设置。
        if(linkEve.prototype.setBaseData === undefined){
            linkEve.prototype.setBaseData = function(){
                if(this.left){
                    this.leftCount = this.left.getAttribute("data-number");
                    this.leftLinkNum = this.left.getAttribute("data-linkNum");
                }
                if(this.right){
                    this.rightCount = this.right.getAttribute("data-number");
                    this.rightLinkNum = this.right.getAttribute("data-linkNum");
                }
                if(this.leftCount && this.leftLinkNum && this.rightCount && this.rightLinkNum){
                    return true;   
                }
                return false;
            }
        }
        
        if(linkEve.prototype.setRightAnswer === undefined){
            linkEve.prototype.setRightAnswer = function(str){
                if(str === undefined){
                    return false;   
                }
                if(this.rightAnswer === undefined){
                    this.rightAnswer = str;   
                }
                return true;
            }
        }
        
        //绑定事件
        if(linkEve.prototype.clickEve === undefined){
            linkEve.prototype.clickEve = function(obj, type, fn){
                if(obj.addEventListener != 'undefined'){
                    obj.addEventListener(""+type,fn,false);
                }
                else if(obj.attachEvent != 'undefined'){
                    fn.call(obj, window.event); 
                }
                else {
                    obj["on"+type] = function(){
                        fn();
                    };   
                }
            }
        }
        
        //计算当前项连线数目。
        if(linkEve.prototype.linkCheck === undefined){
            linkEve.prototype.linkCheck = function(linked, number, direct){
                if(linked != undefined){
                    var strArray = linked.split(","); 
                    var strCheck = "";
                    var linkCount = 0;
                    if(direct == "left"){
                        strCheck += number + "_";
                    }
                    else {
                        strCheck += "_" + number;   
                    }
                    for(var i = 0; i < strArray.length; i++){
                        if(strArray[i].indexOf(strCheck) != -1){
                            linkCount ++;
                        }
                    }
                    return linkCount;
                }
            }
        }
        
        //删除链接
        if(linkEve.prototype.popLink === undefined){
            linkEve.prototype.popLink = function(linked,left, right){
                if(linked != undefined && linked != ""){
                    var strArray = linked.split(",");
                    var strCheck = "" + left + "_" + right;
                    for(var i = 0; i < strArray.length; i++){
                        if(strCheck == strArray[i]){
                            break;   
                        }
                    }
                    if(i < strArray.length){
                        strArray.splice(i,1);
                        return strArray.toString();
                    }
                }
                return "";
            }
        }
        
        //删除首位选项链接。
        if(linkEve.prototype.popFirstLink === undefined){
            linkEve.prototype.popFirstLink= function(linked,direct, num){
                if(linked != undefined && linked != ""){
                    var strArray = linked.split(",");  
                    var strDelete = "";
                    if(direct == "left"){
                        strDelete += num + "_";
                    }
                    else {
                        strDelete += "_" + num;
                    }
                    for(var i = 0; i < strArray.length; i++){
                        if(strArray[i].indexOf(strDelete) != -1){
                            strArray.splice(i,1);
                            return strArray.toString();
                             
                        }
                    }
                }
                return "";
            }
        }
        
        //核对当前的所有的选项至少与其它的一个选项关联。
        if(linkEve.prototype.checkAll === undefined){
            linkEve.prototype.checkAll = function(linked,left,right){
                var leftArray = new Array(leftCount);
                var rightArray = new Array(rightCount);
                for(var i =0 ; i < leftArray ; i++){
                    leftArray[i] = 0;   
                }
                for(i = 0; i < rightArray.length; i++){
                    rightArray[i] = 0;   
                }
                var strArray = linked.split(",");
                for(var i = 0; i < strArray.length ; i++){
                    var checkStr = strArray[i].split("_");
                    leftArray[parseInt(checkStr[0]) - 1] = 1;
                    rightArray[parseInt(checlStr[1]) - 1] = 1;
                }
                for(i = 0; i < leftArray.length ; i++){
                     if(leftArray[i] == 0){
                        return true;
                     }
                }
                for(i = 0; i < rightArray.length; i++){
                    if(rightArray[i] == 0){
                        return true;   
                    }
                }
                return false;
            }
        }
        
        //提交后的核对答案
        if(linkEve.prototype.finalCheck === undefined){
            linkEve.prototype.finalCheck = function(rightAnswer,linked){
                if(rightAnswer && linked){
                    var answers = rightAnswer.split(",");
                    var linkedOption = linked.split(",");
                    for(var i = 0; i < linkedOption.length ;i++){
                        for(var j = 0 ; j <　answers.length ; j++){
                            if(answers[j] == linkedOption[i]){
                                break;   
                            }
                        }
                        if(j == answers.length){
                            return false;   
                        }
                    }
                    if(answers.length != linkedOption.length){
                        return false;   
                    }
                    return true;
                    }
                return false;
            }
        }
        
        //图像的绘制。
        if(linkEve.prototype.drawingPic === undefined){
            linkEve.prototype.drawingPic = function(left,right,color){
                //通过canvas绘制相关的额图画   
                var canvas = document.getElementById("drawing");
                if ( ! canvas || ! canvas.getContext ) { return false; }
                var ctx = canvas.getContext("2d");
                var leftNode = document.getElementById("partLeft").getElementsByTagName("p")[parseInt(left)-1];
                var rightNode = document.getElementById("partRight").getElementsByTagName("p")[parseInt(right)-1];
//                console.log(canvas.scrollTop);
                
                var leftTop = document.getElementById("partLeft").offsetTop + (leftNode.offsetHeight)/2 + leftNode.offsetTop;
//                console.log(leftNode);
//                console.log(leftNode.offsetHeight);
//                console.log(leftTop);
                var rightTop = document.getElementById("partRight").offsetTop + (rightNode.offsetHeight)/2 + rightNode.offsetTop;
//                console.log(rightNode);
//                console.log(rightNode.offsetHeight);
//                console.log(rightTop);
                var leftLeft = document.getElementById("partLeft").offsetLeft + leftNode.offsetWidth;
                var rightLeft = document.getElementById("partRight").offsetLeft;
                ctx.lineWidth = 3;
                if(color){
                    ctx.strokeStyle = "#c00";   
                }
                else {
                    ctx.strokeStyle = "#f8a200";
                }
                ctx.beginPath();
                ctx.moveTo(leftLeft, leftTop);
                ctx.lineTo(rightLeft,rightTop);
                ctx.stroke();
                ctx.closePath();
                return true;
            }
        }
        
        //更具传递的信息重画相关的额图像
        if(linkEve.prototype.redecorate === undefined){
            linkEve.prototype.redecorate = function(str,color){
                var canvas = document.getElementById("drawing");
                if ( ! canvas || ! canvas.getContext ) { return false; }
                var ctx = canvas.getContext("2d");
                ctx.clearRect(0,0,2000,2000);
                if(str != undefined){
                    var strArray = str.split(",");
                    for(var i = 0 ; i < strArray.length; i++){
                        var appart = strArray[i].split("_");
                        linkEve.prototype.drawingPic(appart[0],appart[1],color);
                    }
                    return true;
                }
            }
        }
        
        //提示框显示
        if(linkEve.prototype.dialogShow === undefined){
            linkEve.prototype.dialogShow = function(error, str){
                if(navigator.userAgent.toLowerCase().match(/msie ([\d.]+)/)){
                    if(error){
                        document.getElementById("wrongSound").play();
                        document.getElementById("dialogblack").setAttribute("style","background-image:url(./pic/plankt.png);background-size:100% 100%;");
                        document.getElementById("dialog").setAttribute("style","background-image:url(./pic/wrong.png);");
                    }
                    else {
                        document.getElementById("rightSound").plat();
                        document.getElementById("dialogblack").removeAttribute("style");
                        document.getElementById("dialog").removeAttribute("style");
                    }
                    setTimeout(function(){
                        document.getElementById("dialog").setAttribute("style","display:none");
                        document.getElementById("dialogblack").setAttribute("style","display:none");
                        document.getElementById("tip").removeAttribute("style");
                        document.getElementById("submitBtn").removeAttribute("disabled");
                        if(/(iPhone|iPad|iPod|iOS|Android)/i.test(navigator.userAgent)){
                        document.getElementById("submitBtn").setAttribute("style","margin-top:-7.6%;");
                        }
                        else{
                            document.getElementById("submitBtn").setAttribute("style","margin-top:-7.6%;");
                        }
                    },4000);
                    return ;
                }
                if(error){
                    document.getElementById("wrongSound").play();
                }
                else {
                    document.getElementById("dialogblack").removeAttribute("style");
                    document.getElementById("dialog").removeAttribute("style");
                    document.getElementById("rightSound").play();   
                }
                document.getElementById("dialogblack").removeAttribute("hidden");
                document.getElementById("dialog").removeAttribute("hidden");
                setTimeout(function(){
                    document.getElementById("dialogblack").setAttribute("hidden","hidden");
                    document.getElementById("dialog").setAttribute("hidden","hidden");
                    linkEve.prototype.redecorate(str,(!error));
                    document.getElementById("submitBtn").removeAttribute("disabled");
                    document.getElementById("tip").removeAttribute("hidden");
                    if(/(iPhone|iPad|iPod|iOS|Android)/i.test(navigator.userAgent)){
                        document.getElementById("submitBtn").setAttribute("style","margin-top:-7.6%;");
                    }
                    else{
                        document.getElementById("submitBtn").setAttribute("style","margin-top:-7.6%;");
                    }
                }, 4000);
            }
        }
        
        //显示样式判断
        if(linkEve.prototype.setShowStyle === undefined){
            linkEve.prototype.setShowStyle = function(){
                if(window.orientation == 0 || window.orientation == 180){
                    orientation = 90; 
                }
                if(window.orientation == 90 || window.orientation == -90){
                    console.log("横屏");   
                }
            }
        }
        
        //判断当前的显示设备
        if(linkEve.prototype.checkTypeOfUser === undefined){
            linkEve.prototype.checkTypeOfUser = function(){
                var sUserAgent = navigator.userAgent.toLowerCase();
                var bIsIpad = sUserAgent.match(/ipad/i) == "ipad";
                var bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";
                var bIsMidp = sUserAgent.match(/midp/i) == "midp";
                var bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
                var bIsUc = sUserAgent.match(/ucweb/i) == "ucweb";
                var bIsAndroid = sUserAgent.match(/android/i) == "android";
                var bIsCE = sUserAgent.match(/windows ce/i) == "windows ce";
                var bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile";
                if (bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM) {
                    document.getElementById("bigger").setAttribute("class","bigger2");
                    console.log("phone");
                } else {
                    document.getElementById("bigger").setAttribute("class","bigger");
                    console.log("PC");
                }   
            }
        }
        
        //mouseDown事件
        if(linkEve.prototype.mouseDownEvent === undefined){
            linkEve.prototype.mouseDownEvent = function(ev){
                if(disable){
                    return;   
                }
                var str = this.linked;
                this.objects = null;
                if(/(iPhone|iPad|iPod|iOS|Android)/i.test(navigator.userAgent)){
                    ev.preventDefault();
                    var obj = linkEve.prototype.getPosition(ev);
                    var objects = linkEve.prototype.getOption(obj);
                    if(objects.type){
                        this.objects = objects;
                        this.handler=function(event){
                            linkEve.prototype.touchMoveEvent(str, objects, event);
                        }
                        document.getElementById("drawing").addEventListener("touchmove",this.handler,false);   
                    }
                }
                else {
                    var obj = linkEve.prototype.getMousePosition(ev);
                    var objects = linkEve.prototype.getOption(obj);
                    if(objects.type){
                        this.objects = objects;
                        this.handler=function(event){
                            linkEve.prototype.mouseMoveEvent(str, objects, event);
                        }
                        document.getElementById("drawing").onmousemove = this.handler;  
                    }
                }
            }
        }
        
        
        //mouseup事件
        if(linkEve.prototype.mouseUpEvent === undefined){
            linkEve.prototype.mouseUpEvent = function(){
                if(disable){
                    return;   
                }
                if(/(iPhone|iPad|iPod|iOS|Android)/i.test(navigator.userAgent)){
                    document.getElementById("drawing").removeEventListener("touchmove",this.handler,false);   
                }
                else {
                    document.getElementById("drawing").onmousemove = "";   
                }
                var final = linkEve.prototype.getOption({'x':finalPositionX, 'y':finalPositionY});
                var strTemp= "";
                var left = "";
                var right = "";
                if(final.type && this.objects){
                    if(this.objects.type != final.type){
                        if(this.objects.type == "left"){
                            left = this.objects.number;
                            right = final.number;
                            strTemp += this.objects.number + "_" + final.number;   
                        }
                        else if(this.objects.type == "right"){
                            left = final.number;
                            right = this.objects.number;
                            strTemp += final.number + "_" + this.objects.number; 
                        }
                        var check = linkEve.prototype.popLink(this.linked,left,right); 
                        if(!(check)){
                            if(linkEve.prototype.linkCheck(this.linked, left, "left") >= this.leftLinkNum){
                                this.linked = linkEve.prototype.popFirstLink(this.linked, "left", left);
                            }
                            if(linkEve.prototype.linkCheck(this.linked, right, "right") >= this.rightLinkNum){
                                this.linked = linkEve.prototype.popFirstLink(this.linked, "right", right);
                            }
                            if(this.linked){
                                this.linked += ","+strTemp;
                            }
                            else{
                                this.linked = strTemp;   
                            }
                        }
                        else {
                            this.linked =check;   
                        }
                    }
                }
                linkEve.prototype.redecorate(this.linked);
            }
        }
        
        //mousemove事件
        if(linkEve.prototype.mouseMoveEvent === undefined){
            linkEve.prototype.mouseMoveEvent = function(str, obj, event){
                if(disable){
                    return;   
                }
                var position = linkEve.prototype.getMousePosition(event);
                linkEve.prototype.redecorate(str);
                linkEve.prototype.drawingLineAnimation(obj,position);
                finalPositionX = position.x;
                finalPositionY = position.y;
            }
        }
        
        //触屏移动事件函数
        if(linkEve.prototype.touchMoveEvent === undefined){
            linkEve.prototype.touchMoveEvent = function(str,obj,event){
                if(disable){
                    return;   
                }
                var position = linkEve.prototype.getPosition(event);
                console.log("position:"+position.x +","+position.y);
                linkEve.prototype.redecorate(str);
                linkEve.prototype.drawingLineAnimation(obj,position);
                finalPositionX = position.x;
                finalPositionY = position.y;
            }
        }
        
        //点击事件位置获取
        if(linkEve.prototype.getPosition === undefined){
            linkEve.prototype.getPosition = function(event){
                var touch = event.touches[0];
                var x = Number(touch.clientX);
                var y = Number(touch.clientY);
                console.log("page-x:"+x +"; page-y:"+y);
                var drawingBox = document.getElementById("drawing").getBoundingClientRect();
                return {'x':y-drawingBox.top, 'y':drawingBox.right-x};
            }
        }
        
        //鼠标位置获取
        if(linkEve.prototype.getMousePosition === undefined){
            linkEve.prototype.getMousePosition = function(event){
                var e = event || window.Event;
                var scrollX = document.documentElement.scrollLeft || document.body.scrollLeft;
                var scrollY = document.documentElement.scrollTop || document.body.scrollTop;
                var x = e.pageX || e.clientX + scrollX;
                var y = e.pageY || e.clientY + scrollY;
                var drawX = document.getElementById("container").offsetLeft +document.getElementById("bigger").offsetLeft;
                var drawY = document.getElementById("container").offsetTop + document.getElementById("bigger").offsetTop;
                return {'x':x-drawX, 'y':y-drawY};
            }
        }
        
        //判断当前的坐标属于那一个组件的。
        if(linkEve.prototype.getOption === undefined){
            linkEve.prototype.getOption = function(obj){
                var returnObj = {};
                var left = document.getElementById("partLeft").getAttribute("data-number");
                var right = document.getElementById("partRight").getAttribute("data-number");
                var optionLeft = document.getElementById("partLeft").getElementsByTagName("p");
                var leftLeft = document.getElementById("partLeft").offsetLeft;
                if(obj.x > leftLeft && obj.x < leftLeft+optionLeft[0].offsetWidth){
                    for(var i = 0 ; i < left ; i++){
                        var optionTop = optionLeft[i].offsetTop+document.getElementById("partLeft").offsetTop;
                        if(obj.y > optionTop && obj.y < (optionTop+optionLeft[i].offsetHeight)){
                            returnObj = {'type': "left", 'number': (i+1)};
                            break;
                        }
                    }
                }
                var optionRight = document.getElementById("partRight").getElementsByTagName("p");
                var rightLeft = document.getElementById("partRight").offsetLeft;
                if(obj.x > rightLeft && obj.x < rightLeft+optionRight[0].offsetWidth){
                    for(var i = 0 ; i< right ; i++){
                        var optionTop = optionRight[i].offsetTop+document.getElementById("partRight").offsetTop;
                        if(obj.y >  optionTop && obj.y < (optionTop + optionRight[i].offsetHeight)){
                            returnObj = {'type': "right", 'number': (i+1)};   
                        }
                    }
                }
                return returnObj;
            }
        }
        
        //动态连线函数
        if(linkEve.prototype.drawingLineAnimation === undefined){
            linkEve.prototype.drawingLineAnimation = function(options, position){
                var clickOp = null;
                if(options.type == "left"){
                    clickOp = document.getElementById("partLeft").getElementsByTagName("p")[parseInt(options.number)-1];
                }
                else if(options.type == "right"){
                    clickOp = document.getElementById("partRight").getElementsByTagName("p")[parseInt(options.number)-1];
                }
                else {
                    return ;   
                }
                var canvas=document.getElementById("drawing");
                var ctx =canvas.getContext("2d");
                var top = document.getElementById("partLeft").offsetTop + (clickOp.offsetHeight)/2 + clickOp.offsetTop;
                var left = 0;
                if(options.type == "left"){
                    left = document.getElementById("partLeft").offsetLeft + clickOp.offsetWidth;
                }
                else if(options.type == "right"){
                    left = document.getElementById("partRight").offsetLeft;   
                }
                ctx.strokeStyle = "#f8a200";
                ctx.lineWidth = 3;
                ctx.beginPath();
                ctx.moveTo(left, top);
                ctx.lineTo(position.x,position.y);
                ctx.stroke();
                ctx.closePath();
            }
        }
        
        if(linkEve.prototype.clickSubmit === undefined){
            linkEve.prototype.clickSubmit = function(bool){
                //正确答案的获取。
                disable = true;
                if(this.submitted != undefined){
                    if(document.getElementById("submitBtn").getAttribute("disabled")){
                        return ;   
                    }
                    if(this.submitted == 1){
                        if(this.rightAnswer != undefined){
                            linkEve.prototype.redecorate(this.rightAnswer,true);
                        }
                        if(!this.rightable){
                            this.submitted = 2;
                            document.getElementById("submitBtn").innerHTML = "我的答案";
                        }
                        
                    }
                    else if(this.submitted == 2){
                        this.submitted = 1;
                        linkEve.prototype.redecorate(this.linked);
                        document.getElementById("submitBtn").innerHTML = "正确答案";
                    }
                }
                else {
                    if(bool){
                        var canvas = document.getElementById("drawing");
                        var ctx = canvas.getContext("2d");
                        ctx.clearRect(0,0,2000,2000);
                        document.getElementById("submitBtn").setAttribute("disabled","disables");
                        if(linkEve.prototype.finalCheck()){
                            linkEve.prototype.dialogShow(false,this.linked);
                        }
                        else {
                            linkEve.prototype.dialogShow(true,this.linked);   
                        }
                        this.linked = "";
                        return false;
                    }
                    this.submitted = 1;
                    var canvas = document.getElementById("drawing");
                    var ctx = canvas.getContext("2d");
                    ctx.clearRect(0,0,2000,2000);
                    document.getElementById("submitBtn").setAttribute("disabled","disables");
                    if(linkEve.prototype.finalCheck(this.rightAnswer, this.linked)){
                        linkEve.prototype.dialogShow(false,this.rightAnswer);
                        this.rightable = 1;
                    }
                    else {
                        linkEve.prototype.dialogShow(true,this.linked);
                    }
                    document.getElementById("submitBtn").innerHTML = "正确答案";
                }
            }
        }
    }   
    
    var finalPositionX = 0;
    var finalPositionY = 0;
    
    var unique = new linkEve();
    
//    unique.checkTypeOfUser();
    if(unique.setData() && unique.setBaseData() && unique.setRightAnswer(""+ansStr)){
    
        if(navigator.userAgent.toLowerCase().match(/msie ([\d.]+)/)){
            document.getElementById("dialogblack").setAttribute("style","display:none;"); 
            document.getElementById("dialog").setAttribute("style","display:none");
            document.getElementById("tip").setAttribute("style","display:none");
        }
        if(/(iPhone|iPad|iPod|iOS|Android)/i.test(navigator.userAgent)){
            var showWidth = document.getElementById("bigger").offsetHeight;
            var showHeight = document.getElementById("bigger").offsetWidth;
            document.getElementById("bigger").setAttribute("style", "width:"+showWidth+"px;height:"+showHeight+"px;");
        }
    
        var findNotChinese = function(str){
            var count = 0;
            if((/[\s\d\，\。]/ig).test(str)){
                count += str.match(/[\s\d\，\。]/ig).length; 
            }
            return count;
        }



        var lists = document.getElementById("partLeft").getElementsByTagName("p");
        for(var i =0 ; i < unique.leftCount; i ++){
            var content = lists[i].innerHTML;
            var styles = window.getComputedStyle(lists[i],null);
            var fontsize = styles.fontSize;
            var paddleft = styles.paddingRight;
            var temp = fontsize.split("p");
            var temp2 = paddleft.split("p");
            var temp3 = findNotChinese(content);
            if(((content.length-temp3)*temp[0]+temp3*temp[0]*0.85) >= (lists[i].clientWidth - temp2[0])){
                if(/(Android)/i.test(navigator.userAgent)){
                    lists[i].setAttribute("style","padding-top:0.779%;padding-bottom:0.779%"); 
                }
                else if(/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)){
                    lists[i].setAttribute("style","padding-top: 0.68%;padding-bottom: 0.68%;");   
                }
                else {
                    lists[i].setAttribute("style","padding-top:1.388%;padding-bottom:1.388%"); 
                }
            }   
        }

        var lists = document.getElementById("partRight").getElementsByTagName("p");
        for(var i =0 ; i < unique.rightCount; i ++){
            var content = lists[i].innerHTML;
            var styles = window.getComputedStyle(lists[i],null);
            var fontsize = styles.fontSize;
            var paddleft = styles.paddingLeft;
            var temp = fontsize.split("p");
            var temp2 = paddleft.split("p");
            var temp3 = findNotChinese(content);
            if(((content.length-temp3)*temp[0]+temp3*temp[0]*0.85) >= (lists[i].clientWidth - temp2[0])){
                if(/(Android)/i.test(navigator.userAgent)){
                    lists[i].setAttribute("style","padding-top:0.779%;padding-bottom:0.779%"); 
                }
                else if(/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)){
                    lists[i].setAttribute("style","padding-top:0.68%;padding-bottom: 0.68%;");   
                }
                else {
                    lists[i].setAttribute("style","padding-top:1.388%;padding-bottom:1.388%"); 
                }
            }
        }



        var mt = document.getElementById("partLeft").offsetHeight;
        document.getElementById("partRight").setAttribute("style","margin-top:-"+mt+"px;");
    
        document.getElementById("drawing").setAttribute("width",""+document.getElementById("container").offsetWidth);
        document.getElementById("drawing").setAttribute("height",""+(document.getElementById("bigger").offsetHeight * 0.97));


        //此处以下都是相关事件绑定代码
        //此处在setRightAnswer中设置连线的正确答案，按照 “（左_右），” 的方式;

        if(/(iPhone|iPad|iPod|iOS|Android)/i.test(navigator.userAgent)){
            unique.clickEve(document.getElementById("drawing"), "touchstart", function(event){unique.mouseDownEvent(event)});
            unique.clickEve(document.getElementById("drawing"), "touchend", function(event){unique.mouseUpEvent();});
        }
        else {
            unique.clickEve(document.getElementById("drawing"), "mousedown", function(event){unique.mouseDownEvent(event)});
            unique.clickEve(document.getElementById("drawing"), "mouseup", function(event){unique.mouseUpEvent();});
        }
        unique.clickEve(document.getElementById("submitBtn"), "click", function(){unique.clickSubmit()});
        unique.clickEve(window, "resize", function(){unique.checkTypeOfUser(); unique.redecorate(unique.linked);});
        unique.clickEve(window,"orientationchange",function(){unique.setShowStyle();});
        unique.setShowStyle();

    }

}

window.onload = function(){
    loading();
}