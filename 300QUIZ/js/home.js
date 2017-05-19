//当前页面的预加载内容，并处理跳转页面的内容。
//添加当前页面的跳转属性。
var dataSet = function(){
	var clearInte;
	var startMarquee = function(ele){
		var width = ele.offsetWidth;
		var leftPoIn = ele.parentElement.offsetWidth;
		var leftPo = ele.getAttribute('style');
		if(!leftPo){
			leftPo = 0;	
		}
		else {
			leftPo = leftPo.split('t:')[1].split('p')[0];	
		}
		clearInte = setInterval(function(){
			leftPo -= 1.7;
			ele.setAttribute('style', 'left:'+leftPo+'px;');
			if(leftPo <= -width){
				leftPo = leftPoIn;
			}
		},50);
	}
	var stopMarquee = function(ele){
		clearInterval(clearInte);
		ele.setAttribute('style', 'left:0px;');
	}
	controller.getLists(function(repText){
		if(repText == ''){
			document.getElementById("noData").removeAttribute('style');	
			return;	
		}
		var res = repText.result;
		var parent = document.getElementById("listContent");
		if( parent.children.length >= 2){
			return;	
		}
		if( res.length > 0){
			document.getElementById("noData").setAttribute('style', 'display:none;');
		}
		else{
			document.getElementById("noData").removeAttribute('style');	
		}
		for(var i = 0 ; i < res.length ; i++){
			var newEle = document.createElement('div');
			newEle.setAttribute('class', 'listOption');
			newEle.innerHTML = "<div class='option-background'></div>"+
        		"<div class='list-number'>"+(i+1)+"</div>"+
        		"<span class='userName'>"+res[i].userName+"</span>"+
        		"<span class='companyName'><div id='marquee"+(i+1)+"' class='marquee'>"+res[i].domainName+"</div></span>"+
        		"<div class='option-counting'>"+
        			"<img src='pic/star.png' class='option-star' alt=''>"+
        			"<span class='option-count-number'>"+res[i].score+"</span>"+
        		"</div>";
			parent.appendChild(newEle);
		}
		for(i = 0; i < res.length; i++){
			(function(){
				var num = i+1;
				if(/Android|iPone|IOS|iPad|iPod/.test(window.navigator.userAgent)){
					newEle.addEventListener('touchstart',function(){
						var origin = document.getElementById('marquee'+num);
						startMarquee(origin);
					},false);
					newEle.addEventListener('touchend',function(){
						var origin = document.getElementById('marquee'+num);
						stopMarquee(origin);
					},false);
				}
				else {
					document.getElementById('marquee'+num).addEventListener('mouseover',function(){
						var origin = document.getElementById('marquee'+num);
						startMarquee(origin);
					},false);
					document.getElementById('marquee'+num).addEventListener('mouseout',function(){
						var origin = document.getElementById('marquee'+num);
						stopMarquee(origin);
					},false);
				}
			})();	
		}
	});
}

dataSet();

events.bind(document.getElementById("tech"), "click click",function(){
    var el = document.getElementById("clickVideo");
    el.currentTime = 0;
    el.play();
    moveTo("barrier.html?id=1");
});

events.bind(document.getElementById("business"), "click click",function(){
    var el = document.getElementById("clickVideo");
    el.currentTime = 0;
    el.play();
    moveTo("barrier.html?id=2");
});

events.bind(document.getElementById("manage"), "click click",function(){
    var el = document.getElementById("clickVideo");
    el.currentTime = 0;
    el.play();
    moveTo("barrier.html?id=3");
});

events.bind(document.getElementById('resultBtn'), 'click click',function(){
	
	
//	events.bind(document.getElementById("marquee1"),'mouseover touchstart',function(e){
//		var origin = document.getElementById('marquee1');
//		e.preventDefault();
//		e.stopPropagation();
//		startMarquee(origin);
//	});
//	events.bind(document.getElementById("marquee1"),'mouseout touchend',function(e){
//		var origin = document.getElementById('marquee1');
//		e.preventDefault();
//		e.stopPropagation();
//		stopMarquee(origin);
//	});
	var el = document.getElementById("helpVideo");
    el.currentTime = 0;
    el.play();
	document.getElementById('userList').removeAttribute('style');
});

events.bind(document.getElementById('listContent'), 'click click', function(e){
	e.preventDefault();
	e.stopPropagation();
	return false;
});

events.bind(document.getElementById('userList'), 'click click', function(){
	document.getElementById('userList').setAttribute('style', 'display:none;');
});


var completes = function(){
    var boolcheck = controller.checkComplete();
    if(boolcheck){
		var baseData = controller.getBaseData();
		var total = baseData.total;
		var score = baseData.score;
		document.getElementById("com-text").textContent = '答对'+total+'题，得分'+score+'分';
		if(/Android|IOS|iPhone|iPad|iPod/.test(window.navigator.userAgent)){
			document.getElementById("com-text").setAttribute('class', 'com-text');
		}
        removeStyle(document.getElementById("levelAccomplish"), "display");   
    
		setTimeout(function(){
			document.getElementById("levelAccomplish").setAttribute('class', 'fadeIn');
			setTimeout(function(){
				addStyle(document.getElementById("levelAccomplish"), "display:none;");
			},1200);
		}, 3000);
	}
    Preload.preloadImage("pic/Stars1.png",
                         "pic/Stars2.png",
                         "pic/Stars3.png",
                         "pic/Stars0.png",
                         "pic/successful.png",
                         "pic/failed-lighting.png",
                         "pic/nextChallenge2.png",
                         "pic/feedback-background.png");
}

var chalTech = controller.getChallengeInfo("^1");
var chalBus = controller.getChallengeInfo("^2");
var chalMan = controller.getChallengeInfo("^3");

var challStatus = function(arr){
    var finalStatus = 1;
    for(var i = 0 ; i < arr.length; i++){
        var challlevel = parseInt(arr[i].key.split("_")[1]);
        if(finalStatus < challlevel){
            finalStatus = challlevel;   
        }
    }
    return finalStatus;
}

var showingStatus = function(id,status){
    var ele = document.getElementById(""+id);
    ele.innerHTML = ele.innerHTML.replace(/data/, status);
}

showingStatus("techHint", challStatus(chalTech));
showingStatus("busHint", challStatus(chalBus));
showingStatus("manHint", challStatus(chalMan));

completes();