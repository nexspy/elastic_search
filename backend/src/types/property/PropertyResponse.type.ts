export type PropertyResponseItem = {
	properties: {
		inspireId: number;
		label: string;
		nationalCadastralReference: number;
		validFrom: Date;
	};
	geometry: {
		type: string;
		coordinates: number[][][];
	};
};

export type PropertyResponse = PropertyResponseItem[];

export type GMLResponse = {
	filename: string;
	extension: string;
	mimetype: string;
	size: number;
};

// Elastic document representation of a property, used for indexing in Elasticsearch
export type PropertyDocument = {
	id?: string;
	title: string;
	type: string;
	price: number;
	created_at: string | Date;
	boundary: { type: "Polygon"; coordinates: number[][][] }; // store the full boundary as a geo_shape for Elasticsearch
	location: { lat: number; lon: number }; // safer than [lon, lat] array
};
