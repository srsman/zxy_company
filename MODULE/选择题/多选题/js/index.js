var loading = {
    
    _answer:"1_2_3",
    
    _userAnswer: "",
    
    _finished:false,
    
    _showingPage:1,
    
    _answerColor: "red",
    
    _optionCount:parseInt(document.getElementById("content").getAttribute("optionCount")),
    
    init:function(){
        if(!((/Android|IOS|iPhone|iPad|iPod/).test(window.navigator.userAgent))){
            document.getElementById("plankt").removeAttribute("hidden");
            document.getElementById("wrongImage").setAttribute("src", "image/wrong.png");
            document.getElementById("wrongImage").setAttribute("style", "width: 60%;top: 0;left: 0;right: 0;bottom: 0;margin: auto;");
            document.getElementById("rightImage").setAttribute("src", "image/right.png");
        }
        this._bindEvent();
    },
    
    //bind elemnt with events.
    _bindEvent:function(){
        for(var i = 0 ; i < this._optionCount; i++){
            (function(){
                var p = i;
                var ele = document.getElementById("choose"+(p+1));
                ele.addEventListener("click", function(){
                    loading._chooseClickEvent.call(loading, ele);
                });
            })();   
        }
        document.getElementById("submitBtn").addEventListener("click", function(){
            loading._submitBtnClickEvent.call(loading);
        });
    },
    
    //choose click events
    _chooseClickEvent:function(ele){
        
        var check = ele.getElementsByClassName("checkClick")[0];
        if(check.getAttribute("style")){
            check.removeAttribute("style");
        }
        else {
            check.setAttribute("style", "background-image:url(image/choosed.png)");   
        }
    },
    
    //submit button click events
    _submitBtnClickEvent:function(){
        
        if(!this._finished){
            var result = this._checkAnswer();
            this._finished = true;
            this._showingHint(result);
            this._showingAnswerPage(this._answer, this._answerColor);
            if(result){
                this._showingPage = 3;
                document.getElementById("submitBtn").innerHTML = "答案如上";
            }
            else {
                document.getElementById("submitBtn").innerHTML = "我的答案";
                this._showingPage = 2;   
            }
            return;
        }
        if(this._showingPage == 1){
            this._showingPage = 2; 
            this._showingAnswerPage(this._answer, this._answerColor);
            document.getElementById("submitBtn").innerHTML = "我的答案";
        }
        else if(this._showingPage == 2){
            this._showingAnswerPage(this._userAnswer);
            document.getElementById("submitBtn").innerHTML = "正确答案";
            this._showingPage = 1;
        }
        else if(this._showingPage == 3){
            return;   
        }
    },
    
    //Showing Right Answer
    _showingAnswerPage:function(ansStr, color){
        //解析设定的正确答案字符串。
        this._hideStyle(); //取消当前的额页面上选项的所有样式。
        var setStyle = function(ele){
            if(ele){
                ele.getElementsByClassName("checkClick")[0].setAttribute("style", "background-image:url(image/choosed.png);");
                if(color){
                    ele.getElementsByClassName("chooseContent")[0].setAttribute("style","color:"+color);
                }
            }
        }
        
        var answerArray = ansStr.split("_");
        
        for(var  i = 0 ; i < answerArray.length; i++){
            setStyle(document.getElementById("choose"+answerArray[i]));
        }
    },
    
    //Check user answer
    _checkAnswer:function(){
        var users = "";
        
        for(var i = 0; i < this._optionCount; i++){
            if(document.getElementById("choose"+(i+1)).getElementsByClassName("checkClick")[0].getAttribute("style")){
                if(users){
                    users += "_";   
                }
                users += ""+(i+1);
            }
        }
        this._userAnswer = users;
        if(this._userAnswer == this._answer){
            return true;   
        }
        return false;
    },
    
    
    //样式初始化
    _hideStyle:function(){
        for(var i = 0 ; i < 4; i++){
            document.getElementById("choose"+(i+1)).getElementsByClassName("checkClick")[0].removeAttribute("style");
            document.getElementById("choose"+(i+1)).getElementsByClassName("chooseContent")[0].removeAttribute("style");
        }
    },
    
    //showing hint that is radio and painting.
    _showingHint:function(result){
        var paintingEle;
        var radioEle;
        if(result){
            paintingEle = document.getElementById("rightBack");
            radioEle = document.getElementById("rightSong");
        }
        else {
            paintingEle = document.getElementById("wrongBack");
            radioEle = document.getElementById("wrongSong");   
        }
        paintingEle.removeAttribute("hidden");
        radioEle.currentTime = 0;
        radioEle.play();
        setTimeout(function(){
            paintingEle.setAttribute("hidden", "hidden");
            radioEle.pause();
            document.getElementById("tips").removeAttribute("hidden");
            document.getElementById("submitBtn").setAttribute("style", "margin-top:-35px");
        },3000);
    }
};

window.onload = function(){
    loading.init();
}   