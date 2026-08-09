export type PropertyType = "residential" | "commercial" | "land";

export type AreaBounds = {
	minLon: number;
	minLat: number;
	maxLon: number;
	maxLat: number;
};

/**
 * Minimal GeoJSON shapes used by this project.
 */
export type GeoJsonPolygon = {
	type: "Polygon";
	coordinates: number[][];
};

export type GeoJsonPoint = {
	type: "Point";
	coordinates: [number, number];
};

/**
 * Full table shape for properties.
 * Notes:
 * - BIGSERIAL (id) is usually returned as string by pg.
 * - NUMERIC (listed_price) is usually returned as string by pg.
 * - created_at is typically parsed as string unless custom pg parsers are used.
 */
export type PropertyRow = {
	id: string;
	property_code: string;
	title: string;
	owner_name: string | null;
	property_type: PropertyType;
	bedrooms: number | null;
	listed_price: string | null;
	plot_geom: GeoJsonPolygon;
	plot_geog: GeoJsonPolygon;
	centroid_geom: GeoJsonPoint;
	created_at: string;
};

/**
 * Shape returned by your in-area query in service/route.
 */
export type PropertyInAreaItem = {
	id: string;
	property_code: string;
	title: string;
	owner_name: string | null;
	property_type: PropertyType;
	bedrooms: number | null;
	listed_price: string | null;
	plot_geojson: GeoJsonPolygon;
	centroid_geojson: GeoJsonPoint;
};

export type GetPropertiesInAreaResponse = {
	bounds: AreaBounds;
	count: number | null;
	properties: PropertyInAreaItem[];
};

/**
 * Input shape for creating a property (if you add POST later).
 * Excludes generated/default columns.
 */
export type CreatePropertyInput = {
	property_code: string;
	title: string;
	owner_name?: string | null;
	property_type: PropertyType;
	bedrooms?: number | null;
	listed_price?: string | number | null;
	plot_geom_wkt: string;
};
