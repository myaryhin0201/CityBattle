

Math.guid = function() {
	return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
		var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
		return v.toString(16);
	}).toUpperCase();
};

function Agent(x, y) {
	this.guid = 0;

	this.x = x; 
	this.y = y; 

	this.offsetX = 10; 
	// width
	this.offsetY = 10; 

	this.width = 40; 
	this.height = 40; 

	this.speed = 10;
	this.facing = "up";

	
	this.checkCollision = function(posx, posy) {
		var gridType = landMap[posy][posx];
		if ((gridType == RIVER) || (gridType == STEEL) || (gridType == BRICK)
				|| (gridType == EAGLE)) {

			return true;
		}
	};

	this.deRender = function() {
		var div = document.getElementById(this.guid);
		div.parentNode.removeChild(div);
	}
	
	this.moveRight = function() {
		this.facing = "right";
		var div = document.getElementById(this.guid);
		div.style.backgroundPosition = "0px -40px";
		if (this.x < 12) {
			if (this.checkCollision(this.x + 1, this.y)) {
				return;
			}
			this.x = this.x + 1;
			;
			div.style.left = (this.x) * this.width + this.offsetX + "px";
		}

	};

	
	this.moveLeft = function() {
		this.facing = "left";
		var div = document.getElementById(this.guid);
		div.style.backgroundPosition = "0px -120px";

		if (this.x > 0) {
			if (this.checkCollision(this.x - 1, this.y)) {
				return;
			}
			this.x = this.x - 1;
			div.style.left = (this.x) * this.width + this.offsetX + "px";
		}
	};
	
	this.moveUp = function() {
		this.facing = "up";
		var div = document.getElementById(this.guid);
		div.style.backgroundPosition = "0px 0px";
		if (this.y > 0) {
			if (this.checkCollision(this.x, this.y - 1)) {
				return;
			}
			this.y = this.y - 1;
			;
			div.style.top = (this.y) * this.height + this.offsetY + "px";

		}
	};
	
	this.moveDown = function() {
		this.facing = "down";
		var div = document.getElementById(this.guid);
		div.style.backgroundPosition = "0px -80px";
		if (this.y < 12) {
			if (this.checkCollision(this.x, this.y + 1)) {
				return;
			}
			this.y = this.y + 1;
			;
			div.style.top = (this.y) * this.height + this.offsetY + "px";

		}
	};
	
	this.fire = function() {
		var bullet = new Bullet(this.x, this.y);
		bullet.direction = this.facing;
		bullet.createBullet();
		bullets.push(bullet);
	}
}

function Bullet(x, y) {
	this.guid = Math.guid;

	this.direction = "up";

	this.x = x; 
	this.y = y; 

	this.offsetX = 10; 
	this.offsetY = 10; 

	this.directionOffsetX = 0;
	this.directionOffsetY = 0;

	this.width = 40; 
	this.height = 40; 

	this.speed = 10;

	this.owner = null;

	this.checkCollision = function(posx, posy) {
		var gridType = landMap[posy][posx];
		if ((gridType == BRICK)) {
			var section = document.getElementById(posx + "" + posy);
			section.removeChild(section.childNodes[0]);
			landMap[posy][posx] = LAND;
			return true;
		}
		if (gridType == EAGLE) {
			var section = document.getElementById(posx + "" + posy);
			section.removeChild(section.childNodes[0]);
			landMap[posy][posx] = LAND;
			gameOver();
		}
		if (gridType == STEEL) {
			return true;
		}
		if (this.owner == "enemytank") {
			if ((myTank.x == posx) && (myTank.y == posy)) {
				myTank.deRender();
				gameOver();
				return true;
			}
		}
		if (this.owner == "mytank") {
			for ( var p = 0; p < enemyTanks.length; p++) {
				if ((enemyTanks[p].x == posx) && (enemyTanks[p].y == posy)) {
					enemyTanks[p].deRender();
					enemyTanks.splice(p, 1);
					return true;
				}
			}
			return false;
		}
		return false;
	};

	this.move = function() {
		if (this.isHit) {
			this.speed = 0;
		}
		switch (this.direction) {
		case "up":
			var bullet = document.getElementById(this.guid);
			var bullet_top = bullet.style.top;
			bullet_top = bullet_top.substring(0, bullet_top.length - 2);
			temp = parseInt(bullet_top) - this.speed;
			var left = parseInt(bullet.style.left.substring(0,
					bullet.style.left.length - 2));
			var top = parseInt(bullet.style.top.substring(0,
					bullet.style.top.length - 2));
			top = top - this.speed;
			var gridX = Math.floor(top / 40);
			var gridY = Math.floor(left / 40);
			if (gridX < 0) {
				this.explode();
				return;
			}
			if (!this.checkCollision(gridY, gridX)) {
				bullet.style.top = top + "px";
			} else {
				this.explode();
			}

			break
		case "down":
			var bullet = document.getElementById(this.guid);
			var bullet_top = bullet.style.top;
			bullet_top = bullet_top.substring(0, bullet_top.length - 2);
			temp = parseInt(bullet_top) - this.speed;
			var left = parseInt(bullet.style.left.substring(0,
					bullet.style.left.length - 2));
			var top = parseInt(bullet.style.top.substring(0,
					bullet.style.top.length - 2));
			top = top + this.speed;
			var gridX = Math.floor(top / 40);
			var gridY = Math.floor(left / 40);
			if (gridX >= 13) {
				this.explode();
				return;
			}
			if (!this.checkCollision(gridY, gridX)) {
				bullet.style.top = top + "px";
			} else {
				this.explode();
			}
			break
		case "right":
			var bullet = document.getElementById(this.guid);
			var bullet_top = bullet.style.top;
			bullet_top = bullet_top.substring(0, bullet_top.length - 2);
			temp = parseInt(bullet_top) - this.speed;
			var left = parseInt(bullet.style.left.substring(0,
					bullet.style.left.length - 2));
			var top = parseInt(bullet.style.top.substring(0,
					bullet.style.top.length - 2));
			left = left + this.speed;
			var gridX = Math.floor(top / 40);
			var gridY = Math.floor(left / 40);
			if (gridY >= 13) {
				this.explode();
				return;
			}
			if (!this.checkCollision(gridY, gridX)) {
				bullet.style.left = left + "px";
			} else {
				this.explode();
			}
			break
		break
	case "left":
		var bullet = document.getElementById(this.guid);
		var bullet_top = bullet.style.top;
		bullet_top = bullet_top.substring(0, bullet_top.length - 2);
		temp = parseInt(bullet_top) - this.speed;
		var left = parseInt(bullet.style.left.substring(0,
				bullet.style.left.length - 2));
		var top = parseInt(bullet.style.top.substring(0,
				bullet.style.top.length - 2));
		left = left - this.speed;
		var gridX = Math.floor(top / 40);
		var gridY = Math.floor(left / 40);
		if (gridY < 0) {
			this.explode();
			return;
		}
		if (!this.checkCollision(gridY, gridX)) {
			bullet.style.left = left + "px";
		} else {
			this.explode();
		}
		break
	default:
		break
	}
	this.removeBullet = function() {

		for ( var r = 0; r < bullets.length; r++) {
			if (this.guid == bullets[r].guid) {
				bullets.splice(r, 1);
			}
		}
		var div = document.getElementById(this.guid);
	

		div.parentNode.removeChild(div);
	}
	this.explode = function() {
		this.removeBullet();
	}
}

	this.createBullet = function() {
		var container = document.createElement('div');
		document.body.appendChild(container);
		this.guid = Math.guid();

		var bullet = document.createElement('div');

		switch (this.direction) {
		case "up":
			bullet.style.backgroundPosition = "0px 0px";
			break
		case "down":
			bullet.style.backgroundPosition = "0px -80px";
			break
		case "right":
			bullet.style.backgroundPosition = "0px -40px";
			break
		case "left":
			bullet.style.backgroundPosition = "0px -120px";
			break
		default:
			break
		}

		container.appendChild(bullet);
		bullet.id = this.guid;
		bullet.className = "bomb";
		bullet.style.position = "absolute";
		bullet.style.left = (this.x) * this.width + this.offsetX + "px";
		bullet.style.top = (this.y) * this.height + this.offsetY + "px";
	}

}


function MyTank(x, y) {
	Agent.call(this, x, y);
}

function EnemyTank(x, y) {
	Agent.apply(this, [ x, y ]);
}


MyTank.prototype.createTank = function() {
	var container = document.createElement('div');
	document.body.appendChild(container);
	this.guid = Math.guid();

	var tank = document.createElement('div');

	container.appendChild(tank);
	tank.id = this.guid;
	tank.className = "itank";
	tank.style.position = "absolute";
	tank.style.left = (this.x) * this.width + this.offsetX + "px";
	tank.style.top = (this.y) * this.height + this.offsetY + "px";

	this.fire = function() {
		var bullet = new Bullet(this.x, this.y);
		bullet.owner = "mytank";
		bullet.direction = this.facing;
		bullet.createBullet();
		bullets.push(bullet);
	}
}


EnemyTank.prototype.createTank = function() {
	var container = document.createElement('div');
	document.body.appendChild(container);
	this.guid = Math.guid();

	var tank = document.createElement('div');

	container.appendChild(tank);
	tank.id = this.guid;
	tank.className = "etank";
	tank.style.position = "absolute";
	tank.style.left = (this.x) * this.width + this.offsetX + "px";
	tank.style.top = (this.y) * this.height + this.offsetY + "px";

	this.fire = function() {
		var bullet = new Bullet(this.x, this.y);
		bullet.owner = "enemytank";
		bullet.direction = this.facing;
		bullet.createBullet();
		bullets.push(bullet);
	}
}

EnemyTank.prototype.moveRandomly = function() {
	var random = Math.random() * 4;
	if ((random >= 0) && random < 1) {
		this.moveRight();
	}
	if ((random >= 1) && random < 2) {
		this.moveLeft();
	}
	if ((random >= 2) && random < 3) {
		this.moveUp();
	}
	if ((random >= 3) && random < 4) {
		this.moveDown();
	}
}


Agent.prototype.moveTo = function(newx, newy) {
	var image = document.getElementById(this.guid);
	image.style.left = newx + "px";
	this.x = newx;
	image.style.top = newy + "px";
	this.y = newy;
}


var bullets = new Array;
setInterval("shootBullets()", 30);
function shootBullets() {

	for ( var k = 0; k < bullets.length; k++) {
		bullets[k].move();
		if (enemyTanks.length == 0) {
			win();
			break;
		}
	}
}
function win() {
	alert("Well Done! Win! You may have another round");
	window.location.reload();
}
function gameOver() {
	alert("Game Over! But you may try another round!");
	window.location.reload();
}

var myTank;// an instance of MyTank class
var enemyTanks = new Array();// array of instances of EnemyTank class


setInterval("randomMove()", 1000);
function randomMove() {
	for ( var p = 0; p < enemyTanks.length; p++) {
		enemyTanks[p].moveRandomly();
		enemyTanks[p].fire();
	}
}

document.onkeydown = keylistener;
function keylistener(e) {

	e = e ? e : window.event;
	var keynum = e.which ? e.which : e.keyCode;

	var arrows = new Array();
	arrows['87'] = 'up';// key w
	arrows['83'] = 'down';// key s
	arrows['65'] = 'left';// key a
	arrows['68'] = 'right';// key d

	move(arrows[keynum]);

	if (keynum == 74) {
		myTank.fire();
	}
}


function move(direction) {
	switch (direction) {
	case 'up':
		myTank.moveUp();
		break;
	case 'down':
		myTank.moveDown();
		break;
	case 'left':
		myTank.moveLeft();
		break;
	case 'right':
		myTank.moveRight();
		break;
	}
}
