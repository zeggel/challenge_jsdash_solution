const PriorityQueue = require('./PriorityQueue.js');

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

module.exports = PathFinder;
