//1。平台数据字段。
var KEY = "cmi.suspend_data";

var STATUS = "cmi.core.lesson_status";

var HOST = "tmooc.zhixueyun.com"

//2.当前的关卡中的总题目数。
var PRIMARY_QUES = 195;
var PRIMARY_CHALL = 39;

var SENIOR_QUES = 60;
var SENIOR_CHALL = 12;

var HIGH_QUES = 45;
var HIGH_CHALL = 9;

//3.表示任务已经完成
var FINISH = 1;

var UNFINISH = 0;

var SHOWHINT = 2;

var UNCHANGE = "unchange";

//4.初始化数据设置。
var INIT = "game,300quiz,0,0,0,0";

var CONNECTION = 1;

var UNCONNECTION = 0;


//plantForm负责平台交互和数据的更新。
var PlantForm = function(){
    return new PlantForm.prototype.init();
}
PlantForm.prototype = {
	
    
    //函数功能：
    //  1.设置存储当前对象的特殊内容的变量和相关的处理方法。
    //  2.调用判断当前内容是否可以连接到平台。并存储判断信息。
    //  3.根据当前的额内容获取存储的字符串的值。
    //  4.转换获取的额存储内容并存储到当前特殊字符段中。
    //  5.返回相关的this指针，代表当前的新对象。
    init:function(){
        
        //设置当前对象的特殊数据和方法。
        var me =this;
        
        //当前对象中的私有变量声明。
        var plantData = "";
        me.scormId = '';
        //用于存储当前是否连接到平台。0表示可以连接到平台，而1表示不能连接到平台。
        me.connection = CONNECTION;
        
        //问题内容的设置,data数据是一个plantData对象。程序内部控制当前的data将不会出错。
        me.setData = function(data){
			this.scormId = data.getScormId();
            plantData = data;
        }
        
        //获取当前的问题内容。当当前的对象中没有问题数据的时候。我们返回的将会是undefined
        me.getData = function(){
            if(!plantData){
                return null;
            }
            return plantData;
        }
        
        //调用方法已达到初始化当前的对象中的数据的目的。
        me.connectTo();
        
        var result;
        result = this.getValueOfStorage();//获取当前的存储字段的内容。如果是首次进入这实行初始化数据的处理。
        me.plantDataInit(result);//设置初始化的平台数据对象。
        return this;
    },
    
    //connectTo函数逻辑：
    //  1.调用doLMSGetValue函数获取当前的内容.
    //  2.如果当前的内容为空字符串则说明没有连接到当前的平台中，如果获取的内容是"null"则我们可以确定当前的页面连接到了平台。
    //  3.如果当前页面没有连接到平台则将当前对象的连接状态更改为UNCONNECT。
    //  4.如果当前的页面连接到了，则直接设置成为CONNECTED;
    connectTo: function(){
        var result;
		
        result = doLMSGetValue(STATUS);
        
        if(result === 'null' || result === 'undefined' || result === null || result === undefined || !result){
            this.connection = UNCONNECTION;   
        }
        else {
            this.connection = CONNECTION;   
        }
    },
    //getValueOfStorage获取存储的额内容。
    //  1.判断当前的连接状态。
    //  2.一句判断的数据来获取相应的值。
    //  3.判断获取的值，如果当前的值是空着使用定义好的初始值进行返回。
    //  4.如果当前的最终值为初始化值得时候，存储当前的额初始值。
    getValueOfStorage:function(){
        var result,scoreID;
		
        if(this.connection) { //当前的连接状态为已经连接到平台的情况。
            result = doLMSGetValue(STATUS); // 获取当前的平台数据。
            if(result == "not attempted"){
				doLMSSetValue('300quiz', 'cmi.core.scorm_id');
                result = INIT;
                this.setValue(INIT);
				doLMSSetValue( "cmi.core.lesson_status", "incomplete" );
				doLMSCommit();
        		doLMSFinish();
            }
			else {
				scoreID = this.getValue("cmi.core.scorm_id");
				result = this.getValue();
				if(scoreID != null){
					result = result.replace(/300quiz/, scoreID);
				}
			}
        }
        else {
            result = sessionStorage.getItem(KEY);
            if(!result){
                result = INIT;
                this.setValue(INIT);
            }
        }
        return result;
    },
    
    //plantDataInit为当前页面数据转换累的函数。传递的内容为str类型并按照相关的额格式。
    //  1.获取当前字符串并把当前的数据内容编传递到Plantdata对象的构造方法中进行数据对象的初始化。
    //  2.根据返回的内容对当前对象中的内容进行内容的相对应的设置。
    plantDataInit:function(str){
        var result;
        
        result = PlantData(str);
        this.setData(result);
    },
    
    //getValue用于获取平台数值
    //  1.使用doLMSGetValue函数来获取当前的值。
    //  2.设置当前的额已经结束，通过doFinish()函数来进行的。
    getValue:function(keys){
        var result;
        
		if(!keys){
			keys = KEY;	
		}
		
        result = doLMSGetValue(keys);
        if(!result){
            result = sessionStorage.getItem(keys);   
        }
        doLMSCommit();
        doLMSFinish();
        return result;
    },
    
    //setValue设置平台数据。
    //  1.设置当前平台内容的相关数据。
    setValue:function(value, keys){
		if(!keys){
			keys = KEY;	
		}
        var result = doLMSSetValue(keys, value);
        if(!result){
            sessionStorage.setItem(keys, value);   
        }
    },
    
    //设置当前的课程是完成状态。
    finishCheck:function(station){
        var status = doLMSGetValue( "cmi.core.lesson_status" );
        if(status == "complete"){
            return;   
        }
        if(/incomplete/ig.test(station)){
            doContinue("incomplete");   
        }
        else if(/complete/ig.test(station)){
            doContinue("completed");   
        }
    },
    
    //updateChallengeData用于更新当前的当前的平台数据使用的。
    //  1.调用当前的plantData对象中的updateChallengeData方法来更新关卡数据。
    //  2.返回这一关卡的最终提交数据。
    updataChallengeData:function(key, total, stars, ifvideo, right, allright){
        return this.getData().updateChallengeData(key, total, stars, ifvideo, right, allright);
    },
    
    //updateBaseData更新当前的基础数据
    //  1.调用plantData对象中的updateBaseData方法来进行相关的操作。
    //  2.返回最终计算得出的基础数据。
    updateBaseData:function(score){
        return this.getData().updateBaseData(score);
    },
    
    //更新平台数据
    updatePlantForm:function(){
        this.setValue(this.getData().toStr());     
    },
    
    //getChallengeData获取关卡的数据
    getChallengeData:function(key){
        return this.getData().getChallengeData(key);
    },
    
    //获取当前等级的所有的关卡的信息。
    getChallengeInfo:function(level){
        return this.getData().getChallengeInfo(level);   
    },
    
    //getBaseData获取页面基础数据
    getBaseData:function(){
        return this.getData().getBaseData();   
    },
	
	getResult:function(func){
		var hosts = window.location.host;
		var confire = '/zxy-manage/courseScormIntegral?scormId=';
		var scormId = this.scormId;
		$.ajax({
			type:'GET',
			url:"http://"+hosts+confire+scormId, 
			success:function(data,status){
				if(status == '404'){
					data = "";	
				}
				func(data);
			},
			error:function(){
				alert('failure to getting data');
				func('');
			}
		});
	},
    
    //accomplish测试是否完成当当前关卡。
    accomplish:function(num){
        return this.getData().accomplish(num);
    },
    
    //判断当前课程是否已经结束
    complete:function(){
        if(this.getData().complete()){
			this.finishCheck('complete');
			return true;
		}
		return false;
    }
};
PlantForm.prototype.init.prototype = PlantForm.prototype;


//plantData对象存储的相关的额平台数据内容。
var PlantData = function(str){
    return new PlantData.prototype.init(str);
}
PlantData.prototype = {
    
    //init初始化函数：
    //  1.对于对象的特殊化内容的存储进行申明和定义。
    //  2.对于传递的内容调用toData方法来进行相关的转化和存储。
    //  3.返回当前的额对象。
    init:function(str){
      
        //当前对象中的特殊方法和数据。
        var me = this;
        //当前的额内容表示的存储的数据的内容。
		me.type = "game";//游戏类型
		me.title = "300quiz";//游戏名称
        me.score = 0;//用户总分
        me.total = 0;//用户总答对题目数
        me.tech = 0;//用户技能篇答对数量。
        me.business = 0;//用户销售篇答对数量。
        me.manage = 0;//用户管理篇答对数量。
        me.userDefined = new Array();//表示的是当前的用户自定义数据在与首5个数据和关卡数据存储之间。
        me.challKey = new Array();//表示的是当前关卡编号列表。
        me.challValue = new Array();//表示的是当前的额关卡数据列表。存储的是当前的关卡数据对象内容。
        //chalKey与challValue的两个内容是相互的，其之间是键值对的关系。
        
        me.toData(str);
        return this; //初始化错误的情况下放回的内容是所有数据全完0或者空的对象内容。
    },
    
    //toData转化字符串为对象可存储的形式并存入到对象的特定存储变量中。
    //  1.分解当前的字符串成为数组，并把数组中的内容编写到字符串中。
    toData:function(str){ //但钱函数只在内部进行调用的所以不会出现当前的额内容出错的状况。
        var i = 7,temp = str.replace(/\s*/g, "").split(",");
		this.type = temp[0];
		this.title = temp[1];
        this.score = parseInt(temp[2]);
        this.total = parseInt(temp[3]);
        this.tech = parseInt(temp[4]);
        this.business = parseInt(temp[5]);
        this.manage = parseInt(temp[6]);
        for(; i < temp.length ;i++){
            if((/^\s*[0-9]*_[0-9]*_[0-9]*/g).test(temp[i])){ //判断当前的数据是否是
                var content = temp[i].split(":");
                this.challKey.push(content[0]);
                this.challValue.push(ChallengeData(content[1]));
            }
            else {
                this.userDefined.push(temp[i]);   
            }
        }
        return this;
    },
    
    //toStr字符串化当前的内容
    //  1.将当前对象中的所有的额内容存储到一个数组中。
    //  2.将当前的额数组通过toString的方法来转变为字符串并返回。
    toStr:function(){
        var final = new Array(), i = 0; // 表示当前要返回的内容数组。
		final.push(this.type);
		final.push(this.title);
        final.push(this.score);
        final.push(this.total);
        final.push(this.tech);
        final.push(this.business);
        final.push(this.manage);
        for(; i < this.userDefined.length; i++){
            final.push(this.userDefined[i]);   
        }
        for(i = 0; i < this.challKey.length; i++){
            final.push(""+this.challKey[i]+":"+this.challValue[i].toStr());   
        }
        return final.toString();
    },
	
	getScormId:function(){
		return this.title;
	},
    
    //更新当前的关卡中的数据。
    //  1.判断的当前的存储的关卡的数据中是否含有当前要添加的关卡。
    //  2.如果没有当前的数据则为当前的对象添加当前的额数据。
    //  3.如果当前的额数据存在，则匹配当前的数据和已拥有的数据然后得出相应的结果。
    //  4.返回当前的关卡的最终得出的额相关的信息。
    updateChallengeData:function(key, total, stars, ifvideo, rights, allrights){
        var i = 0, temp, finaltotal = 0, finalstars = 0, finalifVideo = 0, finalRights = 0, finalallright = 0;
        
        for(; i < this.challKey.length; i ++){
            if(this.challKey[i] == key){
                break;   
            }
        }
        if(i == this.challKey.length){
            this.challKey.push(key);
            this.challValue.push(ChallengeData(total+"_"+stars+"_"+ifvideo+"_"+rights+"_"+allrights));
            finaltotal = total;
            finalstars = 0;
            if(ifvideo == 1){
                finalifVideo = SHOWHINT;
            }
            else{
                finalifVideo = 0;    
            }
            finalRights = 0;
            if(rights == 1){
                finalRights = SHOWHINT;   
            }
            finalallright = 0;
            if(allrights == 1){
                finalallright = SHOWHINT;   
            }
        }
        else {
            temp = this.challValue[i];
            if(total != UNCHANGE && total > temp.total){
                finaltotal = parseInt(temp.total);
                temp.total = parseInt(total);
            }
            else {
                finaltotal = parseInt(temp.total)   
            }
            
            if(star != UNCHANGE && stars > temp.stars){
                finalstars = parseInt(temp.stars);
                temp.stars = parseInt(stars);
            }
            else{
                finalstars = parseInt(temp.stars);   
            }
            
            //判断更新之后的值，当且仅当两个数据都是0的情况之下存储在数据列表中的数据才为0；
            if(ifvideo != UNCHANGE){
                if(!(!temp.ifVideo && !ifvideo)){
                    if(!temp.ifVideo){
                        finalifVideo = SHOWHINT;
                    }
                    else {
                        finalifVideo = FINISH;   
                    }
                    temp.ifVideo = FINISH; 
                }
                else {
                    temp.ifVideo = UNFINISH;
                    finalifVideo = UNFINISH;
                }
            }
            else {
                finalifVideo = temp.ifVideo;   
            }
            
            //判断更新连续答对3道题的额外任务的数据。
            if(rights != UNCHANGE){
                if(!(!temp.rights && !rights)){
                    if(!temp.rights){
                        finalRights = SHOWHINT;
                    }
                    else {
                        finalRights = FINISH;   
                    }
                    temp.rights = FINISH; 
                }
                else {
                    temp.rights = UNFINISH;   
                    finalRights = UNFINISH;
                }
            }
            else{
                finalRights = temp.rights;   
            }
            
            //判断更新额外任务60S内答对所有的题目。
            if(allrights != UNCHANGE){
                if(!(!temp.allRights && !allrights)){
                    if(!temp.allRights){
                        finalallright = SHOWHINT;   
                    }
                    else{
                        finalallright = FINISH;
                    }
                    temp.allRights = FINISH;
                }
                else{
                    temp.allRights = UNFINISH; 
                    finalallright = UNFINISH;
                }
            }
            else{
                finalallright = temp.allRights;   
            }
        }
        return {"total":finaltotal, "stars":finalstars, "ifvideo": finalifVideo, "rights":finalRights, "allright":finalallright};
    },
    
    //当前函数用于更新当前总体的基本数据的内容。
    //  1.将当前的分数添加到原始的分数中去。
    //  2.通过总体数据中的内容得到当前的总答题数目。
    //  3.设置当前对象中的数据。
    //  4.返回最终数据。
    updateBaseData:function(score){
        var finalTotal=0, finalTech=0, finalBus=0, finalManage=0;
        
        this.score += parseInt(score);
        
        for(var i = 0; i< this.challKey.length; i++){
            if((/^\s*1_/g).test(this.challKey[i])){
                finalTech += parseInt(this.challValue[i].total);   
            }
            else if((/^\s*2_/g).test(this.challKey[i])){
                finalBus += parseInt(this.challValue[i].total); 
            }
            else if((/^\s*3_/g).test(this.challKey[i])){
                finalManage += parseInt(this.challValue[i].total);   
            }
        }
        finalTotal = finalTech + finalBus + finalManage;
        this.total= finalTotal;
        this.tech = finalTech;
        this.business = finalBus;
        this.manage = finalManage;
        return {"score":this.score, "total":this.total, "tech":this.tech, "business":this.business, "manage":this.manage};
    },
    
    //getChallengeData获取当前的数据中存储的关卡数据。
    //  1.循环查找challKey中的数据是否有要被查找的关卡。
    //  2.如果找到了的通过位置的值来吧当前的关卡的内容通过对象的类型返回数据。
    //  3.如果没有找到的话返回null;
    getChallengeData:function(key){
        var i = 0, result;
        
        for(; i < this.challKey.length; i++){
            if(this.challKey[i] == key){
                break;   
            }
        }
        if(i == this.challKey.length){
            return null;   
        }
        
        result = this.challValue[i];
        return {"total": result.total, "stars":result.stars, "ifvideo":result.ifVideo, "rights":result.rights, "allright":result.allRights};
    },
    
    //getChallengeInfo获取当前登记所有的关卡的信息。
    getChallengeInfo:function(level){
        var final = new Array;
        var result;
        var regTemp = eval("/"+level+"_/g");
        for(var i =0; i < this.challKey.length; i++){
            if(regTemp.test(this.challKey[i])){
                result = this.challValue[i];
                final.push({"key": this.challKey[i],"total": result.total, "stars":result.stars, "ifvideo":result.ifVideo, "rights":result.rights, "allright":result.allRights});
            }
        }
        return final;
    },
    
    //getBaseData获取当前的页面的基础数据。
    //  1.查找当前内容兵役对象的形式返回。
    getBaseData:function(){
        return {"score":this.score, "total":this.total, "tech":this.tech, "business":this.business, "manage":this.manage};   
    },
    
    //accomplish获取的总关卡是不是已经通关，并返回结果。
    accomplish:function(href){
        var regTemp = new RegExp("^"+href+"_","g"), count = 0, countQ = 0, limit = 0, limitT = 0;
        for(var i= 0; i < this.challKey.length; i++){
            if(this.challKey[i].match(regTemp)){
                count ++;
            }
        }
        if(href == 1){
            countQ = this.tech;
            limit = PRIMARY_QUES;
            limitT = PRIMARY_CHALL;
        }
        else if(href == 2){
            countQ = this.business;
            limit = SENIOR_QUES;   
            limitT = SENIOR_CHALL;
        }
        else {
            countQ = this.manage;
            limit = HIGH_QUES;   
            limitT = HIGH_CHALL;
        }
        if((count == limitT) && ((countQ/limit*100) >= 80)){
            return true;   
        }
        return false;
    },
    
    //complete测试当前用户是否已经完成了所有的课程。
    complete:function(){
        if(this.accomplish(1) && this.accomplish(2) && this.accomplish(3)){
            return true;
        }
        return false;
    }
}
PlantData.prototype.init.prototype =PlantData.prototype;



//表示的是当前的额关卡数据选项对象。仅仅用于当前的关卡的数据内容的存储。
var ChallengeData = function(str){
    return  new ChallengeData.prototype.init(str);
}
ChallengeData.prototype = {
    
    //出事话当前对象的函数逻辑过程和之前的一样。
    init:function(str){
        
        //每一个对象的特殊函数和属性。
        var me = this;
        me.total = 0;
        me.stars = 0;//当前关卡星级选项。
        me.ifVideo = 0;//表示的是当前的视频是否已经观看。
        me.rights = 0;//当前的关卡中是否已经又连续答对3道题的情况。
        me.allRights = 0;//在60秒的时间内是否所有的题目都答对。
        
        me.toData(str);
        return this;   //当当前传入的数据出错的时候，当前的函数会返回一个所有数据初始化为0的对象。
    },
    
    //转化字符串到数据。
    toData:function(str){
        //判断当前的内容的形式是不是以x_x_x_x的形式传入的，如果不是的话将会抛出一个异常。
        if(/^\s*[0-9]*_[0-9]*_[0-1]*_[0-1]*_[0-1]*\s*$/ig.test(str)){
            var temp = str.replace(/\s*/g, "").split("_");//当前的额字符串中的内容替换成为空，并把当前的内容分解为数组的形式进行赋值。
            this.total = parseInt(temp[0])
            this.stars = parseInt(temp[1]);
            this.ifVideo = parseInt(temp[2]);
            this.rights = parseInt(temp[3]);
            this.allRights = parseInt(temp[4]);
        }
        return this;
    },
    
    //toString为字符串化当前的内容信息。
    toStr:function(){
        return this.total+"_"+this.stars+"_"+this.ifVideo+"_"+this.rights+"_"+this.allRights;   
    }
};
ChallengeData.prototype.init.prototype = ChallengeData.prototype;
    