var tag = "[Arithmetic] ";

function getLastMessageEl(){
    var l = document.querySelectorAll("[class*=message] span.copyable-text");
    return l[l.length-1];
}

function getMessage(){
	var l = document.querySelectorAll("[class*=message] span.copyable-text");
	for(var i = l.length-1; i>=0; --i){
		var text = l[i].innerText.trim();
		if(text.startsWith(tag) || !/^(-|)\d+$/.test(text)){
			continue;
		} else {
			return text;
		}
	}
}

function say(text){
	$('.copyable-text.selectable-text[contenteditable="true"]').sendkeys(tag+text);

	setTimeout(function(){
		$("span[data-icon='send']").click();
	},100);
}

function rnd(min,max){
    return Math.floor(Math.random()*(max-min+1)+min );
}

function genNum(){
	return rnd(1,999);
}

function getOperationString(op){
	switch(op){
		case 0:
			return "+";
		case 1:
			return "-";
		default:
			return "+";
	}
}

function doOperation(x1, x2, op){
	switch(op){
		case 0:
			return x1+x2;
		case 1:
			return x1-x2;
		default:
			return x1+x2;
	}
}

var expecting = false;

var num1 = 0;
var num2 = 0;
var ans = 0;
var operation = 0;

var prev = getMessage();

function main(){
	if(!expecting){
		num1 = genNum();
		num2 = genNum();
		operation = rnd(0, 1);

		ans = doOperation(num1,num2,operation);

		say(num1+getOperationString(operation)+num2+"=?");
		expecting = true;
	} else {
		var message = getMessage();
		if(message !== prev){
			saymessage = ""+num1+getOperationString(operation)+num2+"="+ans;
			if(message==String(ans)){
				say("✅ "+saymessage);
			} else {
				say("❌ "+saymessage);
			}

			expecting = false;
		}
		prev = message;
	}
}

setInterval(main, 300);
