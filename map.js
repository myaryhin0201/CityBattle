
var landMap = new Array();

var BRICK = 1;
var GRASS = 2;
var RIVER = 3;
var STEEL = 4;
var LAND = 5;
var EAGLE = 6;

var HORIZONTAL_GRID_COUNT = 13;
var VERTICAL_GRID_COUNT = 13;

landMap = [
		[ LAND, LAND, LAND, LAND, LAND, LAND, LAND, LAND, LAND, LAND, LAND,
				LAND, LAND ],
		[ LAND, LAND, BRICK, BRICK, BRICK, LAND, LAND, BRICK, BRICK, BRICK,
				LAND, BRICK, LAND ],
		[ LAND, LAND, LAND, LAND, LAND, BRICK, LAND, LAND, LAND, LAND, STEEL,
				LAND, LAND ],
		[ LAND, STEEL, LAND, LAND, GRASS, GRASS, GRASS, GRASS, LAND, LAND,
				LAND, LAND, LAND ],
		[ BRICK, STEEL, LAND, LAND, RIVER, RIVER, RIVER, RIVER, RIVER, LAND,
				LAND, BRICK, BRICK ],
		[ BRICK, LAND, LAND, LAND, GRASS, LAND, LAND, BRICK, BRICK, BRICK,
				LAND, LAND, BRICK ],
		[ GRASS, GRASS, BRICK, LAND, GRASS, STEEL, LAND, LAND, BRICK, LAND,
				STEEL, STEEL, BRICK ],
		[ GRASS, BRICK, BRICK, LAND, GRASS, LAND, LAND, LAND, STEEL, STEEL,
				BRICK, BRICK, BRICK ],
		[ GRASS, LAND, LAND, LAND, LAND, LAND, LAND, LAND, LAND, LAND, BRICK,
				STEEL, BRICK ],
		[ LAND, BRICK, BRICK, LAND, BRICK, BRICK, BRICK, BRICK, LAND, LAND,
				BRICK, LAND, BRICK ],
		[ LAND, BRICK, BRICK, LAND, LAND, LAND, LAND, LAND, LAND, LAND, BRICK,
				LAND, LAND ],
		[ LAND, LAND, LAND, LAND, LAND, BRICK, BRICK, BRICK, LAND, BRICK,
				BRICK, LAND, LAND ],
		[ LAND, LAND, BRICK, LAND, LAND, BRICK, EAGLE, BRICK, LAND, LAND, LAND,
				LAND, LAND ], ];


var tanksMap = [ [ 4, 12 ], [ 0, 0 ], [ 0, 6 ], [ 0, 12 ] ]
function preprocessMap() {
	this.position = 0;
	
	for ( var i = 0; i < 13; i++) {
		for ( var j = 0; j < 13; j++) {
			position = i + "" + j;
			var block = document.createElement('div');
			document.getElementById("divMap").appendChild(block);
			block.id = position;
		}
	}
}


function loadTanks() {
	var myTankX = tanksMap[0][0];
	var myTankY = tanksMap[0][1];
	myTank = new MyTank(myTankX, myTankY);
	myTank.createTank();

	var enemyTank;
	for ( var i = 1; i < tanksMap.length; i++) {
		enemyTank = new EnemyTank(tanksMap[i][1], tanksMap[i][0]);
		enemyTank.createTank();
		enemyTanks.push(enemyTank);
	}

}

function loadMap() {
	var block;
	for ( var i = 0; i < 13; i++) {
		for ( var j = 0; j < 13; j++) {
			var type = landMap[j][i];
			switch (type) {
			case BRICK:
				block = new Brick(i, j);
				break
			case GRASS:
				block = new Grass(i, j);
				break
			case LAND:
				block = new Land(i, j);
				break
			case STEEL:
				block = new Steel(i, j);
				break
			case RIVER:
				block = new River(i, j);
				break
			case EAGLE:
				block = new Eagle(i, j);
				break
			default:
				break
			}
			block.createBlock();

		}
	}

}
