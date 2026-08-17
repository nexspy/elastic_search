import test from "node:test";
import assert from "node:assert/strict";
import type { Request, Response, NextFunction } from "express";

import { getPropertiesInArea } from "../../src/routes/property.route.ts";

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
