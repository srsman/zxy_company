var loading = function(){

//    正确答案填写的地方，请示用和一下字符串相同的格式
    var rightAnswer = "1_1,2_2,3_3,4_4,5_5,6_6,7_7,8_8,9_9,10_10";
    
    var userAnswer = "";
    
    var drag = function(){
        
        //数据初始化
        if(drag.prototype.setBaseData === undefined){
            drag.prototype.setBaseData = function(){
                this.typeCount = document.getElementById("type").getAttribute("data-count");
                this.typeLimit = document.getElementById("type").getAttribute("data-limit");
                console.log(this.typeLimit);
                this.dataQuantity = document.getElementById("specific").getAttribute("data-quantity");
                if(this.typeCount && this.typeLimit && this.dataQuantity){
                    return true;
                }
                return false;
            }
        }
        
        //获取当前鼠标的位置
        if(drag.prototype.mouseIntoPosition === undefined){
            drag.prototype.mouseIntoPosition = function(event){
                var e = event || window.event;
                var scrollX = document.documentElement.scrollLeft || document.body.scrollLeft;
                var scrollY = document.documentElement.scrollTop || document.body.scrollTop;
                var x = (e.pageX || e.clientX + scrollX) - document.getElementById("container").offsetLeft;
                var y = (e.pageY || e.clientY + scrollY) - document.getElementById("container").offsetTop;
                finalPostionX = x;
                finalPostionY = y;
                return {'x':x-10, 'y':y-10};
            }
        }
        
        //手机触碰获取
        drag.prototype.getMobilePosition = function(event){
            var touch = event.touches[0]; //获取第一个触点
            var x = Number(touch.pageX); //页面触点X坐标
            var y = Number(touch.pageY); //页面触点Y坐标 
            var containerX = document.getElementById("container").offsetLeft;
            var containerY = document.getElementById("container").offsetTop;
            var tempWidth = document.getElementById("bigger").offsetHeight;
            finalPostionX = y - containerX -5;
            finalPostionY = tempWidth - containerY - x ;
            return {'x':y - containerX -5  , 'y':tempWidth - containerY - x +10 };
        }
        
//        drag.prototype.newOption = function(obj){
//            var newOption = document.createElement("div");
//            var optionHeight = obj.clientHeight;
//            newOption.setAttribute("class", "" + obj.getAttribute("class"));
//            newOption.innerHTML =obj.innerHTML;
//            newOption.setAttribute("id","" + obj.getAttribute("id"));
//            obj.setAttribute("class","specification2");
//            obj.setAttribute("id", "");
//            obj.setAttribute("style", "color:#e5e5e5;");
//            document.getElementById("innerSpec").appendChild(newOption);
//            return newOption;
//        }
        
        drag.prototype.mouseDown = function(ele,event){
             
            event.preventDefault();
//            if(ele.tagName == "div" || ele.tagName == "DIV"){
//                var handler = function(ev){
//                    drag.prototype.mouseMove(ele, ev);
//                }
//                var finished = function(ev){
//                    drag.prototype.mouseUp(ele, handler,finished ,ev);   
//                }
//                var po = {};
//                if(/(iPhone|iPad|iPod|iOS|Android)/i.test(navigator.userAgent)){
//                    po = drag.prototype.getMobilePosition(event);
//                }
//                else {
//                    po = drag.prototype.mouseIntoPosition(event);
//                } 
//                po.x = po.x - document.getElementById("specific").offsetLeft - document.getElementById("innerSpec").offsetLeft;
//                po.y = po.y - document.getElementById("specific").offsetTop - document.getElementById("innerSpec").offsetTop;
//                document.getElementById("innerSpec").appendChild(ele);
//                ele.setAttribute("class","specification");
//                ele.setAttribute("style","position:absolute;top:"+(po.y)+"px;left:"+(po.x)+"px;z-index:100");
//                
//                if(/(iPhone|iPad|iPod|iOS|Android)/i.test(navigator.userAgent)){
//                    document.getElementById("container").addEventListener("touchmove",handler,false);
//                    document.getElementById("container").addEventListener("touchend",finished,false);
//                }
//                else {
//                    document.getElementById("container").addEventListener("mousemove",handler,false);
//                    ele.addEventListener("mouseup",finished,false);
//                }
//                return ;
//            }
            if(ele.parentElement.getAttribute("class") != "innerSpec"){
                ele.setAttribute("class","specification");
                document.getElementById("innerSpec").appendChild(ele);   
            }
            if(ele.tagName != "p" && ele.tagName != "P"){
                return ;   
            }
//            var newOption = drag.prototype.newOption(ele);
//            if(newOption){
//                if(/(iPhone|iPad|iPod|iOS|Android)/i.test(navigator.userAgent)){
//                    newOption.addEventListener("touchstart", function(ev){
//                        drag.prototype.mouseDown(newOption,ev)
//                    },false);   
//                }
//                else{
//                    newOption.addEventListener("mousedown", function(ev){
//                        drag.prototype.mouseDown(newOption,ev)
//                    },false);   
//                }
//            }
            var handler = function(ev){
                drag.prototype.mouseMove(ele, ev);
            }
            var finished = function(ev){
                drag.prototype.mouseUp(ele, handler,finished ,ev);   
            }
            var po = {};
            if(/(iPhone|iPad|iPod|iOS|Android)/i.test(navigator.userAgent)){
                po = drag.prototype.getMobilePosition(event);
            }
            else {
                po = drag.prototype.mouseIntoPosition(event);
            }
            po.x = po.x - document.getElementById("specific").offsetLeft - document.getElementById("innerSpec").offsetLeft;
            po.y = po.y - document.getElementById("specific").offsetTop - document.getElementById("innerSpec").offsetTop;
            if(/(iPhone|iPad|iPod|iOS|Android)/i.test(navigator.userAgent)){
                po.x = po.x-ele.offsetWidth/2;
                po.y = po.y-ele.offsetHeight/2;
            }
            ele.removeAttribute("style");
            var style= window.getComputedStyle(ele,null);
            var fontsize = style.fontSize.split("p")[0];
            var padding = style.paddingLeft.split("p")[0];

            var numtemp = function(str){
                var num = 0;
                if(/[a-z]/i.test(str)){
                    num += str.match(/[a-z]/ig).length;
                }
                if(/[0-9]/i.test(str)){
                    num += str.match(/[0-9]/ig).length;   
                }
                return num;
            };
            var numTemp = numtemp(ele.innerHTML);
            var count = Math.floor(((ele.innerHTML.length - numTemp)*fontsize + numTemp*(fontsize*0.8))/(Math.floor(ele.offsetWidth-2*padding)));
            var lineH = ele.offsetHeight;
            ele.setAttribute("style","line-height:"+lineH/(count+1)+"px;");
            if(ele.getAttribute("style")){
                ele.setAttribute("style",ele.getAttribute("style")+"position:absolute;top:"+(po.y)+"px;left:"+(po.x)+"px;z-index:100;");
            }
            else {
                ele.setAttribute("style","position:absolute;top:"+(po.y)+"px;left:"+(po.x)+"px;z-index:100;");
            }
            if(/(iPhone|iPad|iPod|iOS|Android)/i.test(navigator.userAgent)){
                document.getElementById("container").addEventListener("touchmove",handler,false);
                document.getElementById("container").addEventListener("touchend",finished,false);
            }
            else {
                document.getElementById("container").addEventListener("mousemove",handler,false);
                ele.addEventListener("mouseup",finished,false);
            }
        }
        
        drag.prototype.mouseMove = function(ele,event){
            var po = {};
            if(/(iPhone|iPad|iPod|iOS|Android)/i.test(navigator.userAgent)){
                po = drag.prototype.getMobilePosition(event);
            }
            else {
                po = drag.prototype.mouseIntoPosition(event);
            }
            po.x = po.x - document.getElementById("specific").offsetLeft - document.getElementById("innerSpec").offsetLeft;
            po.y = po.y - document.getElementById("specific").offsetTop - document.getElementById("innerSpec").offsetTop;
            if(/(iPhone|iPad|iPod|iOS|Android)/i.test(navigator.userAgent)){
                po.x = po.x-ele.offsetWidth/2;
                po.y = po.y-ele.offsetHeight/2;
            }
            ele.setAttribute("style",ele.getAttribute("style")+"position:absolute;top:"+(po.y)+"px;left:"+(po.x)+"px;z-index:100;");
        }   
        
        drag.prototype.mouseUp = function(ele,point,finish,event){
//            if(ele.getAttribute("class") == "specification3"){
//                return;   
//            }
            if(/(iPhone|iPad|iPod|iOS|Android)/i.test(navigator.userAgent)){
                document.getElementById("container").removeEventListener("touchmove", point, false);
                document.getElementById("container").removeEventListener("touchend", finish, false);
            }
            else {
                document.getElementById("container").removeEventListener("mousemove", point, false); 
                ele.removeEventListener("mouseup", finish, false);
            }
            var position = {'x': finalPostionX, 'y': finalPostionY};
            var count = document.getElementById("type").getAttribute("data-count");
            var limit = document.getElementById("type").getAttribute("data-limit");
            for(var i = 0 ; i < count; i++){
                var type = document.getElementById("typeBox"+(i+1));
                var typetop = document.getElementById("type").offsetTop + type.offsetTop;
                var typeleft = document.getElementById("type").offsetLeft + type.offsetLeft;
//                if(/(iPhone|iPad|iPod|iOS|Android)/i.test(navigator.userAgent)){
//                      typetop -= 40; 
//                    typeleft -= 40;
//                }
                if(position.y > typetop && position.x > typeleft && position.y < (typetop + type.offsetHeight - 5) && position.x < (typeleft + type.offsetWidth - 5)){
                    if(type.getElementsByTagName("p").length < limit){
                        ele.setAttribute("class","specification3");
                        type.appendChild(ele);
                        break;
                    }
                }
            }
//            var lists = document.getElementById("innerSpec").getElementsByTagName("p");
//            var num = ele.getAttribute("id").split("n")[1];
            
            if(i == count){
//                lists[num-1].setAttribute("class", "specification");
//                lists[num-1].setAttribute("id", ""+ele.getAttribute("id"));
//                lists[num-1].innerHTML = ele.innerHTML;
//                lists[num-1].removeAttribute("style");
//                document.getElementById("innerSpec").removeChild(ele);
//                return false;
                ele.setAttribute("class","specification");
            }
            ele.removeAttribute("style");
            var style= window.getComputedStyle(ele,null);
            var fontsize = style.fontSize.split("p")[0];
            var padding = style.paddingLeft.split("p")[0];

            var numtemp = function(str){
                var num = 0;
                if(/[a-z]/i.test(str)){
                    num += str.match(/[a-z]/ig).length;
                }
                if(/[0-9]/i.test(str)){
                    num += str.match(/[0-9]/ig).length;   
                }
                return num;
            };
            var numTemp = numtemp(ele.innerHTML);
            var count = Math.floor(((ele.innerHTML.length - numTemp)*fontsize + numTemp*(fontsize*0.8))/(Math.floor(ele.offsetWidth-2*padding)));
            var lineH = ele.offsetHeight;
            ele.setAttribute("style","line-height:"+lineH/(count+1)+"px;");
            

            
//            ele.setAttribute("disabled","disabled");
//            lists[num-1].setAttribute("disabled","disabled");
            
            return false;
        }
        
        if(drag.prototype.dialogShow === undefined){
            drag.prototype.dialogShow = function(error){
                if(error){
                    document.getElementById("dialogBlank").setAttribute("style","background-image:url(./pic/plankt.png)");
                    document.getElementById("dialog").setAttribute("style","background-image:url(./pic/wrong.png)");
                    document.getElementById("wrongSound").play();
                }
                else {
                    document.getElementById("dialogBlank").removeAttribute("style");
                    document.getElementById("dialog").removeAttribute("style");
                    document.getElementById("rightSound").play();   
                }
                setTimeout(function(){
                    document.getElementById("dialog").setAttribute("style","display:none");
                    document.getElementById("dialogBlank").setAttribute("style","display:none");
                    document.getElementById("tip").removeAttribute("style");
                    if(/(iPhone|iPad|iPod|iOS|Android)/i.test(navigator.userAgent)){
                        document.getElementById("submitBtn").setAttribute("style","margin-top:-5%");
                    }
                    else{
                        document.getElementById("submitBtn").setAttribute("style","margin-top:-5%");
                    }
                }, 4000);
            }
        }
        
        drag.prototype.restart = function(typeCount){
            for(var i = 0 ; i < typeCount; i++){
                var lists = document.getElementById("typeBox"+(i+1)).getElementsByTagName("p");
                for(var j = 0 ; j < lists.length ;){
                    document.getElementById("specific").appendChild(lists[j]);
                }
            }
        }
        
        drag.prototype.getList = function(){
            var list = document.getElementById("type").getAttribute("data-count");
            var str = new Array();
            for(var i =0 ; i< list ; i++){
                var temp = document.getElementById("typeBox"+(i+1)).getElementsByTagName("p");
                for(var j =0; j < temp.length ; j++){
                    var num = temp[j].getAttribute("id").split("n")[1];
                    str.push(""+(i+1)+"_"+num);
                }
            }
            return str;
        }
        
        drag.prototype.checkAnswer = function(){
            var rightStr = rightAnswer.split(",");
            var lists = drag.prototype.getList();
            if(rightStr.length != lists.length){
                return true;  
            }
            for(var i = 0 ; i < rightStr.length ; i ++){
                for(var j = 0 ; j< lists.length ; j++){
                    if(rightStr[i] == lists[j]){
                        break;   
                    }
                }
                if(j >= lists.length){
                    return true;
                }
            }
            return false;
        }
        
        drag.prototype.recovery = function(ele){
            ele.setAttribute("class", "specification");
            document.getElementById("innerSpec").appendChild(ele);
            var style= window.getComputedStyle(ele,null);
            var fontsize = style.fontSize.split("p")[0];
            var padding = style.paddingLeft.split("p")[0];

            var numtemp = function(str){
                var num = 0;
                if(/[a-z]/i.test(str)){
                    num += str.match(/[a-z]/ig).length;
                }
                if(/[0-9]/i.test(str)){
                    num += str.match(/[0-9]/ig).length;   
                }
                return num;
            };
            var numTemp = numtemp(ele.innerHTML);
            if(((ele.innerHTML.length - numTemp)*fontsize + numTemp*(fontsize*0.8)) < Math.floor(ele.offsetWidth-2*padding)){
                var lineH = ele.offsetHeight;
                ele.setAttribute("style","line-height:"+lineH+"px;");   
            }
        }
        
        drag.prototype.showAnswer = function(str){
            var styleTemp = "specification3";
            if(str == rightAnswer){
                styleTemp = "specification4";
            }
            var temp = str.split(",");
            var num = document.getElementById("type").getAttribute("data-count");
            for(var i =0 ; i < num; i++){
                var count = document.getElementById("typeBox"+(i+1)).getElementsByTagName("p");
                var len = count.length;
                for(var j =0 ; j < len; j++){
                    drag.prototype.recovery(count[0]);
                }
            }
            for(var i = 0; i < temp.length ; i++){
                var temp2 = temp[i].split("_");
                if(temp2[1]){
                    var tempele = document.getElementById("specification"+temp2[1]);
                    tempele.setAttribute("class", styleTemp);
                    document.getElementById("typeBox"+temp2[0]).appendChild(tempele); 
                    var style= window.getComputedStyle(tempele,null);
                    var fontsize = style.fontSize.split("p")[0];
                    var padding = style.paddingLeft.split("p")[0];

                    var numtemp = function(str){
                        var num = 0;
                        if(/[a-z]/i.test(str)){
                            num += str.match(/[a-z]/ig).length;
                        }
                        if(/[0-9]/i.test(str)){
                            num += str.match(/[0-9]/ig).length;   
                        }
                        return num;
                    };
                    var numTemp = numtemp(tempele.innerHTML);
                    if(((tempele.innerHTML.length - numTemp)*fontsize + numTemp*(fontsize*0.8)) < Math.floor(tempele.offsetWidth-2*padding)){
                        var lineH = tempele.offsetHeight;
                        tempele.setAttribute("style","line-height:"+lineH+"px;");   
                    }
                }
                
            }
        }
        
        drag.prototype.clickSubmit = function(){
            if(this.clicked == 3){
                return ;   
            }
            if(this.clicked == 1){
                document.getElementById("submitBtn").innerHTML = "我的答案";
                drag.prototype.showAnswer(rightAnswer);
                this.clicked = 2;
                return ;
            }
            else if(this.clicked == 2){
                document.getElementById("submitBtn").innerHTML = "正确答案";
                drag.prototype.showAnswer(userAnswer);
                this.clicked = 1;
                return ;
            }
            userAnswer = drag.prototype.getList().toString();
            var error = drag.prototype.checkAnswer();
            drag.prototype.dialogShow(error);
            document.getElementById("submitBtn").innerHTML = "正确答案";
            if(error){
                this.clicked= 1;
            }
            else {
                this.clicked = 3; 
                drag.prototype.showAnswer(rightAnswer);
            }
        }

    };
    
    var finalPostionX = 0;
    var finalPostionY = 0;
    
    document.getElementById("dialog").setAttribute("style","display:none;");
    document.getElementById("dialogBlank").setAttribute("style","display:none");
    document.getElementById("tip").setAttribute("style","display:none");
    
    if(/(iPhone|iPad|iPod|iOS|Android)/i.test(navigator.userAgent)){
        var widths = document.getElementById("bigger").offsetWidth;
        var heights = document.getElementById("bigger").offsetHeight;
        document.getElementById("bigger").setAttribute("style","transform:rotate(90deg);width:"+heights+"px;height:"+widths+"px;");
    }

    var tempLists = document.getElementById("innerSpec").getElementsByTagName("p");
    var styless = window.getComputedStyle(tempLists[0],null);
    var margin = styless.marginBottom.split("p")[0];
    var tempHeight = (tempLists[0].offsetHeight + parseFloat(margin))*(document.getElementById("specific").getAttribute("data-quantity"))-parseFloat(margin);
    
    var litemp = document.getElementById("innerSpec").getElementsByTagName("p");
    var style= window.getComputedStyle(litemp[0],null);
    var fontsize = style.fontSize.split("p")[0];
    var padding = style.paddingLeft.split("p")[0];
    
    for(var i = 0 ; i < litemp.length ; i++){
        var numTemp = numNum(litemp[i].innerHTML);
        var count = Math.floor(((litemp[i].innerHTML.length - numTemp)*fontsize + numTemp*(fontsize*0.8))/(Math.floor(litemp[i].offsetWidth-2*padding)));
        var lineH = litemp[i].offsetHeight;
        litemp[i].setAttribute("style","line-height:"+lineH/(count+1)+"px;");
    }
    
    function numNum(str){
        var num = 0;
        if(/[a-z]/i.test(str)){
            num += str.match(/[a-z]/ig).length;
        }
        if(/[0-9]/i.test(str)){
            num += str.match(/[0-9]/ig).length;   
        }
        return num;
    }
    
    var unique = new drag();
    
    unique.setBaseData();
    for(var i = 0; i < unique.dataQuantity; i ++){
        (function(){
            var p = i;
            if(/(iPhone|iPad|iPod|iOS|Android)/i.test(navigator.userAgent)){
                document.getElementById("specification"+(p+1)).addEventListener("touchstart", function(event){
                    unique.mouseDown(document.getElementById("specification"+(p+1)),event);
                },false);
            }
            else {
                document.getElementById("specification"+(p+1)).onmousedown = function(event){
                    unique.mouseDown(document.getElementById("specification"+(p+1)),event); 
                };
            }
        })();
    }
    
    document.getElementById("submitBtn").addEventListener("click",function(){
        unique.clickSubmit();
    },false);

}

window.onload = function(){
    loading();   
}