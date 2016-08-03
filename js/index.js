
var config = {
	num:"",
	firstNum:"",
	lastNum:"",
	tag:false,
	result:"",
	mark:""
}
/*class获取对象*/
function $class(elClass){
	return document.getElementsByClassName(elClass);
}
/*id获取对象*/
function $id(elId){
	return document.getElementById(elId);
}

/*数字键点击回调*/
var numHandler = function (){
	console.log(config.tag);
	if(config.tag){
		$id("content").textContent = "";
		config.num = "";
		config.tag = false;
	}
	if(config.num.toString().substring(0,1) == 0 && this.textContent == 0){
		config.num = this.textContent;
		$id("content").textContent = config.num;
		return;
	}
	if(config.num == "" && this.textContent == "."){
		config.num = 0+this.textContent;
		$id("content").textContent = config.num;
		return;
	}
	
	if(config.num.toString().indexOf(".") > 0 && this.textContent == "."){
		config.num = config.num;
	}else{
		config.num = config.num + this.textContent;
	}
	$id("content").textContent = config.num;
	
}
/*运算键点击回调*/
var markHandler = function (){
	config.mark = this.textContent;
	config.firstNum = config.num;
	config.num = "";
	$id("content").textContent = "";
}
/*运算结果*/
var operation = function(){
	config.lastNum = config.num;
	var result;
	switch(config.mark){
		case "+":
			if(config.lastNum == ""){
				config.lastNum = 0;
			}
			result = parseFloat((parseFloat(config.firstNum) + parseFloat(config.lastNum)).toFixed(9));
			break;
		case "-":
			result = parseFloat((config.firstNum - config.lastNum).toFixed(9));
			break;
		case "*":
			result = parseFloat((config.firstNum * config.lastNum).toFixed(9));
			break;
		case "/":
			if(config.lastNum == 0){
				result = "除数不能为零";
			}else{
				result = parseFloat((config.firstNum / config.lastNum).toFixed(9));
			}
			break;
		default :
			result = $id("content").textContent;
			break;
	}	

	$id("content").textContent = result;
	config = {
		num:result,
		firstNum:"",
		lastNum:"",
		tag:true,
		result:result,
		mark:""
	};		
}

addEvent($id("keyboard"),"click",function(e){
	if(e.target.className == "senior" && config.num != ""){
		config.firstNum = config.num;
		switch(true){
			case e.target.textContent == "abs":
				result = Math.abs(parseInt(config.firstNum));
				break;
			case e.target.textContent == "acos":
				if(parseInt(config.firstNum) >= -1 &&　parseInt(config.firstNum) <= 1){
					result = Math.acos(parseInt(config.firstNum));
				}else{
					result = "必须是 -1.0 ~ 1.0 之间的数";
				}
				break;
			case e.target.textContent == "asin":
				if(parseInt(config.firstNum) >= -1 &&　parseInt(config.firstNum) <= 1){
					result = Math.asin(parseInt(config.firstNum));
				}else{
					result = "必须是 -1.0 ~ 1.0 之间的数";
				}
				
				break;
			case e.target.textContent == "atan":
				result = Math.atan(parseInt(config.firstNum));
				break;
			case e.target.textContent == "cos":
				result = Math.cos(parseInt(config.firstNum));
				break;
			case e.target.textContent == "sin":
				result = Math.sin(parseInt(config.firstNum));
				break;
			case e.target.textContent == "tan":
				result = Math.tan(parseInt(config.firstNum));
				break;
			case e.target.textContent == "sqrt":
				result = Math.sqrt(parseInt(config.firstNum));
				break;
			default :
				break;
		}	
		$id("content").textContent = result;
		config = {
			num:result,
			firstNum:"",
			lastNum:"",
			tag:true,
			mark:""
	};		
	}
});


/*绑定事件*/
function addEvent(target,type,handler){
	if(target.addEventListener){
		target.addEventListener(type,handler,false);
	}else{
		target.attachEvent("on"+type,function(event){
			return handler.call(target,event);
		});
	}
}

var addEventObj = function(){
	var nums = $class("num");
	for(var i = 0; i < nums.length　; i++){
		addEvent(nums[i],"click",numHandler);
	}
	var marks = $class("mark");
	for(var i = 0; i < marks.length　; i++){
		addEvent(marks[i],"click",markHandler);
	}
}();

/*绑定点击运算事件*/
addEvent($id("cpm"),"click",operation);
/*绑定清除事件*/
addEvent($id("clear"),"click",function(){
	config = {
		num:"",
		firstNum:"",
		lastNum:"",
		mark:""
	};
	$id("content").textContent = "";
});