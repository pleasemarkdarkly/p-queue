import test from "ava";
import PQueue from "../source";

test('Emit an event on task finished', async t => {
	const q = new PQueue({concurrency:1});
	const timeout = 200;
	const now = new Date();
	await new Promise(resolveTest => {
		q.add(async () => {
			return new Promise(r => setTimeout(() => r("response"), timeout));
		});
		q.on('promiseResolved', res => {
			t.is(res, "response");
			t.is(true, Math.abs(now.getTime() - new Date().getTime()) < timeout * 1.2);
			resolveTest();
		});

	});


});
