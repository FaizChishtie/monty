const { group, test, beforeStart, afterAll, expect } = require('corde');
// You can also import const corde = require("corde"); This is a default export with all others
// functions.
const { client, loginBot } = require('../../src');

beforeStart(() => {
	loginBot();
});

group('main commands', () => {
	test('ping command should return \'Pong!\'', () => {
		expect('ping').toReturn('Pong!');
	});
});

afterAll(() => {
	client.destroy();
});