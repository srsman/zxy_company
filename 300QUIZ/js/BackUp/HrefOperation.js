//常量的设置。
var PRIMARY_LEVEL = 1;
var PRIMARY_UNIT = 8;
var PRIMARY_BARRIER = 5;

var SENIOR_LEVEL = 2;
var SENIOR_UNIT = 3;
var SENIOR_BARRIER = 4;

var HIGH_LEVEL = 3;
var HIGH_UNIT = 3;
var HIGH_BARRIER = 3;

//当前的内容定义URL的操作。
//href内容是通过location中的href文本信息。
//    1.getNextChallengeURl获得下一关卡的id内容。
//    2.getRestart重新开始当前页面的内容。
//    3.getHistoryUrl获取返回的页面的id数值。
//    4.getForwardUrl获取前进到的页面的id数值。
var HrefOperation = function(href){
    return new HrefOperation.prototype.init(href);
}
HrefOperation.prototype = {

    init:function(href){
        //通过href中的信息存储相关的内容。
        var me = this;
        //当前的关卡的信息记录。
        me.level = 0;
        //当前章节记录。
        me.unit = 0;
        //当前关卡记录
        me.barrier = 0;
        
        return this.setBaseInfo(href);
    },
    
    setBaseInfo:function(href){
        var temp = href.replace(/\s*/g, "").split("?")[1];
        if(temp){
            temp = temp.split("=")[1].split("_");
            for(var i = 0 ; i < temp.length; i++){
                if(i == 0){
                    this.level = parseInt(temp[i]) == 3 ? HIGH_LEVEL : (parseInt(temp[i]) == 2 ? SENIOR_LEVEL : PRIMARY_LEVEL);
                }
                else if(i == 1){
                    this.unit = parseInt(temp[i]);   
                }
                else if(i == 2){
                    this.barrier = parseInt(temp[i]);   
                }
            }
        }
        return this;
    },
    
    //当前href数据组合返回。
    getInfo:function(){
        if(this.level && this.barrier && this.unit){
            return this.level+"_"+this.unit+"_"+this.barrier;
        }
        else {
            return "";   
        }
    },
    
    //获取当前关卡下一关的数据。抛出错误的时候当前的页面将会返回首页。
    getNextChallengeURl:function(spec){
        var clevel, cunit, cbarrier;
        if(!this.level || !this.unit || !this.barrier){
            throw new Error("can not get");   
        }
        
        if(this.level == PRIMARY_LEVEL){
            cunit = PRIMARY_UNIT;   
            cbarrier = PRIMARY_BARRIER;
            if(spec){
                cbarrier = PRIMARY_BARRIER-1;   
            }
            
        }
        else if(this.level == SENIOR_LEVEL){
            cunit = SENIOR_UNIT;
            cbarrier = SENIOR_BARRIER;
        }
        else if(this.level == HIGH_LEVEL){
            cunit = HIGH_UNIT;
            cbarrier = HIGH_BARRIER;
        }
        if(this.barrier < cbarrier){
            return "?id="+this.level+"_"+this.unit+"_"+(this.barrier+1);   
        }
        else {
            if(this.unit < cunit){
                return "?id="+this.level+"_"+(this.unit+1)+"_1";
            }
            else {
                if(this.level < 3){
                    return "?id="+(this.level+1)+"_1_1";   
                }
                else {
                    throw new Error("this is final challenge");
                }
            }
        }
    },
    
    //获取当前关卡的id。
    getRestart:function(){
        if(!this.level || !this.unit || !this.barrier){
            throw new Error("can not get");   
        }
        return "?id="+this.level+"_"+this.unit+"_"+this.barrier;   
    },
    
    //获取当前页面的上一级页面。backTo数据为要跳转的页面。
    getHistoryUrl: function(){
        if(this.barrier != 0){
            return "?id="+this.level;   
        }
        else {
            return "";   
        }
    },
    
    //获取下一页面的HREF信息。参数可以输入1个或者3个
    getForwardUrl:function(arg){
        if(!arguments[1]){
            return "?id=" + arguments[0];   
        }
        else if(!arguments[2]){
            return "?id=" + arguments[0] + "_" + arguments[1] + "_1";    
        }
        else {
            return "?id=" + arguments[0] + "_" + arguments[1] + "_" + arguments[2];  
        }
    }
};
HrefOperation.prototype.init.prototype = HrefOperation.prototype;