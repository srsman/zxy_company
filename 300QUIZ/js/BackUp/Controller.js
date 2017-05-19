//要求返回的连接的类型。
var RESTART = 1;
var NEXTCHALLENGE = 2;
var BACKTO = 3;
var MOVETO = 4;

//每种类型的题目的分值多少。
var SINGLE_SCORE = 50;
var MULT_SCORE = 70;

var _chall_Ques_count = 5;

//当前的controller实际上是一个数据出来还是南湖的汇总，通过当前的内容进行对于当前页面信息的内容的归总和返回。
var Controller= function(href){
    return new Controller.prototype.init(href);
}
Controller.prototype = {
    
    
    //初始化当前的内容并存储相关的信息。
    init:function(href){
        
        var me = this;
        
        //URL操作对象内容存储。
        me.HrefOp = "";
        //平台数据操作对象内容存储。
        me.PlantOp = "";
        //问题对象存储变量。
        me.QuesOp = "";
        
        return me.getSettingData(href);//初始化当前页面的数据啊。
    },
    
    getUnitInfo:function(level, unit){
        var count = 0;
        if(level == 1 && unit == 1){
            count = 4;   
        }
        else if(level == 1){
            count = 5;   
        }
        else if(level == 2){
            count = 4;  
        } 
        else {
            count = 3;   
        }
        var total = 0;
        for(var i = 0 ; i < count; i++){
            var challInfo = this.getChallengeData(level+"_"+unit+"_"+(i+1));
            if(challInfo){
                total += challInfo.total;
            }
        }
        return total;
    },
    
    //返回当前页面的设置数据。用于设置当前页面中的基础显示数据的。
    getSettingData:function(href){
        this.PlantOp = PlantForm();
        this.HrefOp = HrefOperation(href);
        if(this.HrefOp.getInfo()){
            this.QuesOp = challenge(this.HrefOp.getInfo()); 
        }
        else {
            this.QuesOp = null;   
        }
        return this;   
    },
    
    //getBaseData获取当前的平台的基本数据。
    getBaseData:function(){
        if(this.PlantOp){
            return this.PlantOp.getBaseData();   
        }
        return null;
    },
    
    //getChallengeData获取关卡的整体数据。传入的数据时X_X_X的形式
    getChallengeData:function(key){
        if(this.PlantOp){
            return this.PlantOp.getChallengeData(key);
        }
        return null;
    },
    
    //getChallengeInfo一句当前用户选取的等级来获取所有当前等级的关卡信息。
    getChallengeInfo:function(level){
        if(this.PlantOp){
            return this.PlantOp.getChallengeInfo(level);   
        }
        return null;
    },
    
    //getQuestionData获取当前的问题的内容。
    getQuestionData:function(num){
        if(this.QuesOp){
            return this.QuesOp.getQuesData(num);   
        }
        return null;
    },
    
    //getQuesRights获取问题正确与否。
    getQuesRights:function(){
        return this.QuesOp.getQuesRights();  
    },
    
    getQuesSessionData:function(){
        if(this.QuesOp){
            this.QuesOp.getStr();   
        }
        return this;
    },
	
	getLists:function(fn){
		return 	this.PlantOp.getResult(fn);
	},
    
    setQuesSessionData:function(){
        if(this.QuesOp){
            this.QuesOp.toStr();   
        }
        return this;
    },
    
    //setBaseData设置页面的基本数据。
    setBaseData:function(sorce){
        if(this.PlantOp){
            return this.PlantOp.updateBaseData(score);   
        }
        return null;
    },
    
    //setChallengeData用于更新关卡的数据。
    setChallengeData:function(key, total, stars, ifVideo, rights, allRights){
        if(this.PlantOp){
            return this.PlantOp.updataChallengeData(key, total, stars, ifVideo, rights, allRights);  
        }
        return null;
    },
    
    //updatePlantForm更新当前的平台中的数据。
    updatePlantForm:function(){
        if(this.PlantOp){
            this.PlantOp.updatePlantForm();   
        }
        return this;
    },
    
    //setUserAnswer设置相应的题目的用户选择的答案。
    setUserAnswer:function(num, choose){
        if(this.QuesOp){
            this.QuesOp.setUserAnswer(num, choose);
        }
        return this;
    },
    
    //setChallengeTime设置当前关卡的挑战时间。
    setChallengeTime:function(start, end){
        if(this.QuesOp){
            this.QuesOp.setTime(start, end);   
        }
        return this;
    },
    
    //setQuestionTime设置问题回答所用的时间
    setQuestionTime:function(num, start, end){
        if(this.QuesOp){
            this.QuesOp.setQuesTime(num, start, end);   
        }
        return this;
    },
    
    //setQues设置问题数据用户选取内容，用户选择正确与否以，用户答题时间的存储。
    setQues:function(num, choose, start, end){
        if(this.QuesOp){
            this.QuesOp.setUserAnswer(num, choose);
            this.QuesOp.setQuesTime(num, start, end);
        }
        return this;
    },
    
    //counting计算当前的关卡分数并返回页面中要显示的数据。判断当前页面中要显示什么数据。并计算当前的用户再次关卡的分数。然后更新当前的平台的分数并把当前的内容传递到平台上面。
    counting:function(){
        var  costTimeTotal = 0, score = 0 , total = 0, typeTotal = {}, stars = 0, rate = 0, ifVideo = 0, rights = 0, allRight = 0, temp, single = SINGLE_SCORE , mult = MULT_SCORE;
        
        if(this.QuesOp){
            costTimeTotal = this.QuesOp.getTime();
            stars = this.QuesOp.getStars();
            total = this.QuesOp.getTotal();
            typeTotal = this.QuesOp.getCorrectOfType();
            rate = this.QuesOp.getRate();
            ifVideo = this.QuesOp.getIfVideo();
            rights = this.QuesOp.getRights();
            allRight = this.QuesOp.getAllRights();
            temp = this.PlantOp.updataChallengeData(this.HrefOp.getInfo(), total, stars, ifVideo, rights, allRight);
            
            if(this.HrefOp.level >= 2){
                single += 10;
                mult += 10;
            }
            if(this.HrefOp.level >= 3){
                single += 5;
                mult += 5;
            }
            score = typeTotal.single * single + typeTotal.mult * mult + typeTotal.judge * single;
            
            if(costTimeTotal <= (5*60*0.5)){
                score = score*1.5;
            }
            else if(costTimeTotal > (5*60*0.5) && costTimeTotal <= (5*60*0.75)){
                score = score*1.25;   
            }
            
            if(stars > temp.stars){
                if(stars == 1){
                    score += 200;   
                }
                else if(stars == 2){
                    score += 500;   
                }
                else if(stars == 3){
                    score += 1000;   
                }
            }
            if(temp.ifvideo == SHOWHINT){
                score += 500;
                ifVideo = FINISH;
            }
            else{
                ifVideo = UNFINISH;   
            }
            if(temp.rights == SHOWHINT){
                score += 1000;
                rights = FINISH;
            }
            else {
                rights = UNFINISH;   
            }
            if(temp.allright == SHOWHINT){
                score += 1500;
                allRight = FINISH;
            }
            else{
                allRight = UNFINISH;   
            }
            this.PlantOp.updateBaseData(score);
            this.PlantOp.updatePlantForm();
            this.QuesOp.toStr();
            
            var result;
            result = this.PlantOp.accomplish(this.HrefOp.level);
            var complete;
            complete = this.PlantOp.complete();
            return {"score":score ,"total":total, "stars":stars, "ifVideo":ifVideo, "rights":rights, "allRight":allRight, "accomplish":result, "rates":rate,"complete":complete};
        }
    },
    
    checkComplete:function(){
        if(this.PlantOp){
            var complete = this.PlantOp.complete();
            return complete;
        }
        return false;
    },
    
    //getTransFormUrl表示的是当前
    getTransformUrl:function(pageURL, type){
        switch(type){
            case RESTART: return ""+pageURL+this.HrefOp.getRestart();break;      
            case NEXTCHALLENGE: return ""+pageURL+this.HrefOp.getNextChallengeURl(arguments[2]);break;
            case BACKTO: return ""+pageURL+this.HrefOp.getHistoryUrl();break;
            case MOVETO: return ""+pageURL+this.HrefOp.getForwardUrl(arguments[2], arguments[3], arguments[4]);break;
            default: return "home.html";
        };
    },
    
    //此处函数内容耦合性过高，不建议使用。
    getKeyOfChallenge:function(){
        return this.HrefOp.level;   
    }
};
Controller.prototype.init.prototype = Controller.prototype;