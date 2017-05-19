//文件预加载工具对象。 优化显示效果。

var Preload = (function(){
    
    var preload = function(){
        
        var me = this;
    
        me.preloadImage = function(){
            var images = new Array();
            for(var  i =0; i < arguments.length ; i ++){
                images[i] = new Image();
                images[i].src = arguments[i];
            }
        }
        
        me.preloadAudio = function(){
            var audios = new Array();
            for(var i =0 ; i < arguments.length ; i++){
                audios[i] = new Audio();
                audios[i].src = arguments[i];
            }
        }
    }
    
    var unique = new preload();
    
    return unique;
    
})();