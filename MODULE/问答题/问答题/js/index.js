var loading = {

    _rightAnswer: "打叶风分是利用润后叶片增强了韧性和机械 强度，降低了叶片与烟梗着生处的结合强度的原理，通过高速旋转的打叶辊作用，由 打钉的冲击力和框栏的磨擦力将烟叶的叶片从烟梗上撕裂下来。根据叶片与烟梗不同的悬浮速度，再经过风分机设置的风速与风量将撕裂下来的叶片分选出来，未打净的叶梗物料与烟梗继续流入下一级打叶与风分，然后由振筛将叶片、碎片、长短梗筛分 分离出来，使分离后的叶片和烟梗的质量符合工艺质量要求。",
    
    _userAnswer:"",
    
    _userClick: false,
    _status:1,
    _textArea: document.getElementById("commitAnswer"),
    
    init:function(){
        
        document.getElementById('submitBtn').addEventListener('click', function(e){
            loading.clickEvent.call(loading);
        });
    },
    
    clickEvent:function(){
        if(this._userClick == false){
            this._userAnswer = this._textArea.value;
            this._userClick = true;
            document.getElementById("tip").removeAttribute("hidden");
            document.getElementById("submitBtn").setAttribute("style", "margin-top:-35px;");
        }
        if(this._status == 1){
            this._textArea.value = this._rightAnswer;
            this._textArea.setAttribute("readonly", "readonly");
            document.getElementById("userAnswer").innerHTML = "答案:";
            document.getElementById("submitBtn").innerHTML = "我的答案";
            this._textArea.setAttribute("style", "color:#006555;font-weight:900;");
            this._status ++;
        }
        else {
            this._textArea.value = this._userAnswer;
            this._textArea.removeAttribute("readonly");
            document.getElementById("userAnswer").innerHTML = "回答:";
            document.getElementById("submitBtn").innerHTML = "正确答案";
            this._textArea.removeAttribute("style");
            this._status = 1;   
        }
    },

}

window.onload = function(){
    loading.init();
}