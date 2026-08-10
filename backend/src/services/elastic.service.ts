import { Client } from "@elastic/elasticsearch";
import type { PropertyResponseItem } from "../types/property/PropertyResponse.type.ts";
import { convertPointToLatLon } from "../util/conversion.util.ts";

type PropertyDocument = {
	id?: string;
	title: string;
	type: string;
	price: number;
	created_at: string | Date;
	location: { lat: number; lon: number }; // safer than [lon, lat] array
};

export class ElasticService {
	private client: Client;
	private indexName: string;

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
						location: { type: "geo_point" },
					},
				},
			});
		}
	}

	// index a property document in Elasticsearch
	public async indexProperty(property: PropertyResponseItem): Promise<void> {
		// coordinates are in British National Grid, need to convert to lat/lon for Elasticsearch
		const convertedCoordinates = convertPointToLatLon(
			property.geometry.coordinates[0][0][0],
			property.geometry.coordinates[0][0][1],
		);

		// prepare the document to be indexed
		const prop: PropertyDocument = {
			id: property.properties.inspireId.toString(),
			title: property.properties.label,
			type: "property",
			price: property.properties.nationalCadastralReference,
			created_at: property.properties.validFrom,
			location: {
				// store the first coordinate point as a geo_point for Elasticsearch
				lat: convertedCoordinates[0],
				lon: convertedCoordinates[1],
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
		});

		return response.hits.hits.map((hit) => hit._source);
	}
}
