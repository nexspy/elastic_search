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
