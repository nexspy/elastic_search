import test from "node:test";
import assert from "node:assert/strict";
import { convertPropertyCoordinates } from "../../src/util/conversion.util.ts";
import type { ES_PropertyItem } from "../../src/types/property/PropertyResponse.type.ts";

test("convertPropertyCoordinates swaps coordinates from [lon, lat] to [lat, lon]", () => {
	const property: ES_PropertyItem = {
		id: "property-1",
		title: "Sample property",
		type: "residential",
		price: 250000,
		created_at: "2026-01-01",
		boundary: {
			type: "Polygon",
			coordinates: [
				[
					[100, 200],
					[110, 210],
					[120, 220],
				],
			],
		},
		location: {
			lat: 200,
			lon: 100,
		},
	};

	const result = convertPropertyCoordinates(property);

	assert.deepEqual(result.boundary.coordinates, [
		[
			[200, 100],
			[210, 110],
			[220, 120],
		],
	]);

	assert.equal(result.id, property.id);
	assert.equal(result.title, property.title);
});

test("convertPropertyCoordinates does not mutate the original property", () => {
	const property: ES_PropertyItem = {
		title: "Sample property",
		type: "residential",
		price: 250000,
		created_at: "2026-01-01",
		boundary: {
			type: "Polygon",
			coordinates: [
				[
					[100, 200],
					[110, 210],
				],
			],
		},
		location: {
			lat: 200,
			lon: 100,
		},
	};

	const originalCoordinates = structuredClone(property.boundary.coordinates);

	convertPropertyCoordinates(property);

	assert.deepEqual(property.boundary.coordinates, originalCoordinates);
});
