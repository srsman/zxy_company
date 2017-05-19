var root = (function(){


	var imgs = [];
	var audio = [];
	var homeText = ["以下是国际标准情商测试题，这是一组欧洲流行的测试题，可口可乐公司、麦当劳公司、诺基亚分司等世界500强众多企业，曾以此为员工EQ测试的模板，帮助员工了解自己的EQ状况。通过以下测试，你就能对自己的EQ有所了解。但切记：","第一，这不是一个求职询问表，用不着有意识地尽量展示你的优点和掩饰你的缺点。如果你真心想对自己有一个判断，那你就不应施加任何粉饰，否则，你应重测一次。","第二、共33题，测试时间25分钟。","如果你已经准备就绪，请开始答题吧! "];
	var final = 0;
	var totalQues = 33;

	var vm1= new Vue({
		el:'#loadPage',
		data:{
			precentage:1,
			imgDone:false,
			audioDone:false,
			seem:true,
			images:imgs,
			audios:audio
		},
		methods:{
			loadInfo:function(){
				var imageTotal = this.images.length;
				var audioTotal = this.audios.length;
				var imagecount = 0;
				var audioCount = 0;
				var loadLimit = 86;
				var loadImage = function(src){
					var img = new Image();
					var loaded = function(){
						imagecount++;	
					}
					img.src = src;
					img.onload = function(){
						loaded();	
					}
					img.onerror = function(){
						loaded();	
					}
				};
				var loadAudio = function(src){
					var audio = new Audio();
					var loaded = function(){
						audioCount++;	
					}
					audio.src = src;
					audio.onload = function(){
						loaded();	
					}
					audio.onerror = function(){
						loaded();	
					}
				}
				for(var i = 0; i < this.images.length ; i++){
					loadImage(this.images[i]);	
				}
				for(i = 0; i < this.audios.length; i++){
					loadAudio(this.audios[i]);	
				}
				var inter = setInterval(function(){
					if(vm1.precentage >= 100){
						clearInterval(inter);
						vm1.home();
					}
					if(vm1.imgDone == true && vm1.audioDone == true){
						loadLimit = 100;	
					}
					else {
						if(imagecount == imageTotal){
							vm1.imgDone = true;
						}
						if(audioCount == audioTotal){
							vm1.audioDone = true;	
						}
					}
					if(vm1.precentage < loadLimit){
						vm1.precentage += 1;
					}
				},30);
			},
			home:function(){
				this.seem = false;
				vm2.seem = true;
			}
		}
	});


	var vm2 = new Vue({
		el:"#homePage",
		data:{
			article:homeText,
			seem:false
		},
		methods:{
			starting:function(){
				this.seem = false;
				vm3.seem = true;
				vm3.init();
			}
		}
	});
	
	
	var userScore = 0;
	var quesinit = questions[1];
	
	var vm3 = new Vue({
		el: '#quesPage',
		data: {
			counter:1,
			seem:false,
			imageSrc:"./pic/number.png",
			ques:quesinit,
			preques:"上一题",
			preSeem:true,
			nextques:'下一题',
			nextSeem:true,
			userAns:[]
		},
		methods:{
			init:function(){
				var infos = connecting.getting();
				if(infos){
					this.counter = infos.length;
					this.ques = questions[this.counter];
					if(this.counter != 1){
						this.preSeem = true;	
					}
					else {
						this.preSeem = false;	
					}
					if(this.counter == totalQues){
						this.nextques = '提交';	
					}
					else {
						this.nextques = '下一题';	
					}
					this.userAns = infos;
				}
				else {
					this.counter = 1;
					this.ques = quesinit;
					this.preSeem = false;
					this.nextques = '下一题';
					this.userAns = [];
				}
			},
			choose:function(event){
				var source = event.srcElement||event.target;
				var eles = document.getElementsByClassName('option');
				for(var i =0 ; i < eles.length ; i++){
					eles[i].setAttribute("class", 'option');		
				}
				source.setAttribute('class', 'option beChoosed');
			},
			preQuestion:function(){
				if(this.counter > 1){
					this.counter -= 1;
					this.nextques = '下一题';
				}
				else {
					return;	
				}
				if(this.counter === 1){
					this.preSeem = false;	
				}
				this.userAns.pop();
				this.ques = questions[this.counter];
				connecting.saving(this.userAns);
			},
			nextQuestion:function(event){
				var eles = document.getElementsByClassName('option');
				for(var i =0 ; i < eles.length ; i++){
					if(eles[i].getAttribute('class').split(' ').length > 1){
						this.userAns.push(i+1);
						break;
					}
				}
				if(i >= eles.length){
					this.userAns.push(0);	
				}
				for(i =0 ; i < eles.length ; i++){
					eles[i].setAttribute("class", 'option');		
				}
				if(this.counter < 33){
					this.counter += 1;
					this.preSeem = true;
				}
				else {
					this.submit();	
				}
				if(this.counter === 33){
					this.nextques = '提  交';	
				}
				this.ques = questions[this.counter];
				connecting.saving(this.userAns);
			},
			submit:function(){
				userScore = this.calculate();
				this.seem = false;
				vm4.init(userScore);
				vm4.seem = true;
			},
			calculate:function(){
				var eachone = function(num, choose){
					var result;
					if(num >= 1 && num <= 9){
						if(choose == 1){
							result = 6;
						}
						else if(choose == 2){
							result = 3;	
						}
						else {
							result = 0;
						}
					}
					else if(num >= 10 && num <= 25){
						if(choose == 1){
							result = 5;
						}
						else if(choose == 2){
							result = 2;	
						}
						else {
							result = 0;
						}	
					}
					else if(num >= 26 && num <= 29){
						if(choose == 1){
							result = 0;
						}
						else if(choose == 2){
							result = 5;	
						}
						else {
							result = 0;	
						}
					}
					else{
						if(choose == 1){
							result = 1;
						}
						else if(choose == 2){
							result = 2;	
						}
						else if(choose == 3){
							result = 3;	
						}
						else if(choose == 4){
							result = 4;	
						}
						else if(choose == 5){
							result = 5;	
						}
						else {
							result = 0;	
						}
					}
					return result;
				}
				var total = 0;
				for(var i = 0 ; i < this.userAns.length ; i++){
					total += eachone(i+1, this.userAns[i]);	
				}
				return total;
			}
		}
	
	});
	
	var vm4 = new Vue({
		el:'#finalPage',
		data: {
			total:0,
			explain:"",
			seem:false,
			stackseem:false,
			rules:[
				{limit:"第1～9题", explain:"选择选项1得6分，选项2得3分，选项3得0分。"},
				{limit:"第10～16题", explain:"选择选项1得5分，选项2得2分，选项3得0分。"},
				{limit:"第17～25题", explain:"选择选项1得5分，选项2得2分，选项3得0分。"},
				{limit:"第26～29题", explain:"选择选项1得0分，选项2得5分。"},
				{limit:"第30～33题", explain:"选择选项1得1分、选项2得2分、选项3得3分、选项4得4分、选项5得5分。"}
			]
		},
		methods:{
			init:function(totalScore){
				this.total = totalScore;
				if(totalScore < 90){
					this.explain = questions.result1;	
				}
				else if(totalScore >= 90 && totalScore <= 129){
					this.explain = questions.result2;	
				}
				else if(totalScore >= 130 && totalScore <= 149){
					this.explain = questions.result3;
				}
				else if(totalScore >= 150){
					this.explain = questions.result4;	
				}
			},
			restart:function(){
				connecting.saving([]);
				this.seem = false;
				vm3.seem = true;
				vm3.init();
			},
			explaination:function(){
				this.seem = false;
				vm5.seem = true;
			},
			openStack:function(){
				this.stackseem = true;
			},
			closeStack:function(){
				this.stackseem = false;	
			}
		}
	});
	
	var vm5 = new Vue({
		el:'#explainPage',
		data:{
			limits:[,,,],
			info:[['90分以下',questions.result1], ['90~129分',questions.result2], ['130~149分',questions.result3], ['150分以上',questions.result4]],
			seem:false,
		},
		methods:{
			restart:function(){
				connecting.saving([]);
				this.seem = false;
				vm3.seem = true;
				vm3.init();
			},
			toFinal:function(){
				this.seem = false;
				vm4.seem = true;
			}
		}
	});

	vm1.loadInfo();
	suitable.init();
	
})();