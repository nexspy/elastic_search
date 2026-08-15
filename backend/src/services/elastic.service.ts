import { Client } from "@elastic/elasticsearch";
import type {
	ES_PropertyItem,
	ES_PropertyResponseItem,
} from "../types/property/PropertyResponse.type.ts";
import { convertPointToLatLon } from "../util/conversion.util.ts";

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
				lat:
					polygonCoordinates.reduce((sum, [, lat]) => sum + lat, 0) /
					polygonCoordinates.length,
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

	// search for properties in Elasticsearch based on a query
	public async getProperties(): Promise<any> {
		const response = await this.client.search({
			index: this.indexName,
			query: {
				match_all: {},
			},
			size: this.searchSize,
			track_total_hits: true,
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
