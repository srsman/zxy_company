var loading = function(){
    
    //答案设置序列
    var answer = "4,5,3,6,7,1,2";
    var limit = 1;
    
    
    var clicked = 0;
    var userStr = "";
    var trip = function(){
        
        //当前排序序列获取函数
        trip.prototype.freshList = function(){
            var freshlist = new Array();
            var ele = document.getElementById("container").getElementsByClassName("tripContent");
            for(var i = 0 ; i < ele.length ; i++){
                if(parseInt(ele[i].getAttribute("id"))){
                    freshlist.push(ele[i].getAttribute("id"));
                }
            }
            return freshlist.toString();
        }
        
        //手机触碰获取
        trip.prototype.getMobilePosition = function(event){
            var touch = event.touches[0]; //获取第一个触点
            var x = Number(touch.pageX); //页面触点X坐标
            var y = Number(touch.pageY); //页面触点Y坐标 
            var containerX = document.getElementById("container").offsetLeft;
            var containerY = document.getElementById("container").offsetTop;
            return {'x':x - containerX , 'y':y - containerY};
        }
        
        //鼠标坐标获取
        trip.prototype.getPosition = function(event){
            var e = event || window.Event;
            var scrollX = document.documentElement.scrollLeft || document.body.scrollLeft;
            var scrollY = document.documentElement.scrollTop || document.body.scrollTop;
            var x = e.pageX || e.clientX + scrollX;
            var y = e.pageY || e.clientY + scrollY;
            var containerX = document.getElementById("container").offsetLeft;
            var containerY = document.getElementById("container").offsetTop;
            this.mousex = x - containerX;
//               document.getElementById("x").innerHTML = "mouseX:" + this.mousex;
            this.mousey = y - containerY;
//               document.getElementById("y").innerHTML = "mouseY:" + this.mousey;
            return {'x':this.mousex, 'y':this.mousey};
        }
        
//        鼠标开始或是触屏开始事件
        trip.prototype.mouseDownEvent = function(ele,event){
            event.preventDefault();
            var newEle = trip.prototype.eleOperation(ele);
            this.handler = function(ev){
                //ev.preventDefault();
                trip.prototype.mouseMove(newEle,ev);
            };
            var handlers = this.handler;
            var endHandler = function(ev){
                trip.prototype.mouseUpEvent(newEle, handlers, endHandler);
            };
            this.endHandler =endHandler;
            if(/(iPhone|iPad|iPod|iOS|Android)/i.test(navigator.userAgent)){
                po = trip.prototype.getMobilePosition(event);
            }
            else {
                po = trip.prototype.getPosition(event);
            }
            
            if(/(iPhone|iPad|iPod|iOS|Android)/i.test(navigator.userAgent)){
                document.getElementById("container").addEventListener("touchmove", this.handler ,false);
                document.getElementById("container").addEventListener("touchend", this.endHandler ,false);
                newEle.setAttribute("style","position:absolute; top:"+(po.y-20)+"px;left:4.9%;z-index:100;");
            }
            else{
                document.getElementById("container").onmousemove = function(ev){
                    trip.prototype.mouseMove(newEle,ev);
                }
                document.getElementById("container").onmouseup = function(ev){
                    trip.prototype.mouseUpEvent(newEle);
                }
                newEle.setAttribute("style","position:absolute; top:"+(po.y-20)+"px;left:28.3%;z-index:100;");
            }
        }   
        
//        鼠标移动或是触屏移动事件
        trip.prototype.mouseMove = function(ele,events){
            var po = {};
            if(/(iPhone|iPad|iPod|iOS|Android)/i.test(navigator.userAgent)){
                po = trip.prototype.getMobilePosition(events);
            }
            else {
                po = trip.prototype.getPosition(events);
            }
            var orderLists = trip.prototype.freshList();
            if(/(iPhone|iPad|iPod|iOS|Android)/i.test(navigator.userAgent)){
                ele.setAttribute("style","position:absolute; top:"+(po.y-20)+"px;left:4.9%;z-index:100;");
            }
            else {
                ele.setAttribute("style","position:absolute; top:"+(po.y-20)+"px;left:28.3%;z-index:100;");
            }
            trip.prototype.checkPostion(ele, orderLists);
        }   
        
//        鼠标点击结束或是触屏结束事件
        trip.prototype.mouseUpEvent = function(ele,fn, endfn){
            trip.prototype.upOperation(ele);
            var eleId= ele.getAttribute("id").split("_")[1];
            document.getElementById(""+eleId).removeAttribute("style");
            if(/(iPhone|iPad|iPod|iOS|Android)/i.test(navigator.userAgent)){
                document.getElementById("container").removeEventListener("touchmove", fn ,false);
                document.getElementById("container").removeEventListener("touchend", endfn ,false);
            }
            else{
                document.getElementById("container").onmousemove = "";
                document.getElementById("container").onmouseup = "";
            }
        }
        
        
        trip.prototype.eleOperation = function(ele){
            ele.setAttribute("style","visibility:hidden;");
            var newEle = document.createElement("div");
            newEle.setAttribute("class", "tripContent");
            newEle.setAttribute("id","trip_"+(ele.getAttribute("id")));
            newEle.innerHTML = ele.innerHTML;
            document.getElementById("container").appendChild(newEle);
            return newEle;
        }
        
        trip.prototype.upOperation = function(ele){
            document.getElementById("container").removeChild(ele);
        }
        
//        当前位置核对和修改函数
        trip.prototype.checkPostion =function(ele, orderLists){
            var positionY = ele.offsetTop;
            var check = 0;
            var orderlis = orderLists.split(",");
            var number = 0;
            var eleId = ele.getAttribute("id").split("_")[1];
            var moveEle = document.getElementById(""+eleId);
            for(var j = 0 ; j < orderlis.length; j++){
                if(orderlis[j] == eleId){
                    number = j;
                    break;
                }
            }
            for(var i = 0 ; i < orderlis.length; i++){
                var option = document.getElementById(orderlis[i]);
                if(option == moveEle){
                    check = 1;
                }
                else if((option.offsetTop + option.offsetHeight/2) >= positionY){
                    if(check == 0){
                        document.getElementById("showout").insertBefore(moveEle, option);
                        number--;
                        break;
                    }
                }
                else if((option.offsetTop - option.offsetHeight/2) <= positionY){
                    if(check == 1){
                        document.getElementById("showout").insertBefore(option,moveEle);
                        number++;
                    }
                }
            }
        }
        
        trip.prototype.submitBtn = function(){
            if(clicked >= limit && this.subClicked == 3){
                return;   
            }
            if(this.subClicked == 1){
                document.getElementById("submitBtn").innerHTML = "我的答案";
                trip.prototype.showRights(answer,true);
                this.subClicked = 2;
            }
            else if(this.subClicked == 2){
                document.getElementById("submitBtn").innerHTML = "正确答案";
                trip.prototype.showRights(userStr,false);
                this.subClicked = 1;
            }
            else{
                clicked ++;
                userStr = trip.prototype.freshList();
                if(answer == trip.prototype.freshList()){
                    trip.prototype.showDialog();
                    document.getElementById("rightVideo").play();
                    this.subClicked = 3;
                    clicked = limit;
                    document.getElementById("submitBtn").innerHTML = "正确答案";
                    trip.prototype.showRights(answer, true);
                }
                else{
                    trip.prototype.showDialog(true);
                    document.getElementById("wrongVideo").play();
                    if(clicked >= limit){
                        this.subClicked = 1; 
                        document.getElementById("submitBtn").innerHTML = "正确答案";
                    }
                }
            }
        }
        
        trip.prototype.showRights = function(ansStr, styleStr){
            var answerList = ansStr.split(",");
            for(var i = 0 ; i < answerList.length ; i++){
                document.getElementById("showout").appendChild(document.getElementById(""+answerList[i]));
                if(styleStr){
                    document.getElementById(""+answerList[i]).setAttribute("style","border: 2px #f9a101 solid");
                }
                else {
                    document.getElementById(""+answerList[i]).removeAttribute("style");   
                }
            }
        }
        
        trip.prototype.showDialog = function(error){
            var dialogBlank = document.getElementById("dialogBlank");
            var dialog = document.getElementById("dialog");
            dialogBlank.removeAttribute("style");
            if(/(iPhone|iPad|iPod|iOS|Android)/i.test(navigator.userAgent)){
                if(error){
                    dialog.removeAttribute("style");
                }
                else {   
                    dialog.setAttribute("style","background-image:url(./pic/right.png)");
                }
            }
            else{
                if(error){
                    dialog.setAttribute("style","background-image:url(./pic/wrong2.png)");
                }
                else {   
                    dialog.setAttribute("style","background-image:url(./pic/right2.png)");
                }   
            }
            setTimeout(function(){
                dialogBlank.setAttribute("style","display:none");
                dialog.setAttribute("style","display:none");
                if(clicked >= limit){
                    document.getElementById("tip").removeAttribute("style");
                    if(/(iPhone|iPad|iPod|iOS|Android)/i.test(navigator.userAgent)){
                        document.getElementById("submitBtn").setAttribute("style","margin-top:-148px"); 
                    }
                    else {
                        document.getElementById("submitBtn").setAttribute("style","margin-top:-60px");
                    }
                }
            },4000);
        }
    }
    
    var unique = new trip();
    
    
    document.getElementById("dialogBlank").setAttribute("style","display:none");
    document.getElementById("dialog").setAttribute("style","display:none");
    document.getElementById("tip").setAttribute("style","display:none");
    
    var content = document.getElementById("title").innerHTML;
    var styles = window.getComputedStyle(document.getElementById("title"),null);
    var fontsize = styles.fontSize;
    var temp = fontsize.split("p")[0];
    if(/(iPhone|iPad|iPod|iOS|Android)/i.test(navigator.userAgent)){
        if(content.length*temp > document.getElementById("headTitle").offsetWidth-160){
            document.getElementById("title").setAttribute("style","margin-top: -130px;font-size: 260%;");
        }
    }
    else {
        if(content.length*temp > document.getElementById("headTitle").offsetWidth-50){
            document.getElementById("title").setAttribute("style","font-size: 120%;margin-top: -44px;");
        }
    }
    
    var lists = document.getElementById("container").getElementsByClassName("tripContent");
    for(var i = 0 ; i < lists.length ; i++){
        (function(){
            var p = i;
            if(/(iPhone|iPad|iPod|iOS|Android)/i.test(navigator.userAgent)){
                document.getElementById(""+(p+1)).addEventListener("touchstart", function(ev){
                    unique.mouseDownEvent(document.getElementById(""+(p+1)),ev);
                },false);
                
            }else {
                document.getElementById(""+(p+1)).onmousedown = function(ev){
                    unique.mouseDownEvent(document.getElementById(""+(p+1)),ev);
                }
            }
        })();
    }
    document.getElementById("submitBtn").onclick = unique.submitBtn;
    
}

window.onload = function(){
    loading();
}