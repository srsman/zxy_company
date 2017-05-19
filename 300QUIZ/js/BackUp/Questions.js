//常量设置。
var SINGLE = 1;//单选题

var MULT = 2;//多选题

var JUDGE = 3;//判断题目

//选项常量
var A = 1;

var B = 2;

var C = 3;

var D = 4;

var E = 5;

var F = 6;


//存储当前的关卡的内容。
var challenge = function(href){
    return new challenge.prototype.init(href);
}

challenge.prototype = {
    init:function(href){
        
        //每个对象的特殊方法和属性。
        var me = this;
        //问题变量数组对象。
        me.quesList = new Array();
        //记录关卡所花时间。
        me.costTime = 0;
        //记录当前的关卡得分
        me.score = 0 ;
        //记录关卡正确率
        me.rate = 0;
        //设置问题数列内容。
        me.setQuestion = function(ques){
            me.quesList.push(ques);   
        }
       
        me.getQuesDatas(href);
        return this;
    },
    
    //获取当当前的额内容并存储到相对应的变量中。
    getQuesDatas:function(href){
        var temp, jsonObj, i =0, single =4 , mult = 1, checkSingle = 0, checkMult = 0;
        if(parseInt(href.split("_")[0]) == 1 && parseInt(href.split("_")[1]) == 1){
            single = 5; mult = 0;   
        }
        if(parseInt(href.split("_")[0]) == 2){
            single = 3; mult = 2;   
        }
        jsonObj = eval("question"+(temp = href.replace(/\s*/g, "")));
        if(jsonObj){
            for(; i < 5;){
                var random = Math.floor(Math.random()*(jsonObj.questions.length - 1))+1;
                for(var j = 0; j < this.quesList.length; j++){
                    if(this.quesList[j].question == jsonObj.questions[random].q){
                        break;   
                    }
                }
                if(j != this.quesList.length){
                    continue;
                }
                if(j == this.quesList.length){
                    var tempData = questionData(jsonObj.questions[random]);
                    if((tempData.type == SINGLE || tempData.type == JUDGE) && checkSingle < single){
                        this.setQuestion(tempData);
                        i++;
                        checkSingle ++;
                    }
                    else if(tempData.type == MULT && checkMult < mult){
                        this.setQuestion(tempData);
                        i++;
                        checkMult ++;
                    }
                }
            }
        }
        return this;
    },
    
    //setTime是指当前关卡的所用时间
    setTime:function(start, end){
        var temp = end - start;
        this.costTime = temp;
        return this;   
    },
    
    //getTime返回当前记录在案的关卡所用的时间
    getTime:function(){
        return this.costTime;  
    },
    
    //设置问题的所用时间。
    setQuesTime:function(num, start, end){
        this.quesList[num-1].setQuesTime(start, end);
        return this;
    },
    
    //设置当前用户所回答的问题。
    setUserAnswer:function(num, choose){
        var temp = this.quesList[num-1];
        temp.setUserAnswer(choose);
        return this;
    },
    
    //getQuesData获取题目信息，
    getQuesData:function(num){
        return this.quesList[num-1].getQuesData();   
    },
    
    //getQuesRights获取当前题目的正确信息，
    getQuesRights:function(){
        var rightsList = new Array();
        for(var i = 0 ; i < this.quesList.length; i ++){
            rightsList.push(this.quesList[i].correct);   
        }
        return rightsList;
    },
    
    //getIfVideo函数用于判断关卡中的额外任务是否完成。
    getIfVideo:function(){
        return UNFINISH;
    },
    
    //getRights核对当前的关卡是否有连续答对3道题的情况。
    getRights:function(){
        var check = 0;
        
        for(var i = 0;i < this.quesList.length ; i++){
            if(this.quesList[i].correct){
                check ++;
                if(check >= 3){
                    break;   
                }
            }
            else {
                check = 0;   
            }
        }
        if(i != this.quesList.length){
            return FINISH;
        }
        return UNFINISH;   
    },
    
    //getAllRights核对当前关卡是否在60秒中全部答对
    getAllRights:function(){
        var i = 0, check = 0;
        
        if(this.costTime <= 0 && this.costTime > 60){
            return UNFINISH;
        }
        if(this.costTime <= 60){
            for(;i < this.quesList.length; i++){
                if(this.quesList[i].correct){
                    check ++;   
                }
            }
            if(check == this.quesList.length){
                return FINISH;   
            }
        }
        return UNFINISH;   
    },
    
    //getStars获取当前关卡获得的星级数。
    getStars:function(){
        var i = 0 ,check = 0;
        
        for(;i < this.quesList.length; i++){
            if(this.quesList[i].correct){
                check ++;   
            }
        }
        if(check < 3){
            return 0;   
        }
        else{
            return check - 2;   
        }   
    },
    
    //getTotal获取当前关卡的答对的题目数量。
    getTotal:function(){
        var i = 0 ,check = 0;
        
        for(;i < this.quesList.length; i++){
            if(this.quesList[i].correct){
                check ++;   
            }
        }
        return check;
    },
    
    //getRate获取当前的关卡的通关正确率。
    getRate:function(){
        var i = 0 ,check = 0;
        
        for(;i < this.quesList.length; i++){
            if(this.quesList[i].correct){
                check ++;   
            }
        }
        return check/this.quesList.length*100;
    }, 
    
    //getCorrectOfType获取关卡中每种题题目的正确数量。
    getCorrectOfType:function(){
        var single=0, mult=0, judge=0;
        
        for(var i = 0; i < this.quesList.length; i++){
            var temp = this.quesList[i];
            if(temp.correct){
                if(temp.type == SINGLE){
                    single ++;   
                }
                else if(temp.type == MULT){
                    mult ++;   
                }
                else if(temp.type == JUDGE){
                    judge ++;   
                }
            }
        }
        return {"single":single, "mult":mult, "judge":judge};   
    },
    
    //存储当前的用户的答题情况。
    setUserInfo:function(){
        var userSelect = new Array();
        var correct = new Array();
        var costTime = new Array();
        var str = "";
        
        for(var i= 0 ; i < this.quesList.length; i++){
            var tempS = this.quesList[i].userSelect;
            if(tempS instanceof Array){
                str = "";
                for(var j = 0 ; j < tempS.length; j++){
                    str += tempS[j];
                    if(j != tempS.length - 1){
                        str += "_";   
                    }
                }
            }
            else {
                str = "";
                str += tempS;
            }
            userSelect.push(str);
            correct.push(parseInt(this.quesList[i].correct));
            costTime.push(parseInt(this.quesList[i].costTime));
        }
        sessionStorage.setItem("userSelect",userSelect.toString());
        sessionStorage.setItem("correct",correct.toString());
        sessionStorage.setItem("costTime",costTime.toString());
        return this;
    },
    
    //获取存储在本地的相关数据。
    getUserInfo:function(){
        var userSelect = sessionStorage.getItem("userSelect");
        var correct = sessionStorage.getItem("correct");
        var costTime = sessionStorage.getItem("costTime");
        if(userSelect && correct && costTime){
            userSelect = userSelect.split(",");
            correct = correct.split(",");
            costTime = costTime.split(",");
        }
    },
    
    //存储当前的数据在本地中
    toStr:function(){
        var temp = "";
        for(var i = 0 ; i < this.quesList.length; i++){
            temp += this.quesList[i].toStr();
            if(i != this.quesList.length - 1){
                temp += "|";   
            }
        }
        sessionStorage.setItem("questions", temp);
    },
    
    getStr:function(){
        var temp = sessionStorage.getItem("questions");
        if(temp){
            temp = temp.split("|");
            for(var i= 0; i < temp.length; i++){
                this.quesList[i].toData(temp[i]);   
            }
        }
        else {
            return ;   
        }
    }
};
challenge.prototype.init.prototype = challenge.prototype;


//返回当前的问题数据对象
var questionData = function(ques){
    return new questionData.prototype.init(ques);   
}
questionData.prototype = {
    init:function(ques){
        //对象特殊属性和方法。
        var me = this;
        me.question = "";
        me.answer = new Array();
        me.option = new Array();
        me.type = 0;
        me.explain = "";
        //表示当前的问题是否回答正确。
        me.correct = false;
        me.userSelect = "";
        me.costTime = 0;//以秒为单位的时间。
        
        me.question = ques.q;
        for(var i = 0; i < ques.a.length; i++){
            me.answer.push(ques.a[i].correct);
            me.option.push(ques.a[i].option);
        }
        if(ques.type == 1){
            me.type = SINGLE;   
        }
        else if(ques.type == 2){
            me.type = MULT;   
        }
        else if(ques.type == 3){
            me.type = JUDGE;   
        }
        me.explain = ques.explain;
        return this;
    },
    
    //设置当前问题的用户的答案并进行正确判断。
    setUserAnswer:function(choose){//choose传入的数据表示的为数组。或者单一选项时可以输入单一参数。
        var temp, i = 0;
        
        if(typeof(choose) == "object"){
            temp = choose;
        }
        else if(typeof(choose) == "number"){
            temp = new Array();
            temp.push(choose);
        }
        this.userSelect = temp;
        this.checkUserAnswer((temp.toString()));
        return this;
    },
    
    //核对当前的用户答案是不是正确的额。
    checkUserAnswer:function(choose){
        var temp = choose.replace(/\s/g, "");//替换当前的数组中的所有的空格。
        for(var i = 0 ; i < this.answer.length; i ++){
            if(this.answer[i] && (eval("/"+(i+1)+"/g")).test(temp)){
                continue;  //当answer为right的时候，并且在当前的choose中匹配到了有这一数据存在的情况下循环持续。
            }
            else if( !this.answer[i] && !(eval("/"+(i+1)+"/g")).test(temp)){
                continue;  //当answer中标记为false并且在当前的内容中查询不到当前的额内容。
            }
            else {
                break;   
            }
        }
        if(i != this.answer.length){
            this.correct = false; // false表示的是当前的题目回答错误。   
        }
        else {
            this.correct = true;//当前的题目回答正确。   
        }
        return this;
    },
    
    //核对当前答题时长。
    setQuesTime:function(startTime, endTime){
        if(typeof(startTime) == "number"){
            this.costTime = endTime- startTime;
            return this;
        }
        var temp = endTime.getTime() - startTime.getTime();
        this.costTime = temp/1000;
        return this;
    },
    
    //获取当前的问题的相关信息。
    getQuesData:function(){
        return {"question":this.question, "option":this.option, "answer":this.answer, "userAnswer":this.userSelect, "correct":this.correct, "time":this.costTime, "type":this.type, "explain":this.explain};   
    },
    
    //字符转化当前的额数据
    toStr:function(){
        var temp = "question:"+this.question+"_options:";
        temp += this.option.toString();
        temp += "_answer:";
        temp += this.answer.toString();
        temp += "_type:"+this.type+"_explain:"+this.explain+"_userSelect:"+this.userSelect.toString()+"_correct:"+this.correct.toString()+"_costTime:"+this.costTime;
        return temp;
    },
    
    //字符串转化为对象数据。
    toData:function(str){
        var temp = str.split("_");
        this.question = temp[0].split(":")[1];
        var option = temp[1].split(":")[1].split(",");
        this.option = new Array();
        for(var i = 0 ; i < option.length; i++){
            this.option.push(option[i]);
        }
        var answer = temp[2].split(":")[1].split(",");
        this.answer = new Array();
        for(i = 0 ; i < answer.length; i++){
            if(answer == "true"){
                this.answer.push(true);   
            }
            else {
                this.answer.push(false);   
            }
        }
        var type = temp[3].split(":")[1];
        this.type = parseInt(type);
        var explain = temp[4].split(":")[1];
        this.explain = explain;
        var userSelect = temp[5].split(":")[1].split(",");
        this.userSelect = new Array();
        for(i = 0 ; i < userSelect.length; i++){
            this.userSelect.push(userSelect[i]);
        }
        var correct = temp[6].split(":")[1];
        if(correct == "true"){
            this.correct = true;       
        }
        else {
            this.correct = false;   
        }
        var costTime = temp[7].split(":")[1];
        this.costTime = parseInt(costTime);
        return this;
    }
};
questionData.prototype.init.prototype = questionData.prototype;