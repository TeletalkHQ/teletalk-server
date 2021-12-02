const asyncIterable = [1, 2, 3];

asyncIterable[Symbol.asyncIterator] = async function* ss() {
	for (let i = 0; i < asyncIterable.length; i++) {
		yield { value: asyncIterable[i], done: false };
	}
	yield { done: true };
};

(async function () {
	for await (const part of asyncIterable) {
		console.log(part);
	}
})();
