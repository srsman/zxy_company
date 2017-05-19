//页面进度条加载，预加载页面中的图片或者是音频文件内容。

//使用preload函数来进行相关信息的预加载内容。

var loading = function(){
//    进度条读取内容。
	
    document.getElementById("myaudio").currentTime = 13;
    document.getElementById("myaudio").play();
    
//    loadPage();
    var ele = document.getElementById("content");
    
    //改变当前的进度条到30%
    ele.setAttribute("style","width:30%");
    
    //preload，预加载一部分图片之后再运行另一段进度条。
    Preload.preloadImage("pic/background.jpg",
                         "pic/help_1.png",
                         "pic/help_2.png",
                         "pic/help_3.png",
                         "pic/help_4.png");
    //当前的进度条读取到75%
    ele.setAttribute("style","width:75%");
    
    //预加载部分图片
    Preload.preloadImage("pic/barrier-background1.jpg",
                        "pic/barrier-background2.jpg",
                        "pic/barrier-lock.png",
                        "pic/barrier-lock-btn.png",
                        "pic/lock.png",
                        "pic/total-score.png",
                        "pic/total-ability.png",
                        "pic/total-rights.png");
    //当前进度条读取到100%;
    ele.setAttribute("style", "width:100%");
	
    setTimeout(function(){moveTo("home.html")},4500);
    
    
}