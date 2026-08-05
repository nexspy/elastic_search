import type { Pool } from "pg";
import type {
	AreaBounds,
	GetPropertiesInAreaResponse,
} from "../types/property/Property.type.ts";

export class PropertyService {
	/**
	 * Get properties within the specified area bounds.
	 * @param area AreaBounds
	 * @param pool Pool
	 * @returns
	 */
	public async getPropertiesInArea(
		area: AreaBounds,
	): Promise<GetPropertiesInAreaResponse> {
		//TODO : replace by data from elasticsearch
		return {
			bounds: {
				minLon: area.minLon,
				minLat: area.minLat,
				maxLon: area.maxLon,
				maxLat: area.maxLat,
			},
			count: 2,
			properties: [
				// add dummy data in type of PropertyInAreaItem
				{
					id: "1",
					property_code: "P001",
					title: "Property 1",
					owner_name: "Owner 1",
					property_type: "residential",
					bedrooms: 3,
					listed_price: "100000",
					plot_geojson: {
						type: "Polygon",
						coordinates: [
							[
								[0, 0],
								[0, 1],
								[1, 1],
								[1, 0],
								[0, 0],
							],
						],
					},
					centroid_geojson: {
						type: "Point",
						coordinates: [0.5, 0.5],
					},
				},
				{
					id: "2",
					property_code: "P002",
					title: "Property 2",
					owner_name: "Owner 2",
					property_type: "commercial",
					bedrooms: null,
					listed_price: "200000",
					plot_geojson: {
						type: "Polygon",
						coordinates: [
							[
								[1, 1],
								[1, 2],
								[2, 2],
								[2, 1],
								[1, 1],
							],
						],
					},
					centroid_geojson: {
						type: "Point",
						coordinates: [1.5, 1.5],
					},
				},
			],
		};
	}
}
