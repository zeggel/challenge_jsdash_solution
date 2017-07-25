const World = require('../src/World.js');

QUnit.module('World');

let map = [
	['#', '#', '#', '#', '#'],
	['#', 'A', ':', '*', '#'],
	['#', ' ', '*', '/', '#'],
	['#', '*', '/', '#', '#'],
	['#', '#', '#', '#', '#']
];
let world = new World(map);

QUnit.test('getPlayerPosition()', function(assert){
	assert.deepEqual(world.getPlayerPosition(), [1, 1]);
});

QUnit.test('getStarPositions()', function(assert){
	assert.deepEqual(world.getStarPositions(), [
		[1, 3],
		[2, 2],
		[3, 1]
	]);
});

QUnit.test('getFlyPositions()', function(assert){
	assert.deepEqual(world.getFlyPositions(), [
		[2, 3],
		[3, 2]
	]);
});

QUnit.test('calcDistance()', function(assert){
	assert.equal(world.calcDistance([3, 1], [1, 3]), 4);
});

QUnit.test('findClosestStar()', function(assert){
	assert.deepEqual(world.findClosestStar(), [1, 3]);
});
