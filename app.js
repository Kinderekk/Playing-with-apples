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
        }
    
    }
    
    var map = {
		
		img: new Image(),
        height: 480,
        width: 500,
		keyPressed: {},
		walls: [],
		wallSize: 2,
		actualY: 0,
		countImagesTimeRight: 0,
		countImagesTimeLeft: 0,
		imageRunRight1: "IMAGErunRIGHT1.png",
		imageRunRight2: "IMAGErunRIGHT2.png",
		imageRunLeft1: "IMAGErunLEFT1.png",
		imageRunLeft2: "IMAGErunLEFT2.png",
		imageStand: "IMAGEstand.png",
		
		setStartImage: function() {
			
			this.img.src = this.imageStand;
			
		},
				
		update: function(ctx) {
			
			this.checkKeyPressed();
			this.checkWalk();
			
			this.checkIfStand();
				
			player.newPosition();
				
            this.checkJump();
				
			this.draw(ctx);
			
		},
		
		draw: function(ctx) {
			
			this.clear(ctx);
				
            ctx.fillStyle="#000000";
            //ctx.fillText(player.name, player.x, player.y);
			
			ctx.drawImage(this.img, player.x, player.y, 20, 20);
				
			for(var i=0; i<this.walls.length; i++) {
				ctx.fillRect(this.walls[i].xDraw,this.walls[i].yDraw, this.walls[i].l, this.wallSize);
			}
			
		},
		
		clear: function(ctx) {
			
			ctx.fillStyle="#FFFFFF";
            ctx.fillRect(0, 0, this.width, this.height+20);
			
		},
				
        checkWalk: function() {
			
            nextStep = player.nextStepX();
            if(nextStep <= -5) {
                player.speed = 0;	//player.x = 480
            } else if(nextStep >= 489) { 
                player.speed = 0;	//player.x = 0
            }    
        },
		
		checkIfStand: function() {
			
			if(player.speed == 0 && player.gravity == 0) {
			
				map.countImagesTimeLeft = 0;
				map.countImagesTimeRight = 0;
				this.img.src = this.imageStand;
			
			}
			
		},
    
        checkJump: function() {
			
            if((player.y <= this.height - player.maxJump - map.actualY) || ((player.y < this.height) && (player.isOnWall == false) && (player.gravity != player.maxGravity))) {
                player.gravity = -player.maxGravity;
			} else if(player.y >= this.height) {
				player.isOnWall = false;
                player.jumping = false;
                player.gravity = 0;
				player.y = 480;
            }
			
			if(player.gravity == -player.maxGravity || player.gravity == 0) {

				for(var i=0; i<map.walls.length; i++) {

					var tempI = i;
				
					for(j=map.walls[tempI].x-3; j<=map.walls[tempI].x + map.walls[tempI].l + 3; j++) { // -3 i +3 żeby wyglądało jakby stał na podescie nawet koncowka stopy
					
						//console.log(player.x + ' ' + player.y + ' // ' + j + ' ' + map.walls[i].y);
						
						for(var m=0; m<player.maxGravity; m++) {
														
							if(player.x == j && player.y == (map.walls[tempI].y+m)) {
							
								//console.log('wskoczyl');
								player.isOnWall = true;
								player.jumping = false;
								player.gravity = 0;
								player.y = map.walls[tempI].y;
								m=player.maxGravity;
								j=map.walls[i].x + map.walls[i].l + 3 + 1;
								i=map.walls.length+1;
								
							} else {
								
								player.isOnWall = false;
								
							}
							
						}
					
					}
				
				}
			}
			//console.log(player.isOnWall);
    
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

		generateWalls: function() {

			

		}
    
    }
    
    document.addEventListener("DOMContentLoaded", function() {
        
            var ctx = document.getElementById('ctx').getContext('2d');
			
			map.setStartImage();
			map.generateWalls();
    
            setInterval(function() { map.update(ctx) }, 25);
				    
            document.addEventListener("keydown", function(e) {
                
				map.keyPressed[e.keyCode] = true;
            
            });
			
			document.addEventListener("keyup", function(e) {
				
				map.keyPressed[e.keyCode] = false;
				
			});
    
    });