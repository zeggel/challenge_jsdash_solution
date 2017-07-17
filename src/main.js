exports.findPlayer = (screen) => {
	for (let row = 1; row < screen.length; ++row) {
		for (let col = 1; col < screen.length; ++col) {
			if (screen[row][col] === 'A') {
				return [row, col];
			}
		}
	}

	throw "Can't find player";
};