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
	while (true) {
		let playerCoord = findPlayer(screen);

		let pathFinder = new PathFinder(screen);
		let path = pathFinder.pathToClosestStarFrom(playerCoord);

		if (path.length > 0) {
			yield convertToCommand(playerCoord, path[0]);
		}
	}
};