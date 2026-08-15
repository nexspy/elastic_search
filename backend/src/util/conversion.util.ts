import proj4 from "proj4";
import type { PropertyInAreaItem } from "../types/property/Property.type.ts";
import type { ES_PropertyItem } from "../types/property/PropertyResponse.type.ts";

/**
 * Convert British National Grid coordinates (easting, northing) to latitude and longitude.
 * @param easting
 * @param northing
 * @param forElasticSearch If true, returns coordinates in [lon, lat] order for Elasticsearch; otherwise returns [lat, lon].
 * @returns
 */
export const convertBritishToLatLon = (
	easting: number,
	northing: number,
	forElasticSearch: boolean = false,
): [number, number] => {
	const britishNationalGrid =
		"+proj=tmerc +lat_0=49 +lon_0=-2 +k=0.9996012717 +x_0=400000 +y_0=-100000 +ellps=airy +datum=OSGB36 +units=m +no_defs";
	const wgs84 = "+proj=longlat +datum=WGS84 +no_defs";

	// Convert the coordinates using proj4
	const [lon, lat] = proj4(britishNationalGrid, wgs84, [easting, northing]);

	if (forElasticSearch) {
		// Swap lat and lon for Elasticsearch
		return [lon, lat];
	}

	return [lat, lon];
};

/**
 * Convert the coordinates of a property from British National Grid to latitude and longitude.
 * @param property
 * @returns
 */
export const convertPropertyCoordinates = (
	property: ES_PropertyItem,
): ES_PropertyItem => {
	let coordinates: number[][] = [];

	if (
		"boundary" in property &&
		property.boundary &&
		property.boundary.coordinates
	) {
		// property.boundary.coordinates[0][0][lat, lon]
		coordinates = property.boundary.coordinates[0].map(
			(coord: ES_PropertyItem["boundary"]["coordinates"][0][0]) => {
				// const [lat, lon] = convertBritishToLatLon(coord[0], coord[1]);
				const lat = coord[1];
				const lon = coord[0];
				return [lat, lon];
			},
		);
	}

	return {
		...property,
		boundary: {
			...property.boundary,
			coordinates: [coordinates],
		},
	} as ES_PropertyItem;
};

/**
 * Convert British points to latitude and longitude value
 * @param valueA
 * @param valueB
 * @returns
 */
export const convertPointToLatLon = (
	valueA: number,
	valueB: number,
): [number, number] => {
	const [lat, lon] = convertBritishToLatLon(valueA, valueB);
	return [lat, lon];
};
