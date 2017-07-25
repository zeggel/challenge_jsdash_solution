const AStar = require('../src/AStar.js');
const World = require('../src/World.js');

QUnit.module('AStar');

let map = [
	['#', '#', '#', '#', '#'],
	['#', 'A', ':', '*', '#'],
	['#', ' ', '*', '/', '#'],
	['#', '*', '/', '#', '#'],
	['#', '#', '#', '#', '#']
];
let world = new World(map);

QUnit.test('isCoordInList()', function(assert){
	let list = [
		[0, 0],
		[1, 1],
		[2, 2]
	];

	assert.ok(AStar.isCoordInList([0, 0], list));
	assert.ok(AStar.isCoordInList([1, 1], list));
	assert.notOk(AStar.isCoordInList([1, 0], list));
});

QUnit.test('expandNode()', function(assert){
	let screen = [
		['#', '#', '#', ':'],
		['#', 'A', '*', '#'],
		['#', '#', '#', '#']
	];
	let world = new World(screen);
	let aStar = new AStar(world);
	let node = {
		coord: [1, 3],
		g: 0,
		h: 0,
		parent: null
	};

	assert.deepEqual(aStar.expandNode(node, [1, 1]), [
	{
		coord: [1, 2],
		g: 1,
		h: 1,
		parent: node,
	},
	{
		coord: [0, 3],
		g: 1,
		h: 3,
		parent: node
	}
	]);
});

QUnit.test('searchPathNode()', function(assert){
	let screen = [
		['#', '#', '#', '#'],
		['#', 'A', '*', '#'],
		['#', '#', '#', '#']
	];
	let aStar = new AStar(new World(screen));
	let node = aStar.searchPathNode([1, 1], [1, 2]);

	assert.deepEqual(node, {
		coord: [1, 2],
		g: 1,
		h: 0,
		parent: {
			coord: [1, 1],
			g: 0,
			h: 1,
			parent: null
		}
	});
});

QUnit.test('pathToClosestStar()', function(assert){
	let screen = [
		['#', '#', '#', '#', '#', '#', '#'],
		['#', ' ', ':', ':', ':', ' ', '#'],
		['#', ' ', '+', '+', ' ', ' ', '#'],
		['#', ' ', '+', ':', ' ', '#', '#'],
		['#', 'A', '+', '*', '+', '#', '#'],
		['#', '#', '#', '#', '#', '#', '#'],
	];
	let aStar = new AStar(new World(screen));
	let path = aStar.pathToClosestStar();

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

QUnit.test('pathToClosestStar(): cannot move', function(assert){
	let screen = [
		['#', '#', '#'],
		['#', 'A', '#'],
		['#', '#', '#'],
	];
	let aStar = new AStar(new World(screen));
	let path = aStar.pathToClosestStar();

	assert.deepEqual(path, []);
});

