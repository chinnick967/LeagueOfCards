const Interval = require('../../server/Interval');


describe('Unit: Interval', () => {
	it('should be instantiated', () => {
		var test = new Interval(() => {}, 100);
	   expect(test instanceof Interval).toEqual(true);
	});

	it ('should be stoppable', function (done) {
		var callcount = 0;
		var timer = new Interval(() => {
			callcount++;
		}, 15);
		timer.start();
		setTimeout(() => {
		    timer.stop();
			setTimeout(() => {
				expect(callcount).toEqual(3);
				done();
			}, 25);
		}, 50);
	});

	it ('should be startable', function (done) {
		var timer = new Interval (() => {
			done();
		}, 100);
		timer.start();
	});

	it ('should be pausable', function (done) {
		var timer = new Interval(() => {
		    done.fail('Timer should not run');
		}, 100);
		timer.start();
		timer.pause();
		setTimeout(done, 150);
	});

	it ('should be continuable', function (done) {
		var callCount = 0;
		var timer = new Interval(() => {
			callCount++;
		}, 200);
		setTimeout(() => {
			timer.pause();
			setTimeout(() => {
			    timer.continue();
			}, 50);

			setTimeout(() => {
				expect(callCount).toEqual(1);
				done();
			}, 250);
		}, 50);
	});
});