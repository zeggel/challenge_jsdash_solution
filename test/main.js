const main = require('../src/main.js');

QUnit.module('main');

QUnit.test('findPlayer()', function(assert){
	const screen = [
		['#', '#', '#', '#'],
		['#', ' ', ' ', '#'],
		['#', 'A', ':', '#'],
		['#', '#', '#', '#']
	];
	assert.deepEqual(main.findPlayer(screen), [2, 1]);
});

QUnit.test('findPlayer() without player', function(assert) {
	const screen = [
		['#']
	];

	assert.throws(function(){
		findPlayer();
	});
});
