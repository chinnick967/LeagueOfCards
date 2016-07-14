const EventEmitter = require('../../../../src/Engine/EventEmitter/EventEmitter');

describe('Unit: EventEmitter', () => {
	var event;
	var fn;
	beforeEach(() => {
		fn = () => {};
		event = new EventEmitter();
	});

	it ('should be instantiated', () => {
		expect(event instanceof EventEmitter).toEqual(true);
	});

	describe('on', () => {
		it ('should add callback to event queue', () => {
			event.on('test', fn);
			expect(event.events.test[0]).toEqual(fn);
		});

		it ('should return a function to remove function', () => {
			spyOn(event, 'off');
			var off = event.on('test', fn);
			off();
			expect(event.off).toHaveBeenCalledWith('test', fn);
		});
	});

	describe('off', () => {
		it ('should remove callback from event queue', () => {
			event.on('test', fn);
			expect(event.events.test.length).toEqual(1);
			event.off('test', fn);
			expect(event.events.test.length).toEqual(0);
		});
	});

	describe('emit', () => {
		it ('should fire events with provided arguments', (done) => {
			event.on('test', function () {
				expect([].slice.call(arguments)).toEqual([1, 2, 3, 4, 5, 6]);
				done();
			});
			event.emit('test', 1, 2, 3, 4, 5, 6);
		});
	});

	describe('clear', () => {
		it ('should remove all events', () => {
			event.on('test', fn);
			event.on('test2', fn);
			expect(Object.keys(event.events)).toEqual(['test', 'test2']);
			event.clear();
			expect(Object.keys(event.events)).toEqual([]);
		});
	});
});