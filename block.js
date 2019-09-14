function Block(x, y) {

	this.width = 40;
	this.height = 40;

	this.x = x;
	this.y = y;

	this.id = 0;

	this.createBlock = function() {
	}

	this.deleteBlock = function() {
		var div = document.getElementById(x + "" + y);
		div.removeChild(div.childNodes[0]);
		landMap[x, y] = LAND;
	}

}

function Brick(x, y) {
	Block.apply(this, [ x, y ]);

	this.createBlock = function() {
		var brick = document.createElement('div');
		document.getElementById(x + "" + y).appendChild(brick);
		brick.className = "brick";
		brick.style.position = "absolute";
		brick.style.width = this.width + "px";
		brick.style.height = this.height + "px";
		brick.style.left = (this.x) * this.width + "px";
		brick.style.top = (this.y) * this.height + "px";
	}
}

function Steel(x, y) {
	Block.apply(this, [ x, y ]);

	this.createBlock = function() {
		var steel = document.createElement('div');
		document.getElementById(x + "" + y).appendChild(steel);
		steel.className = "steel";
		steel.style.position = "absolute";
		steel.style.width = this.width + "px";
		steel.style.height = this.height + "px";
		steel.style.left = (this.x) * this.width + "px";
		steel.style.top = (this.y) * this.height + "px";
	}

}
function River(x, y) {
	Block.apply(this, [ x, y ]);

	this.createBlock = function() {
		var steel = document.createElement('div');
		document.getElementById(x + "" + y).appendChild(steel);
		steel.className = "river";
		steel.style.position = "absolute";
		steel.style.width = this.width + "px";
		steel.style.height = this.height + "px";
		steel.style.left = (this.x) * this.width + "px";
		steel.style.top = (this.y) * this.height + "px";
	}
}

function Grass(x, y) {
	Block.apply(this, [ x, y ]);

	this.createBlock = function() {
		var steel = document.createElement('div');
		document.getElementById(x + "" + y).appendChild(steel);
		steel.className = "grass";
		steel.style.position = "absolute";
		steel.style.width = this.width + "px";
		steel.style.height = this.height + "px";
		steel.style.left = (this.x) * this.width + "px";
		steel.style.top = (this.y) * this.height + "px";
	}

}
function Land(x, y) {
	Block.apply(this, [ x, y ]);
}

function Eagle(x, y) {
	Block.apply(this, [ x, y ]);

	this.createBlock = function() {
		var steel = document.createElement('div');
		document.getElementById(x + "" + y).appendChild(steel);
		steel.className = "eagle";
		steel.style.position = "absolute";
		steel.style.width = this.width + "px";
		steel.style.height = this.height + "px";
		steel.style.left = (this.x) * this.width + "px";
		steel.style.top = (this.y) * this.height + "px";
	}

}