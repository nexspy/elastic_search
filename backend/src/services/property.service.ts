import type { Pool } from "pg";
import type {
	AreaBounds,
	GetPropertiesInAreaResponse,
} from "../types/property/Property.type.ts";
import { convertPropertyCoordinates } from "../util/conversion.util.ts";
import { ElasticService } from "./elastic.service.ts";
import type { ES_PropertyItem } from "../types/property/PropertyResponse.type.ts";

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
		let convertedProperties: ES_PropertyItem[] = [];

		// find properties from elasticsearch
		const elasticService = new ElasticService();
		elasticService.setSearchSize(1000); // set search size to 1000 for this query
		await elasticService
			.getProperties(area)
			.then((properties) => {
				// convert properties to PropertyInAreaItem type and log them
				convertedProperties = properties.map(
					(property: ES_PropertyItem, index: number) => {
						// each polygon coordinates are in property.boundary.coordinates[0][0][lat, lon]
						return convertPropertyCoordinates(property);
					},
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
