'use strict'; /*jslint node:true*/

let PriorityQueue = function(comparison) {
	this.data = [];
	this.comparison = comparison;
};

PriorityQueue.prototype.push = function(element) {
	for (let i = 0; i < this.data.length; ++i) {
		if (this.comparison(this.data[i], element) >= 0) {
			this.data.splice(i, 0, element);
			return;
		}
	}

	this.data[this.data.length] = element;
};

PriorityQueue.prototype.pop = function() {
	return this.data.shift();
};

PriorityQueue.prototype.length = function() {
	return this.data.length;
};

PriorityQueue.prototype.has = function(element) {
	for (let i = 0; i < this.data.length; ++i) {
		if (this.comparison(this.data[i], element) === 0) {
			return true;
		}
	}

	return false;
};






class PathFinder {
	constructor(screen) {
		this.screen = screen;
	}

	pathToClosestStarFrom(coord) {
		let path = [];
		let node = this.searchClosestStarNodeTo(coord);

		while (node.parent) {
			path.unshift(node.coord);
			node = node.parent;
		}

		return path;
	}

	searchClosestStarNodeTo(coord) {
		let closed = [];
		let open = new PriorityQueue(function(a, b){
			return a.distance - b.distance;
		});

		let startNode = {
			coord: coord,
			distance: 0,
			parent: null
		}

		open.push(startNode);

		while (open.length() > 0) {
			let currentNode = open.pop();
			if (this.screen[currentNode.coord[0]][currentNode.coord[1]] === '*') {
				return currentNode;
			}
			closed.push(currentNode.coord);
			let siblings = this.expandNode(currentNode);
			for (let i = 0; i < siblings.length; ++i) {
				if (PathFinder.isCoordInList(siblings[i].coord, closed)) {
					continue;
				}
				open.push(siblings[i]);
			}
		}

		return null;
	}

	static isCoordInList(coord, list) {
		for (let i = 0; i < list.length; ++i) {
			if (list[i][0] === coord[0] && list[i][1] === coord[1]) {
				return true;
			}
		}

		return false;
	}

	expandNode(node) {
		let result = [];
		let siblingsCoord = PathFinder.getSiblingsCoord(node.coord);
		let walkableTypes = [' ', ':', '*'];

		for (let i = 0; i < siblingsCoord.length; ++i) {
			let siblingType = this.screen[siblingsCoord[i][0]][siblingsCoord[i][1]];
			//console.log(siblingType);
			if (siblingType !== undefined && walkableTypes.indexOf(siblingType) >= 0) {
				result.push({
					coord: siblingsCoord[i],
					distance: node.distance + 1,
					parent: node
				});
			}
		}

		return result;
	}

	static getSiblingsCoord(coord) {
		return [
			[coord[0] + 1, coord[1]],
			[coord[0], coord[1] - 1],
			[coord[0] - 1, coord[1]],
			[coord[0], coord[1] + 1]
		];
	}
}




function findPlayer(screen) {
	for (let r = 0; r < screen.length; ++r) {
		for (let c = 0; c < screen[0].length; ++c) {
			if (screen[r][c] === 'A') {
				return [r, c];
			}
		}
	}

	throw 'Cannot find player on screen';
}

function convertToCommand(currentCoord, nextCoord) {
	let dr = currentCoord[0] - nextCoord[0];
	let dc = currentCoord[1] - nextCoord[1];

	if (dr === 1 && dc === 0) {
		return 'u';
	}
	if (dr === 0 && dc === -1) {
		return 'r';
	}
	if (dr === -1 && dc === 0) {
		return 'd';
	}
	if (dr === 0 && dc === 1) {
		return 'l';
	}

	throw 'Cannot determine direction';
}


exports.play = function*(screen) {
	//console.log('test');
	let playerCoord = findPlayer(screen);
	//console.log(playerCoord);
	let pathFinder = new PathFinder(screen);
	let path = pathFinder.pathToClosestStarFrom(playerCoord);

	if (path.length > 0) {
		yield convertToCommand(playerCoord, path[0]);
	}
};

/*
let screen = [
	['#', '#', '#', '#', '#', '#', '#'],
	['#', ' ', ':', ':', ':', ' ', '#'],
	['#', ' ', '+', '+', ' ', ' ', '#'],
	['#', ' ', '+', ':', ' ', '#', '#'],
	['#', 'A', '+', '*', '+', '#', '#'],
	['#', '#', '#', '#', '#', '#', '#'],
];

let playerCoord = findPlayer(screen);
console.log(playerCoord);
let pathFinder = new PathFinder(screen);
let path = pathFinder.pathToClosestStarFrom(playerCoord);
console.log(path);
if (path.length > 0) {
	console.log(convertToCommand(playerCoord, path[0]));
}
*/
