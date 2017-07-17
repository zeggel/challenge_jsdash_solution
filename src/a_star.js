let AStar = {
	findPath: (start, finish, screen) => {
		if (start[0] === finish[0] && start[1] === finish[1]) {
			return [];
		}

		return [];
	},
	distance: (start, finish) => {
		let dX = Math.abs(start[0] - finish[0]);
		let dY = Math.abs(start[1] - finish[1]);

		return dX + dY;
	}
};

module.exports = AStar;
