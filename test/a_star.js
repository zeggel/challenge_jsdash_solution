const AStar = require('../src/a_star.js');

QUnit.module('a_star');

QUnit.test('distance(): same points', function(assert){
	let start = [0, 0];
	let finish = [0, 0];

	assert.equal(AStar.distance(start, finish), 0);
});

QUnit.test('distance(): straight next point', function(assert){
	let start = [0, 1];
	let finish = [0, 0];

	assert.equal(AStar.distance(start, finish), 1);
});

QUnit.test('distance(): diagonal next point', function(assert){
	let start = [1, 1];
	let finish = [0, 0];

	assert.equal(AStar.distance(start, finish), 2);
});

QUnit.test('distance()', function(assert){
	let start = [5, 7];
	let finish = [3, 5];

	assert.equal(AStar.distance(start, finish), 4);
});

QUnit.test('findPath(): same point', function(assert){
	let screen = [];
	let start = [1, 1];
	let finish = [1, 1];
	let expected = [];

	assert.deepEqual(AStar.findPath(start, finish, screen), expected);
});

QUnit.test('findPath(): straight next point', function(assert){
	let screen = [];
	let start = [1, 1];
	let finish = [2, 1];
	let expected = [2, 1];

	assert.deepEqual(AStar.findPath(start, finish, screen), expected);
});
