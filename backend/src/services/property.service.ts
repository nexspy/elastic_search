import type { Pool } from "pg";
import type {
	AreaBounds,
	GetPropertiesInAreaResponse,
} from "../types/property/Property.type.ts";

export class PropertyService {
	private pool: Pool;

	constructor(pool: Pool) {
		this.pool = pool;
	}

	/**
	 * Get properties within the specified area bounds.
	 * @param area AreaBounds
	 * @param pool Pool
	 * @returns
	 */
	public async getPropertiesInArea(
		area: AreaBounds,
	): Promise<GetPropertiesInAreaResponse> {
		const result = await this.pool.query(
			`
			SELECT
				id,
				property_code,
				title,
				owner_name,
				property_type,
				bedrooms,
				listed_price,
				ST_AsGeoJSON(plot_geom)::json AS plot_geojson,
				ST_AsGeoJSON(centroid_geom)::json AS centroid_geojson
			FROM properties
			WHERE plot_geom && ST_MakeEnvelope($1, $2, $3, $4, 4326)
			  AND ST_Intersects(plot_geom, ST_MakeEnvelope($1, $2, $3, $4, 4326))
			ORDER BY id;
			`,
			[area.minLon, area.minLat, area.maxLon, area.maxLat],
		);

		return {
			bounds: {
				minLon: area.minLon,
				minLat: area.minLat,
				maxLon: area.maxLon,
				maxLat: area.maxLat,
			},
			count: result.rowCount,
			properties: result.rows,
		};
	}
}
