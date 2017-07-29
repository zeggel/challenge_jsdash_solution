class World {
	constructor(map) {
		this.map = map;
		this.playerPosition = null;
		this.starPositions = [];
		this.flyPositions = [];
		this.initPositions();
		this.markDangerPositions();
	}

	initPositions() {
		for (let row = 0; row < this.map.length; ++row) {
			for (let col = 0; col < this.map[0].length; ++col) {
				let object = this.map[row][col];
				switch (object) {
					case 'A':
						this.playerPosition = [row, col];
						break;
					case '*':
						this.starPositions.push([row, col]);
						break;
					case '/':
						this.flyPositions.push([row, col]);
						break;
				}
			}
		}
	}

	markDangerPositions() {
		let fallableThings = ['*', 'O'];
		for (let row = 2; row < this.map.length - 1; ++row) {
			for (let col = 1; col < this.map[0].length - 1; ++col) {
				let isSpacePosition = this.getObjectByPosition([row, col]) === ' ';
				let isFallableAbove = fallableThings.indexOf(this.getObjectByPosition([row - 1, col])) >= 0;
				if (isSpacePosition && isFallableAbove) {
					this.map[row] = this.map[row].substr(0, col) + 'D' + this.map[row].substr(col + 1);
				}
			}
		}
	}

	getPlayerPosition() {
		return this.playerPosition;
	}

	getStarPositions() {
		return this.starPositions;
	}

	getFlyPositions() {
		return this.flyPositions;
	}

	getObjectByPosition(position) {
		if (this.map[position[0]] === undefined) {
			return undefined;
		}
		return this.map[position[0]][position[1]];
	}

	calcDistance(from, to) {
		return Math.abs(from[0] - to[0]) + Math.abs(from[1] - to[1]);
	}

	findClosestPosition(position, targetPositions) {
		if (targetPositions.length === 0) {
			return null;
		}

		let minPosition = null;
		let minDistance = null;
		for (let i = 0; i < targetPositions.length; ++i) {
			let targetPosition = targetPositions[i];
			let distance = this.calcDistance(position, targetPosition);
			if (minDistance === null || distance < minDistance) {
				minDistance = distance;
				minPosition = targetPosition;
			}
		}

		return minPosition;
	}

	findClosestStar() {
		return this.findClosestPosition(this.playerPosition, this.starPositions);
	}
}

module.exports = World;