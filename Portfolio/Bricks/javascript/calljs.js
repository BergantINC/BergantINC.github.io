var startPressed = false;
function Quit(){
	window.open("https://www.google.com","_self")
}
function Instructions(){
	if(!startPressed){
		var ins = document.getElementById("Instructions");
		ins.style.display = "block";
		var quit = document.getElementById("Quit");
		quit.style.display = "none";
		var play = document.getElementById("Start");
		play.style.display = "none";
		var play2 = document.getElementById("Start2");
		play2.style.display = "none";
		var options = document.getElementById("Options");
		options.style.display = "none";
	}
}
function Back(){
	if(startPressed){
		var ins = document.getElementById("Instructions");
		ins.style.display = "none";
		var quit = document.getElementById("Quit");
		quit.style.display = "block";
		var play = document.getElementById("Start2");
		play.style.display = "block";
		var options = document.getElementById("Options");
		options.style.display = "block";
	}
	else{
		var ins = document.getElementById("Instructions");
		ins.style.display = "none";
		var quit = document.getElementById("Quit");
		quit.style.display = "block";
		var play = document.getElementById("Start");
		play.style.display = "block";
		var options = document.getElementById("Options");
		options.style.display = "block";
	}
}
function myFun(){
	if(!startPressed){
		var menu = document.getElementById("Menu");
		menu.style.display = "none";
		var para = document.createElement("CANVAS");			// Create a <canvas> element
		para.id= "myCanvas";
		para.width = 900;
		para.height = 800;
		document.body.appendChild(para);
		var canvas = document.getElementById("myCanvas");
		var ctx = canvas.getContext("2d");
		ctx.font = "64px Arial";
		ctx.fillStyle = "#D4AF37";
		ctx.fillText("Pres space to start",200,400);
		startPressed = true;
		/*var script = document.createElement('script'); 
		
		script.src = "javascript.js";
		document.head.appendChild(script) */
	}
}
function Do(){
	Continue();
	
}
var i = true;
	window.onkeydown = function (e) {
		var code = e.keyCode ? e.keyCode : e.which;
		if(i){
			if (code === 32) { //space
				i = false;
				call();
			}
		}
	};
function call(){
 var script = document.createElement('script');
 script.id = "Game";
          
    script.src = "javascript/javascript.js";
    document.body.appendChild(script) 
}