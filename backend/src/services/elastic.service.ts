import { Client } from "@elastic/elasticsearch";
import type {
	ES_GeoShapeData,
	ES_PropertyItem,
	ES_PropertyResponseItem,
} from "../types/property/PropertyResponse.type.ts";
import { convertPointToLatLon } from "../util/conversion.util.ts";
import type {
	AreaBounds,
	GeoJsonPolygon,
} from "../types/property/Property.type.ts";
import { generateRandomStrForId } from "../util/random.util.ts";

export class ElasticService {
	private client: Client;
	private indexName: string;
	private searchSize: number = 10; // default search size

	constructor() {
		this.client = new Client({
			node: process.env.ELASTICSEARCH_URL || "http://localhost:9200",
		});
		this.indexName = process.env.ELASTICSEARCH_INDEX || "properties";
	}

	// make sure the index exists before indexing a document
	private async ensureIndex(): Promise<void> {
		const exists = await this.client.indices.exists({
			index: this.indexName,
		});

		if (!exists) {
			await this.client.indices.create({
				index: this.indexName,
				mappings: {
					properties: {
						title: {
							type: "text",
							fields: {
								keyword: { type: "keyword", ignore_above: 256 },
							},
						},
						type: { type: "keyword" },
						price: { type: "long" },
						created_at: { type: "date" },
						boundary: { type: "geo_shape" }, // store the full boundary as a geo_shape for Elasticsearch
						location: { type: "geo_point" }, // store the first coordinate point as a geo_point for Elasticsearch
					},
				},
			});
		}
	}

	// index a property document in Elasticsearch
	public async indexProperty(
		property: ES_PropertyResponseItem,
	): Promise<void> {
		// coordinates are in British National Grid, need to convert to lat/lon for Elasticsearch
		const polygonCoordinates = property.geometry.coordinates[0].map(
			([x, y]) => {
				const [lat, lon] = convertPointToLatLon(x, y);
				return [lon, lat] as [number, number];
			},
		);

		// prepare the document to be indexed
		const prop: ES_PropertyItem = {
			id: property.properties.inspireId.toString(),
			title: property.properties.label,
			type: "property",
			price: property.properties.nationalCadastralReference,
			created_at: property.properties.validFrom,
			boundary: {
				type: "Polygon",
				coordinates: [polygonCoordinates],
			},
			location: {
				// lat is calculated as the average of all latitudes in the polygon
				lat:
					polygonCoordinates.reduce((sum, [, lat]) => sum + lat, 0) /
					polygonCoordinates.length,
				// lng is calculated as the average of all longitudes in the polygon
				lon:
					polygonCoordinates.reduce((sum, [lon]) => sum + lon, 0) /
					polygonCoordinates.length,
			},
		};

		// make sure the index exists before indexing the document
		await this.ensureIndex();

		await this.client.index({
			index: this.indexName,
			id: prop.id,
			document: prop,
		});
	}

	// index using the GeoJsonPolygon shape data provided by the FE
	public async indexPropertyUsingShape(
		shapeData: ES_GeoShapeData,
	): Promise<void> {
		let esCoordinates: number[][][] = [];

		esCoordinates = [
			shapeData.coordinates.map((coord) => [coord.lng, coord.lat]),
		];

		// prepare the document to be indexed
		const prop: ES_PropertyItem = {
			id: generateRandomStrForId(16), // generate a random ID for the property
			title: shapeData.title,
			type: "property",
			price: shapeData.price ?? 0,
			created_at: new Date().toISOString(),
			boundary: {
				type: "Polygon",
				coordinates: esCoordinates,
			},
			// location is a point that represents the centroid of the polygon,
			// calculated as the average of all coordinates
			location: {
				lat: shapeData.coordinates[0].lat,
				lon: shapeData.coordinates[0].lng,
			},
		};

		// make sure the index exists before indexing the document
		await this.ensureIndex();

		await this.client.index({
			index: this.indexName,
			id: prop.id,
			document: prop,
		});
	}

	// search for properties in Elasticsearch based on a query
	public async getProperties(area: AreaBounds): Promise<any> {
		// build the query for Elasticsearch based on the area bounds
		const query =
			area &&
			// check if all bounds are finite numbers
			// - protects against invalid or missing values
			Number.isFinite(area.minLat) &&
			Number.isFinite(area.maxLat) &&
			Number.isFinite(area.minLon) &&
			Number.isFinite(area.maxLon)
				? {
						bool: {
							filter: [
								{
									geo_bounding_box: {
										location: {
											top_left: {
												lat: area.maxLat,
												lon: area.minLon,
											},
											bottom_right: {
												lat: area.minLat,
												lon: area.maxLon,
											},
										},
									},
								},
							],
						},
					}
				: {
						match_all: {}, // else get all properties if no valid area bounds are provided
					};

		const response = await this.client.search({
			index: this.indexName,
			query: query,
			size: this.searchSize,
			track_total_hits: true,
		});

		return response.hits.hits.map((hit) => hit._source);
	}

	/**
	 * Search for a property by its title in Elasticsearch.
	 * @param title Name of the property
	 * @param fuzzy Boolean flag
	 * @returns
	 */
	public async getPropertyByName(
		title: string,
		size?: number,
		fuzzy?: boolean,
	): Promise<any> {
		const response = await this.client.search({
			index: this.indexName,
			query: {
				match: {
					title: {
						query: title,
						fuzziness: fuzzy ? "AUTO" : "0",
					},
				},
			},
			size: size ?? 100,
		});

		return response.hits.hits.map((hit) => hit._source);
	}

	// change search size for getProperties method
	public setSearchSize(size: number): void {
		this.searchSize = size;
	}

	// get search size if needed
	public getSearchSize(): number {
		return this.searchSize;
	}
}
