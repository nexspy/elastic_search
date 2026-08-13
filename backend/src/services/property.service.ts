import type { Pool } from "pg";
import type {
	AreaBounds,
	GetPropertiesInAreaResponse,
	PropertyInAreaItem,
} from "../types/property/Property.type.ts";
import { convertPropertyCoordinates } from "../util/conversion.util.ts";
import { ElasticService } from "./elastic.service.ts";

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
		let convertedProperties: PropertyInAreaItem[] = [];

		// find properties from elasticsearch
		const elasticService = new ElasticService();
		await elasticService
			.getProperties()
			.then((properties) => {
				console.log("🚀 Properties from Elasticsearch:", properties);
				// convert properties to PropertyInAreaItem type and log them
				convertedProperties = properties.map((property: any) =>
					convertPropertyCoordinates(property),
				);
				console.log("🚀 Converted Properties:", convertedProperties);
			})
			.catch((error) => {
				console.error(
					"Error fetching properties from Elasticsearch:",
					error,
				);
			});

		return {
			bounds: {
				minLon: area.minLon,
				minLat: area.minLat,
				maxLon: area.maxLon,
				maxLat: area.maxLat,
			},
			count: convertedProperties.length,
			properties: convertedProperties,
		};
	}
}
