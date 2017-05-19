/*!
 * Util.js
 * This javascript film will be responsible for connecting with plant. And pre-defined some function for 	 * whole page
 *
 */

var UNCONNECTION = 0;

var CONNECTION = 1;

var KEY = "cmi.suspend_data";

var STATUS = "cmi.core.lesson_status";

var connecting = {
	
	connection:UNCONNECTION,
	
	
	init:function(){
		this.connectTo();
	},
	
    connectTo: function(){
        var result;
        
		loadPage();
		
        result = doLMSGetValue(STATUS);
        
        if(!result){
            this.connection = UNCONNECTION;   
        }
        else {
            this.connection = CONNECTION;   
        }
    },
    
    getValue:function(){
        var result;
        
        result = doLMSGetValue(KEY);
        if(!result){
            result = sessionStorage.getItem(KEY);   
        }
        doLMSCommit();
        doLMSFinish();
        return result;
    },
    
    setValue:function(value){
        var result = doLMSSetValue(KEY, value);
        if(!result){
            sessionStorage.setItem(KEY, value);   
        }
    },
    
    finishCheck:function(station){
        var status = doLMSGetValue( "cmi.core.lesson_status" );
        if(status == "completed"){
            return;   
        }
        if(/incomplete/ig.test(station)){
            doContinue("incomplete");   
        }
        else if(/complete/ig.test(station)){
            doContinue('completed');
        }
    },
	
	saving:function(userAnswer){
		var info = userAnswer.toString();
		if(this.connection ){
			this.setValue(info);
		}	
		
	},
	
	getting:function(){
		if(this.connection){
			return this.getValue().split(",");	
		}
	}
	
}

connecting.init();

var questions = {
	1:{
		type:'选择题',
		question:'我有能力克服各种困难。',
		option:['A.是的','B.不一定','C.不是的']
	},
	2:{
		type:'选择题',
		question:'如果我能到一个新的环境，我要把生活安排得。',
		option:['A.和从前相仿','B.不一定','C.和从前不一样']
	},
	3:{
		type:'选择题',
		question:'一生中，我觉得自已能达到我所预想的目标。',
		option:['A.是的','B.不一定','C.不是的']
	},
	4:{
		type:'选择题',
		question:'不知为什么，有些人总是回避或冷淡我。',
		option:['A.不是的','B.不一定','C.是的']
	},
	5:{
		type:'选择题',
		question:'在大街上，我常常避开我不愿打招呼的人。',
		option:['A.从未如此','B.偶尔如此','C.有时如此']
	},
	6:{
		type:'选择题',
		question:'当我集中精力工作时，假使有人在旁边高谈阔论。',
		option:['A.我仍能专心工作','B.介于A、C之间','C.我不能专心且感到愤怒']
	},
	7:{
		type:'选择题',
		question:'我不论到什么地方，都能清楚地辨别方向。',
		option:['A.是的','B.不一定','C.不是的']
	},
	8:{
		type:'选择题',
		question:'我热爱所学的专业和所从事的工作。',
		option:['A.是的','B.不一定','C.不是的']
	},
	9:{
		type:'选择题',
		question:'气候的变化不会影响我的情绪。',
		option:['A.是的','B.介于A、C之间','C.不是的']
	},
	10:{
		type:'选择题',
		question:'我从不因流言蜚语而生气。',
		option:['A.是的','B.介于A、C之间','C.不是的']
	},
	11:{
		type:'选择题',
		question:'我善于控制自己的面部表情。',
		option:['A.是的','B.不太确定','C.不是的']
	},
	12:{
		type:'选择题',
		question:'在就寝时，我常常。',
		option:['A.极易入睡','B.介于A、C之间','C.不易入睡']
	},
	13:{
		type:'选择题',
		question:'有人侵扰我时，我。',
		option:['A.不露声色','B.介于A、C之间','C.大声抗议，以泄己愤']
	},
	14:{
		type:'选择题',
		question:'在和人争辨或工作出现失误后，我常常感到震颤，精疲力竭，而不能继续安心工作。',
		option:['A.不是的','B.介于A、C之间','C.是的']
	},
	15:{
		type:'选择题',
		question:'我常常被一些无谓的小事困扰。',
		option:['A.不是的','B.介于A、C之间','C.是的']
	},
	16:{
		type:'选择题',
		question:'我宁愿住在僻静的郊区，也不愿住在嘈杂的市区。',
		option:['A.不是的','B.介于A、C之间','C.是的']
	},
	17:{
		type:'选择题',
		question:'我被朋友、同事起过绰号、挖苦过。',
		option:['A.从来没有','B.偶尔有过','C.这是常有的事']
	},
	18:{
		type:'选择题',
		question:'有一种食物使我吃后呕吐。',
		option:['A.没有','B.记不清','C.有']
	},
	19:{
		type:'选择题',
		question:'除去看见的世界外，我的心中没有另外的世界。',
		option:['A.没有','B.记不清','C.有']
	},
	20:{
		type:'选择题',
		question:'我会想到若干年后有什么使自己极为不安的事。',
		option:['A.从来没有想过','B.偶尔想到过','C.经常想到']
	},
	21:{
		type:'选择题',
		question:'我常常觉得自己的家庭对自己不好，但是我又确切地知道他们的确对我好。',
		option:['A.否','B.说不清楚','C.是']
	},
	22:{
		type:'选择题',
		question:'每天我一回家就立刻把门关上。',
		option:['A.否','B.不清楚','C.是']
	},
	23:{
		type:'选择题',
		question:'我坐在小房间里把门关上，但我仍觉得心里不安。',
		option:['A.否','B.偶尔是','C.是']
	},
	24:{
		type:'选择题',
		question:'当一件事需要我作决定时，我常觉得很难。',
		option:['A.否','B.偶尔是','C.是']
	},
	25:{
		type:'选择题',
		question:'我常常用抛硬币、翻纸、抽签之类的游戏来预测凶吉。',
		option:['A.从来没有','B.偶尔有过','C.这是常有的事']
	},
	26:{
		type:'判断题',
		question:'为了工作我早出晚归，早晨起床我常常感到疲惫不堪。',
		option:['A.是','B.否']
	},
	27:{
		type:'判断题',
		question:'在某种心境下,我会因为困惑陷入空想,将工作搁置下来。',
		option:['A.是','B.否']
	},
	28:{
		type:'判断题',
		question:'我的神经脆弱,稍有刺激就会使我战栗。',
		option:['A.是','B.否']
	},
	29:{
		type:'判断题',
		question:'睡梦中,我常常被噩梦惊醒。',
		option:['A.是','B.否']
	},
	30:{
		type:'选择题',
		question:'工作中我愿意挑战艰巨的任务。',
		option:['A.从不','B.几乎不','C.一半时间','D.大多数时间','E.总是']
	},
	31:{
		type:'选择题',
		question:'我常发现别人好的意愿。',
		option:['A.从不','B.几乎不','C.一半时间','D.大多数时间','E.总是']
	},
	32:{
		type:'选择题',
		question:'能听取不同的意见，包括对自己的批评。',
		option:['A.从不','B.几乎不','C.一半时间','D.大多数时间','E.总是']
	},
	33:{
		type:'选择题',
		question:'我时常勉励自己，对未来充满希望。',
		option:['A.从不','B.几乎不','C.一半时间','D.大多数时间','E.总是']
	},
	length:33,
	result1:"路漫漫其修远兮，吾将上下而求索。朋友，你的情商还有很大的提升空间。你会发现你常常不能控制自己，极易被自己的情绪所影响。很多时候，你容易被激怒、动火、发脾气，这是非常危险的信号──你的事业可能会毁于你的急躁。也许你应该好好审视一下自己了，正确认识自己，正确认识我们身边这个世界。静下心来，保持冷静，去发现一个不一样的自己和世界。",
	result2:"你我都是芸芸众生中的一员，过着普通的生活，有着相似的烦恼。对于一件事，你不同时候的表现可能不一，这与你的意识有关，但这种意识不是常常都有，因此需要你多加注意，时时提醒。对自己多肯定，对别人多站在他的立场去思考，你会发现处理同样的事情你会更加游刃有余，你和他人的关系也会更加融洽。",
	result3:"恭喜你，你是别人羡慕的对象。你的EQ较高，不易恐惧担忧，对于工作你热情投入、敢于负责，你为人更是正义正直、同情关怀。你的朋友、同事对你的评价都很正面，也乐于与你相处，这也是你EQ高的表现。希望你能够不断突破自己，不忘初心，勇敢前行。",
	result4:"非常不错，看来你已经是一个EQ高手了，你是人群的焦点，是朋友联系的纽带。你能够正确的认识自己，能自如地和朋友以及陌生人交谈，拥有融洽的人际关系和交际能力。你的情绪智慧不是你事业的阻碍，更是你事业有成的一个重要前提条件。坚定目标，脚踏实地，成功就在前方。"
}

var suitable = {
	init:function(){
		
		var ele = document.getElementById('app');
		
		if(/Android|iPhone|iPad|iPod|IOS/.test(window.navigator.userAgent)){
			ele.setAttribute('style', 'width:100%;');
		}
		else {
			var height = document.body.offsetHeight;
			var temprotory = height/1008*640;
			if(temprotory < 420){
				temprotory = 420;
			}
			ele.setAttribute('style', 'width:'+ temprotory +'px');
			document.body.addEventListener('resize', function(){
				suitable.resize();
			}, false);
		}
	},
	
	resize:function(){
		var ele = document.getElementById('app');
		var height = document.body.offsetHeight;
		var temprotory = height/1008*640;
		if(temprotory < 420){
			temprotory = 420;
		}
		ele.setAttribute('style', 'width:'+ temprotory +'px');
	}
}