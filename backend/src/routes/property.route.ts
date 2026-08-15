import { PropertyService } from "../services/property.service.ts";
import type { GetPropertiesInAreaResponse } from "../types/property/Property.type.ts";
import {
	isValidCoordinateBounds,
	parseCoordinate,
} from "../util/property.util.ts";

/**
 * GET : get properties in area
 * @param req
 * @param res
 * @param next
 * @returns
 */
export async function getPropertiesInArea(req: any, res: any, next: any) {
	// console.log("req", req.query);
	const minLon = parseCoordinate(req.query.minLon as string | undefined);
	const minLat = parseCoordinate(req.query.minLat as string | undefined);
	const maxLon = parseCoordinate(req.query.maxLon as string | undefined);
	const maxLat = parseCoordinate(req.query.maxLat as string | undefined);

	if (!isValidCoordinateBounds(minLon, minLat, maxLon, maxLat)) {
		res.status(400).json({
			error: "Invalid bounds. Provide minLon, minLat, maxLon, maxLat with valid ranges and min < max.",
		});
		return;
	}

	let result: GetPropertiesInAreaResponse | null = null;

	try {
		const propService = new PropertyService();

		result = await propService.getPropertiesInArea({
			minLon,
			minLat,
			maxLon,
			maxLat,
		});
	} catch (error) {
		console.error("Error fetching properties in area:", error);
		res.status(500).json({ error: "Failed to fetch properties." });
	}

	res.status(200).json(result);
}

/**
 * POST - add property using shape
 *  - FE will send the shape data in the request body
 */
export async function addPropertyUsingShape(req: any, res: any, next: any) {
	let result: any = {
		property: null,
		message: "Property added successfully",
	};

	res.status(200).json(result);
}
