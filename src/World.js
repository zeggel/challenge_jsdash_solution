class World {
	constructor(map) {
		this.map = map;
		this.playerPosition = null;
		this.starPositions = [];
		this.flyPositions = [];
		this.initPositions();
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

	getPlayerPosition() {
		return this.playerPosition;
	}

	getStarPositions() {
		return this.starPositions;
	}

	getFlyPositions() {
		return this.flyPositions;
	}
}

module.exports = World;