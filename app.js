var player = {
    
        name: 'M',
        x: 0,
        y: 480,
        speed: 0,
        gravity: 0,
        jumping: false,
        maxJump: 30,
		maxSpeed: 3,
		maxGravity: 3,
		pkt: 0,
		isOnWall: false,
		nextStepX: function() {
			return this.x + this.speed;
		},
		nextStepY: function() {
			return this.y + this.gravity;
		},
    
        newPosition: function() {
            this.x += this.speed;
            this.y -= this.gravity;
            this.speed = 0;
        },
		
		checkWalk: function() {
			
            nextStep = this.nextStepX();
            if(nextStep <= -5) {
                this.speed = 0;	//this.x = 480
            } else if(nextStep >= 489) { 
                this.speed = 0;	//this.x = 0
            }    
        },
		
		checkIfStand: function() {
			
			if(this.speed == 0 && this.gravity == 0) {
			
				map.countImagesTimeLeft = 0;
				map.countImagesTimeRight = 0;
				map.img.src = map.imageStand;
			
			}
			
		},
    
        checkJump: function() {
			
            if((this.y <= map.height - this.maxJump - map.actualY) || ((this.y < map.height) && (this.isOnWall == false) && (this.gravity != this.maxGravity))) {
                this.gravity = -this.maxGravity;
			} else if(this.y >= map.height) {
				this.isOnWall = false;
                this.jumping = false;
				this.gravity = 0;
				this.y = 480;
            }
			
			if(this.gravity == -this.maxGravity || this.gravity == 0) {

				for(var i=0; i<map.walls.length; i++) {

					var tempI = i;
				
					for(j=map.walls[tempI].x-3; j<=map.walls[tempI].x + map.walls[tempI].l + 3; j++) { // -3 i +3 żeby wyglądało jakby stał na podescie nawet koncowka stopy
					
						//console.log(this.x + ' ' + this.y + ' // ' + j + ' ' + map.walls[i].y);
						
						for(var m=0; m<this.maxGravity; m++) {
														
							if(this.x == j && this.y == (map.walls[tempI].y+m)) {
							
								//console.log('wskoczyl');
								this.isOnWall = true;
								this.jumping = false;
								this.gravity = 0;
								this.y = map.walls[tempI].y;
								m=this.maxGravity;
								j=map.walls[i].x + map.walls[i].l + 3 + 1;
								i=map.walls.length+1;
								
							} else {
								
								this.isOnWall = false;
								
							}
							
						}
					
					}
				
				}
			}
			//console.log(this.isOnWall);
    
        },
		
		checkApple: function() {
			
			for(var i=map.wallForApple.xDraw+2; i<map.wallForApple.xDraw+6; i++) {
				
				if(player.y+19 == map.wallForApple.yDraw+1) {
					
					if(i == this.x+2 || i == this.x+6 || i == this.x+10 || i == this.x+14) {
						
						player.pkt++;
						map.setApplePosition();
						map.timer = map.maxTime;
						this.timerCounts = 0;
						
					}
					
				}
				
			}
			
			for(var i=map.wallForApple.yDraw-8; i<map.wallForApple.yDraw+2; i++) {
				
				if(this.x+2 == map.wallForApple.xDraw+4 || this.x+6 == map.wallForApple.xDraw+4 || this.x+10 == map.wallForApple.xDraw+4 || this.x+14 == map.wallForApple.xDraw+4) {
						
					if(i == player.y+19) {
						
						player.pkt++;
						map.setApplePosition();
						map.timer = map.maxTime;
						this.timerCounts = 0;
							
					}
					
				}
				
			}
			
		}
    
    }
    
    var map = {
		
		img: new Image(),
		imgApple: new Image(),
        height: 480,
        width: 500,
		keyPressed: {},
		numberOfWalls: 10,
		wallForApple: {},
		maxTime: 5,
		timerCounts: 0,
		walls: [{
				x: 50,
				y: 470,
				xDraw: 60,
				yDraw: 490,
				l: 35
			   },{
				x: 200,
				y: 460,
				xDraw: 210,
				yDraw: 480,
				l: 55
			   },{
				x: 70,
				y: 435,
				xDraw: 80,
				yDraw: 455,
				l: 150
			   },{
				x: 100,
				y: 455,
				xDraw: 110,
				yDraw: 475,
				l: 40
			   },{
				x: -10,
				y: 420,
				xDraw: 0,
				yDraw: 440,
				l: 80
			   },{
				x: 300,
				y: 400,
				xDraw: 310,
				yDraw: 420,
				l: 100
			   },{
				x: -10,
				y: 380,
				xDraw: 0,
				yDraw: 400,
				l: 20
			   },{
				x: 100,
				y: 400,
				xDraw: 110,
				yDraw: 420,
				l: 50
			   },{
				x: 50,
				y: 380,
				xDraw: 60,
				yDraw: 400,
				l: 20
			   },{
				x: 260,
				y: 420,
				xDraw: 270,
				yDraw: 440,
				l: 15
			   }],
		wallSize: 2,
		actualY: 0,
		countImagesTimeRight: 0,
		countImagesTimeLeft: 0,
		imageRunRight1: "IMAGErunRIGHT1.png",
		imageRunRight2: "IMAGErunRIGHT2.png",
		imageRunLeft1: "IMAGErunLEFT1.png",
		imageRunLeft2: "IMAGErunLEFT2.png",
		imageStand: "IMAGEstand.png",
		imageApple: "apple.png",
		
		setStartImage: function() {
			
			this.img.src = this.imageStand;
			
		},
		
		setAppleImage: function() {
			
			this.imgApple.src = this.imageApple;
			
		},
		
		setStartTime: function() {
			
			this.timer = this.maxTime;
			
		},
		
		setStartPosition: function() {
			
			player.x = 0;
			player.y = 480;
			player.speed = 0;
			player.gravity = 0;
			player.pkt = 0;
			
		},
				
		update: function(ctx, interval) {
			
			this.checkKeyPressed();
			//this.setApplePosition();
			player.checkWalk();
			
			player.checkIfStand();
				
			player.newPosition();
			
			player.checkApple();
			
			this.setTimer(ctx, interval);
				
            player.checkJump();
				
			this.draw(ctx);
			
		},
		
		setTimer: function(ctx, interval) {
			
			this.timerCounts++;
			
			if(this.timerCounts == 30) {
			
				map.timer--;

				if(map.timer == 0) {
					
					this.lose = true;
					this.draw(ctx);
					
					clearInterval(interval);
					
					
				}
				this.timerCounts = 0;
				
			}
			
		},
		
		draw: function(ctx) {
			
			if(this.lose == true) {
				
				ctx.fillStyle="#000000";
				ctx.fillRect(0, 0, this.width, this.height+20);
				ctx.fillStyle="#FFFFFF";
				ctx.font = "30px Verdana";
				ctx.fillText("GAME OVER", 150, 150);
				ctx.fillText("YOUR POINTS: " + player.pkt, 120, 190);
				ctx.fillText("PLAY AGAIN", 150, 370);
				ctx.fillText("PRESS ENTER", 140, 410);
				
			} else {
			
				this.clear(ctx);
					
				ctx.fillStyle="#000000";
				//ctx.fillText(player.name, player.x, player.y);
			
				ctx.drawImage(this.img, player.x, player.y, 20, 20);
				
				for(var i=0; i<this.walls.length; i++) {
					ctx.fillRect(this.walls[i].xDraw,this.walls[i].yDraw, this.walls[i].l, this.wallSize);
				}
			
			
				//PUNKTY
				ctx.font = "30px Verdana";
				ctx.fillText("Points: " + player.pkt, 10, 40);
				ctx.fillText("Time: " + map.timer, 300, 40);
			
				//GAME OVER
			
				ctx.drawImage(this.imgApple, this.wallForApple.xDraw, this.wallForApple.yDraw-8,10,10);
				//tx.fillRect(player.x+2, player.y+19, 1, 1); // lewa stopa
				//ctx.fillRect(player.x+6, player.y+19, 1, 1); // środek1
				//ctx.fillRect(player.x+10, player.y+19, 1, 1); // środek1
				//ctx.fillRect(player.x+14, player.y+19, 1, 1); // prawa stopa
				//ctx.fillRect(player.x+8, player.y, 1, 1); // głowa
				//ctx.fillRect(this.wallForApple.xDraw+4, this.wallForApple.yDraw-8, 1, 1); //czubek jabłka
				//ctx.fillRect(this.wallForApple.xDraw+2, this.wallForApple.yDraw+1, 1, 1); //lewa jabłka
				//ctx.fillRect(this.wallForApple.xDraw+8, this.wallForApple.yDraw+1, 1, 1); //lewa jabłka
			
			}
			
		},
		
		clear: function(ctx) {
			
			ctx.fillStyle="#FFFFFF";
            ctx.fillRect(0, 0, this.width, this.height+20);
			
		},
				
        checkKeyPressed: function() {
			//console.log(player.isOnWall);
			if(this.img.src) {
				this.fileName = this.img.src.replace(/^.*[\\\/]/, '')
			}
			if(this.keyPressed[37] == true) {
				//lewo
				if(this.fileName == this.imageStand) {
					this.img.src = this.imageRunLeft1;
				} else if(this.fileName == this.imageRunLeft1) {
					map.countImagesTimeLeft++;
					if(map.countImagesTimeLeft == 3) {
						this.img.src = this.imageRunLeft2;
					}
				}else if(this.fileName == this.imageRunLeft2) {
					map.countImagesTimeLeft--;
					if(map.countImagesTimeLeft == 0) {
						this.img.src = this.imageRunLeft1;
					}
				}
				player.speed = -player.maxSpeed;
			} else if(this.keyPressed[39] == true) {
				//prawo
				if(this.fileName == this.imageStand) {
					this.img.src = this.imageRunRight1;
				} else if(this.fileName == this.imageRunRight1) {
					map.countImagesTimeRight++;
					if(map.countImagesTimeRight == 3) {
						this.img.src = this.imageRunRight2;
					}
				}else if(this.fileName == this.imageRunRight2) {
					map.countImagesTimeRight--;
					if(map.countImagesTimeRight == 0) {
						this.img.src = this.imageRunRight1;
					}
				}
				player.speed = player.maxSpeed;
			}
			if(this.keyPressed[38] == true) {
				//góra
				if(player.jumping == false) {
					player.jumping = true;
					player.isOnWall = false;
					player.gravity = player.maxGravity;
					this.actualY = (this.height - player.y);
				}
			}else if(this.keyPressed[40] == true && player.isOnWall == true) {
				//dół
				player.y += player.maxGravity;
			}
			
			//console.log("up: " + this.keyPressed[38] + " down: "+ this.keyPressed[40] + " onWall: " + player.isOnWall);
		},
		
		setApplePosition: function() {
			
			this.wallForApple.wallNumber = Math.round(Math.random()*(map.walls.length-1));
			this.wallForApple.xDraw = (Math.round(Math.random()*map.walls[this.wallForApple.wallNumber].l)+map.walls[this.wallForApple.wallNumber].xDraw-3);
			this.wallForApple.y = this.walls[this.wallForApple.wallNumber].y-2;
			this.wallForApple.x = this.walls[this.wallForApple.wallNumber].x;
			this.wallForApple.yDraw = this.walls[this.wallForApple.wallNumber].yDraw-2;
			
		}
    
    }
    
    document.addEventListener("DOMContentLoaded", function() {
        
            var ctx = document.getElementById('ctx').getContext('2d');
			
			start();
			
			function start() {
			
				map.setStartImage();
				map.setAppleImage();
				map.setApplePosition();
				map.setStartTime();
				map.setStartPosition();
    
				var interval = setInterval(function() { map.update(ctx, interval) }, 30);
				
			}
				    
            document.addEventListener("keydown", function(e) {
				
				if(e.keyCode == 13) {
				
					if(map.lose == true) {
					
						map.lose = false;
						start();
					
					}
					
				} else {
					                
					map.keyPressed[e.keyCode] = true;					
					
				}
            
            });
			
			document.addEventListener("keyup", function(e) {
				
				map.keyPressed[e.keyCode] = false;
				
			});
    
    });