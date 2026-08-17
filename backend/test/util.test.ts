import assert from "node:assert/strict";
import test from "node:test";

function add(a: number, b: number): number {
	return a + b;
}

test("add returns the sum of two numbers", () => {
	assert.equal(add(2, 3), 5);
});
