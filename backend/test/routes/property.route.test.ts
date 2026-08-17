import test from "node:test";
import assert from "node:assert/strict";
import type { Request, Response, NextFunction } from "express";

import {
	getPropertiesInArea,
	getPropertyByName,
} from "../../src/routes/property.route.ts";
import { PropertyService } from "../../src/services/property.service.ts";

type MockBody = {
	body: unknown;
};

type MockHeaders = { headers: Record<string, unknown> };

type MockStatus = { statusCode: number };

function createMockRes() {
	const res = {
		statusCode: 200,
		headers: {} as Record<string, unknown>,
		body: undefined as unknown,
		status(code: number) {
			(this as MockStatus).statusCode = code;
			return this;
		},
		json(payload: unknown) {
			(this as MockBody).body = payload;
			return this;
		},
		setHeader(name: string, value: unknown) {
			(this as MockHeaders).headers[name] = value;
		},
		end(chunk?: string) {
			(this as MockBody).body = chunk;
			return this;
		},
	} as unknown as Response;

	return res;
}

test("getPropertiesInArea returns 200 with property data", async () => {
	const req = {
		query: {
			minLon: "-122.5",
			minLat: "37.7",
			maxLon: "-122.4",
			maxLat: "37.8",
		},
	} as unknown as Request;

	const res = createMockRes();
	const next = (() => {}) as NextFunction;

	// Call the getPropertiesInArea function with the mock request, response, and next function
	await getPropertiesInArea(req, res, next);

	assert.equal((res as any).statusCode, 200);
});

test("getPropertyByName returns empty array if no property found", async (t) => {
	const req = {
		query: {
			title: "NonExistentProperty",
		},
	} as unknown as Request;

	t.mock.method(
		PropertyService.prototype,
		"getPropertiesByName",
		async () => [], // Mock the service to return an empty array
	);

	const res = createMockRes();
	const next = (() => {}) as NextFunction;

	// Call the getPropertyByName function with the mock request, response, and next function
	await getPropertyByName(req, res, next);

	assert.equal((res as any).statusCode, 200);
	// console.log("res", res);
	assert.deepEqual((res as any).body, []);
});

test("getPropertyByName returns non empty array if property found", async (t) => {
	const req = {
		query: {
			title: "Beautiful House",
		},
	} as unknown as Request;

	const properties = [
		{
			id: "1",
			title: "Beautiful House",
			description: "A beautiful house with a garden.",
			price: 500000,
			location: { lat: 37.7749, lon: -122.4194 },
		},
	];
	t.mock.method(
		PropertyService.prototype,
		"getPropertiesByName",
		async () => properties as never, // Mock the service to return a non-empty array
	);

	const res = createMockRes();
	const next = (() => {}) as NextFunction;

	// Call the getPropertyByName function with the mock request, response, and next function
	await getPropertyByName(req, res, next);

	assert.equal((res as any).statusCode, 200);
	assert.deepEqual((res as any).body, properties);
});
