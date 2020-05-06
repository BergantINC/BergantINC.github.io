var canvas = document.getElementById("myCanvas");
    var ctx = canvas.getContext("2d");
    var ballRadius = 10;
    var x = canvas.width/2;
    var y = canvas.height-30;
    var dx = 6;
    var dy = -6;
    var paddleHeight = 10;
    var paddleWidth = 120;
    var paddleX = (canvas.width-paddleWidth)/2;
	var paddleY = (canvas.height-paddleHeight);
    var rightPressed = false;
    var leftPressed = false;
    var brickRowCount = 10;
    var brickColumnCount = 9;
    var brickWidth = 75;
    var brickHeight = 20;
    var brickPadding = 10;
    var brickOffsetTop = 30;
    var brickOffsetLeft = 30;
	var lvlTime = 180;
	var startTime = new Date().getTime() / 1000;
	var seconds = 0;
    var score = 0;
    var lives = 3;
	var lvlIndicator = 1;
	var maxScore = 0;
	var paddleHitAudio = new Audio('sounds/paddleHitTry.mp3');
	//var brickBreak = new Audio('sounds/glassBreakEdit.mp3');
	var brickBreak = new Audio('sounds/paddleHitTry.mp3');
	var isPause = false;
	var isEsc = false;

    var bricks = [];
    for(var c=0; c<brickColumnCount; c++) {
        bricks[c] = [];
        for(var r=0; r<brickRowCount; r++) {
            bricks[c][r] = { x: 0, y: 0, status: 1, health: 1};//brick positions and status
        }
    }

    document.addEventListener("keydown", keyDownHandler, false);
	document.addEventListener("keydown", Pause, false);
	document.addEventListener("keydown", Escape, false);
    document.addEventListener("keyup", keyUpHandler, false);
    document.addEventListener("mousemove", mouseMoveHandler, false);

	function drawLine(){
		ctx.beginPath();
		ctx.lineWidth=1;
        ctx.strokeStyle = "#ff0000";
        ctx.moveTo(0 , paddleY);
		ctx.lineTo(canvas.width , paddleY);
        ctx.stroke();
		ctx.closePath();
	}
	
	function Continue(){
		isEsc = false;
		var arrBricks = sessionStorage.getItem("bricks"); 
		bricks = JSON.parse(arrBricks);
		lives = JSON.parse(sessionStorage.getItem("lives")); 
		seconds = JSON.parse(sessionStorage.getItem("time")); 
		lvlIndicator = JSON.parse(sessionStorage.getItem("lvl"));
		var menu = document.getElementById("Menu");
		menu.style.display = "none";
		var canvas = document.getElementById("myCanvas");
		var ctx = canvas.getContext("2d");
		canvas.style.display = "block";
		console.log(JSON.stringify(bricks));
		console.log(JSON.parse(JSON.stringify(bricks)));
		console.log(typeof lvlIndicator);
	}
	
	function Escape(e){
		console.log(isPause);
		if(e.keyCode == 27){
			sessionStorage.setItem("bricks", JSON.stringify(bricks));
			sessionStorage.setItem("lives", lives);
			sessionStorage.setItem("time", seconds);
			sessionStorage.setItem("lvl", lvlIndicator);
			document.getElementById("bricks").innerHTML = sessionStorage.getItem("bricks"); 
			document.getElementById("lives").innerHTML = sessionStorage.getItem("lives"); 
			document.getElementById("time").innerHTML = sessionStorage.getItem("time"); 
			document.getElementById("lvl").innerHTML = sessionStorage.getItem("lvl"); 
			var menu = document.getElementById("Menu");
			menu.style.display = "block";
			var canvas = document.getElementById("myCanvas");
			canvas.style.display = "none";
			isEsc = true;
			isPause = true;
			var start = document.getElementById("Start");
			start.style.display = "none";
			var start = document.getElementById("Start2");
			start.style.display = "block";
			ctx.font = "64px Arial";
			ctx.fillStyle = "#D4AF37";
			ctx.fillText("Pres space to resume",150,400);
		}
	}
	
	function Pause(e){
		if(!isEsc){
			if(e.keyCode == 32){
				if(!isPause){
					ctx.font = "64px Arial";
					ctx.fillStyle = "#D4AF37";
					ctx.fillText("Pres space to resume",150,400);
					isPause = true;
					pauseTime1 = new Date().getTime() / 1000;
				}
				else{
					isPause = false;
					pauseTime2 = new Date().getTime() / 1000;
					draw();
				}
			}
		}
	}
	
    function keyDownHandler(e) {
        if(e.keyCode == 39) {
            rightPressed = true;
        }
        else if(e.keyCode == 37) {
            leftPressed = true;
        }
    }
    function keyUpHandler(e) {
        if(e.keyCode == 39) {
            rightPressed = false;
        }
        else if(e.keyCode == 37) {
            leftPressed = false;
        }
    }
    function mouseMoveHandler(e) {
        var relativeX = e.clientX - canvas.offsetLeft;
        if(relativeX > 0 && relativeX < canvas.width) {
            paddleX = relativeX - paddleWidth/2;
        }
    }
    function collisionDetection() {
        for(var c=0; c<brickColumnCount; c++) {
            for(var r=0; r<brickRowCount; r++) {
                var b = bricks[c][r]; //brick positions and status
                if(b.status > 0) {
					//brick collision
                    if(x+ballRadius > b.x && x-ballRadius < b.x+brickWidth && y+ballRadius > b.y && y-ballRadius < b.y+brickHeight) {
                        dy = -dy;
                        b.health --;
						brickBreak.play();
						if(b.health == 0){
							b.status=0;
							score++;
						}
                        if(score == brickRowCount*brickColumnCount) {
							if(lvlIndicator == 4){
								window.open("https://www.youtube.com/watch?v=1Bix44C1EzY");
							}
							maxScore += score;
							score = maxScore;
                            alert("YOU WIN, CONGRATS!");
							lvlIndicator ++;
							seconds = 0;
							dx = 6;
							dy = -6;
							x = canvas.width/2;
							y = canvas.height-30;
							drawBall();
                        }
                    }
                }
            }
        }
    }

    function drawBall() {
        ctx.beginPath();
        ctx.arc(x, y, ballRadius, 0, Math.PI*2);
		var my_gradient = "#D4AF37";
		ctx.fillStyle = my_gradient;
        ctx.fill();
        ctx.closePath();
    }
    function drawPaddle() {
        ctx.beginPath();
        ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
		//var mygrad=ctx.createLinearGradient(paddleX-60,paddleY);
        ctx.fillStyle = "#000000";
        ctx.fill();
        ctx.closePath();
    }
	
	function getRandomInt(max) {
		return Math.floor(Math.random() * Math.floor(max));
	}
	
    function drawBricks() {
        for(var c=0; c<brickColumnCount; c++) {
            for(var r=0; r<brickRowCount; r++) {
                if(bricks[c][r].status == 1) {
                    var brickX = (r*(brickWidth+brickPadding))+brickOffsetLeft;
                    var brickY = (c*(brickHeight+brickPadding))+brickOffsetTop;
                    bricks[c][r].x = brickX;
                    bricks[c][r].y = brickY;
                    ctx.beginPath();
                    ctx.rect(brickX, brickY, brickWidth, brickHeight);
					var rand = getRandomInt(4);
					if(rand == 0)
						ctx.fillStyle = "#D4AF37";
					else if(rand == 1)
						ctx.fillStyle = "#FF00FF";
					else if(rand == 2)
						ctx.fillStyle = "#9400D3";
					else if(rand == 3)
						ctx.fillStyle = "#00FFFF";
                    ctx.fill();
                    ctx.closePath();
                }
            }
        }
    }
	function drawBricksLvl2() {
		lvlTime = 150;
		for(var c=0; c<brickColumnCount; c++) {
        bricks[c] = [];
        for(var r=0; r<brickRowCount; r++) {
            bricks[c][r] = { x: 0, y: 0, status: 1 , health: 1};//brick positions and status
        }
    }
        for(var c=0; c<brickColumnCount; c++) {
            for(var r=0; r<brickRowCount; r++) {
                if(bricks[c][r].status == 1) {
                    var brickX = (r*(brickWidth+brickPadding))+brickOffsetLeft;
                    var brickY = (c*(brickHeight+brickPadding))+brickOffsetTop;
                    bricks[c][r].x = brickX;
                    bricks[c][r].y = brickY;
                    ctx.beginPath();
                    ctx.rect(brickX, brickY, brickWidth, brickHeight);
                    var rand = getRandomInt(4);
					if(rand == 0)
						ctx.fillStyle = "#0000ff";
					else if(rand == 1)
						ctx.fillStyle = "#000033";
					else if(rand == 2)
						ctx.fillStyle = "#ff1ab3";
					else if(rand == 3)
						ctx.fillStyle = "#ffff00";
                    ctx.fill();
                    ctx.closePath();
                }
            }
        }
    }
	function drawBricksLvl3() {
		lvlTime = 120;
		for(var c=0; c<brickColumnCount; c++) {
        bricks[c] = [];
        for(var r=0; r<brickRowCount; r++) {
            bricks[c][r] = { x: 0, y: 0, status: 1 , health: 1};//brick positions and status
        }
    }
        for(var c=0; c<brickColumnCount; c++) {
            for(var r=0; r<brickRowCount; r++) {
                if(bricks[c][r].status == 1) {
                    var brickX = (r*(brickWidth+brickPadding))+brickOffsetLeft;
                    var brickY = (c*(brickHeight+brickPadding))+brickOffsetTop;
                    bricks[c][r].x = brickX;
                    bricks[c][r].y = brickY;
                    ctx.beginPath();
                    ctx.rect(brickX, brickY, brickWidth, brickHeight);
                    var rand = getRandomInt(4);
					if(rand == 0)
						ctx.fillStyle = "#ff0000";
					else if(rand == 1)
						ctx.fillStyle = "#660066";
					else if(rand == 2)
						ctx.fillStyle = "#00cc00";
					else if(rand == 3)
						ctx.fillStyle = "#33cccc";
                    ctx.fill();
                    ctx.closePath();
                }
            }
        }
    }
	function drawBricksLvl4() {
		lvlTime = 90;
		for(var c=0; c<brickColumnCount; c++) {
        bricks[c] = [];
        for(var r=0; r<brickRowCount; r++) {
            bricks[c][r] = { x: 0, y: 0, status: 1 , health: 1};//brick positions and status
        }
    }
        for(var c=0; c<brickColumnCount; c++) {
            for(var r=0; r<brickRowCount; r++) {
                if(bricks[c][r].status == 1) {
                    var brickX = (r*(brickWidth+brickPadding))+brickOffsetLeft;
                    var brickY = (c*(brickHeight+brickPadding))+brickOffsetTop;
                    bricks[c][r].x = brickX;
                    bricks[c][r].y = brickY;
                    ctx.beginPath();
                    ctx.rect(brickX, brickY, brickWidth, brickHeight);
                    var rand = getRandomInt(4);
					if(rand == 0)
						ctx.fillStyle = "#ccff99";
					else if(rand == 1)
						ctx.fillStyle = "#cccc00";
					else if(rand == 2)
						ctx.fillStyle = "#003300";
					else if(rand == 3)
						ctx.fillStyle = "#336699";
                    ctx.fill();
                    ctx.closePath();
                }
            }
        }
    }
    function drawScore() {
		seconds = new Date().getTime() / 1000 - startTime;
		seconds = Math.round(seconds);
        ctx.font = "16px Arial";
        ctx.fillStyle = "#D4AF37";
        ctx.fillText("Score: "+score+" Time: "+seconds+"s/"+lvlTime, 8, 20);
    }
    function drawLives() {
        ctx.font = "16px Arial";
        ctx.fillStyle = "#D4AF37";
        ctx.fillText("Lives: "+lives, canvas.width-65, 20);
    }

    function draw() {
		if(!isPause){
			ctx.clearRect(0, 0, canvas.width, canvas.height);
			switch(lvlIndicator){
				case 1: drawBricks(); break;
				case 2: drawBricksLvl2(); break;
				case 3: drawBricksLvl3(); break;
				case 4: drawBricksLvl4(); break;
				default: document.location.reload(); break;
			}
			drawBall();
			drawPaddle();
			drawScore();
			drawLives();
			//drawLine();
			collisionDetection();
			if(seconds >= lvlTime){
				alert("GAME OVER");
				document.location.reload();
			}
			//collision z robi
			if(x + dx > canvas.width-ballRadius || x + dx < ballRadius) {
				dx = -dx;
			}
			if(y + dy < ballRadius) {
				dy = -dy;
			}
			else if(y + dy > canvas.height-ballRadius) {
				//collision z paddle
				if(x+ballRadius > paddleX && x-ballRadius < paddleX + paddleWidth && y+ballRadius> paddleY ) {
					dy = -dy;
					var paddleCenter = paddleX + paddleWidth/2;
					var ballDistanceFromPaddleCenter = x - paddleCenter;
					dx = ballDistanceFromPaddleCenter*0.25;
					paddleHitAudio.play();
				}
				else {
					lives--;
					if(!lives) {
						alert("GAME OVER");
						document.location.reload();
					}
					else {
						x = canvas.width/2;
						y = canvas.height-30;
						dx = 6;
						dy = -6;
						paddleX = (canvas.width-paddleWidth)/2;
					}
				}
			}

			if(rightPressed && paddleX < canvas.width-paddleWidth) {
				paddleX += 7;
			}
			else if(leftPressed && paddleX > 0) {
				paddleX -= 7;
			}

			x += dx;
			y += dy;
			requestAnimationFrame(draw);
		}
    }
    draw();