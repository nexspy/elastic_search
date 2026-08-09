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
			count: 1,
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
							[530716.35, 182789.85],
							[530719, 182782.5],
							[530720.45, 182778.5],
							[530722.8, 182771.95],
							[530722.9, 182771.7],
							[530723.35, 182770.35],
							[530728.25, 182772.2],
							[530734.25, 182774.35],
							[530734.7, 182774.5],
							[530737.8, 182775.7],
							[530736.6, 182776.7],
							[530726.9, 182785.3],
							[530720.1, 182791.25],
							[530716.35, 182789.85],
						],
					},
					centroid_geojson: {
						type: "Point",
						coordinates: [0.5, 0.5],
					},
				},
			],
		};
	}
}
