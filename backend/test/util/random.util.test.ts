// Test random property name generation
import test from "node:test";
import assert from "node:assert/strict";

import { generateRandomPropertyName } from "../../src/util/random.util.ts";

test("generateRandomPropertyName generates a random property name of the specified length", () => {
	const length = 10;
	const propertyName = generateRandomPropertyName(length);
	assert.equal(propertyName.length, length);
});

test("generateRandomPropertyName generates a random property name with a space when withSpace is true", () => {
	const length = 10;
	const propertyName = generateRandomPropertyName(length, true);
	assert.equal(propertyName.length, length + 1); // 1 for underscore, 1 for space
	assert.equal(propertyName.endsWith(" "), true);
});
