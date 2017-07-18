const PathFinder = require('../src/PathFinder.js');

QUnit.module('PathFinder');

QUnit.test('isCoordInList()', function(assert){
	let list = [
		[0, 0],
		[1, 1],
		[2, 2]
	];

	assert.ok(PathFinder.isCoordInList([0, 0], list));
	assert.ok(PathFinder.isCoordInList([1, 1], list));
	assert.notOk(PathFinder.isCoordInList([1, 0], list));
});

QUnit.test('expandNode()', function(assert){
	let screen = [
		['#', '#', '#', ':'],
		['#', 'A', '*', '#'],
		['#', '#', '#', '#']
	];
	let pathFinder = new PathFinder(screen);
	let node = {
		coord: [1, 3],
		distance: 0,
		parent: null
	};

	assert.deepEqual(pathFinder.expandNode(node), [
	{
		coord: [1, 2],
		distance: 1,
		parent: node,
	},
	{
		coord: [0, 3],
		distance: 1,
		parent: node
	}
	]);
});

QUnit.test('searchClosestStarNodeTo()', function(assert){
	let screen = [
		['#', '#', '#', '#'],
		['#', 'A', '*', '#'],
		['#', '#', '#', '#']
	];
	let pathFinder = new PathFinder(screen);
	let node = pathFinder.searchClosestStarNodeTo([1, 1]);

	assert.deepEqual(node, {
		coord: [1, 2],
		distance: 1,
		parent: {
			coord: [1, 1],
			distance: 0,
			parent: null
		}
	});
});

QUnit.test('pathToClosestStarFrom()', function(assert){
	let screen = [
		['#', '#', '#', '#', '#', '#', '#'],
		['#', ' ', ':', ':', ':', ' ', '#'],
		['#', ' ', '+', '+', ' ', ' ', '#'],
		['#', ' ', '+', ':', ' ', '#', '#'],
		['#', 'A', '+', '*', '+', '#', '#'],
		['#', '#', '#', '#', '#', '#', '#'],
	];
	let pathFinder = new PathFinder(screen);
	let path = pathFinder.pathToClosestStarFrom([4, 1]);

	assert.deepEqual(path, [
		[3, 1],
		[2, 1],
		[1, 1],
		[1, 2],
		[1, 3],
		[1, 4],
		[2, 4],
		[3, 4],
		[3, 3],
		[4, 3]
	]);
});
