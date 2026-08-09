import type { Pool } from "pg";
import type {
	AreaBounds,
	GetPropertiesInAreaResponse,
	PropertyInAreaItem,
} from "../types/property/Property.type.ts";
import { convertPropertyCoordinates } from "../util/conversion.util.ts";

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

		// add dummy data in type of PropertyInAreaItem
		const propertyA: PropertyInAreaItem = {
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
		};

		const propertyB: PropertyInAreaItem = {
			id: "2",
			property_code: "P002",

			title: "Property 2",
			owner_name: "Owner 2",
			property_type: "commercial",
			bedrooms: null,
			listed_price: "200000",
			plot_geojson: {
				type: "Polygon",
				coordinates: [
					[530742.15, 182701.45],
					[530742.7, 182699.85],
					[530742.8, 182699.55],
					[530746.9, 182688.5],
					[530748.95, 182682.9],
					[530752.732, 182684.324],
					[530753.5, 182684.6],
					[530751.5, 182690.1],
					[530751.45, 182690.3],
					[530747.4, 182701.55],
					[530746.85, 182703.2],
					[530743.7, 182702.1],
					[530742.15, 182701.45],
				],
			},
			centroid_geojson: {
				type: "Point",
				coordinates: [0.6, 0.6],
			},
		};

		const propertyC: PropertyInAreaItem = {
			id: "3",
			property_code: "P003",
			title: "Property 3",
			owner_name: "Owner 3",
			property_type: "residential",
			bedrooms: 4,
			listed_price: "150000",
			plot_geojson: {
				type: "Polygon",
				coordinates: [
					[530741.4, 182747.3],
					[530742.95, 182742.05],
					[530748.55, 182744.1],
					[530748.041, 182745.552],
					[530746.55, 182749.8],
					[530746.1, 182750.95],
					[530742.7, 182760.35],
					[530742.1, 182761.9],
					[530741.089, 182764.355],
					[530735.929, 182762.461],
					[530736.75, 182759.9],
					[530737.4, 182758.4],
					[530740.7, 182749.15],
					[530741.4, 182747.3],
				],
			},
			centroid_geojson: {
				type: "Point",
				coordinates: [0.7, 0.7],
			},
		};

		const propertyD: PropertyInAreaItem = {
			id: "4",
			property_code: "P004",
			title: "Property 4",
			owner_name: "Owner 4",
			property_type: "commercial",
			bedrooms: null,
			listed_price: "300000",
			plot_geojson: {
				type: "Polygon",
				coordinates: [
					[530727.6, 182799.65],
					[530728.7, 182796.45],
					[530728.85, 182796.3],
					[530742.7, 182784.25],
					[530747.05, 182780.4],
					[530748.1, 182779.55],
					[530751.8, 182781.05],
					[530751.9, 182781.1],
					[530752.2, 182781.15],
					[530752.35, 182781.2],
					[530751.9, 182782.35],
					[530751.75, 182782.75],
					[530751.4, 182783.5],
					[530751.15, 182783.9],
					[530751, 182784.3],
					[530750.6, 182784.95],
					[530750.2, 182785.65],
					[530749.8, 182786.45],
					[530749.3, 182787.15],
					[530748.9, 182787.9],
					[530748.6, 182788.4],
					[530748.35, 182788.85],
					[530747.75, 182790.05],
					[530747.3, 182791.25],
					[530748.9, 182791.8],
					[530746.9, 182797.3],
					[530745.8, 182800.5],
					[530740.65, 182798.6],
					[530738.8, 182803.75],
					[530734.35, 182802.15],
					[530729.65, 182800.4],
					[530727.6, 182799.65],
				],
			},
			centroid_geojson: {
				type: "Point",
				coordinates: [0.8, 0.8],
			},
		};

		// property in different area (Canterbury)
		const propertyE: PropertyInAreaItem = {
			id: "5",
			property_code: "P005",
			title: "Canterbury Property 1",
			owner_name: "Owner 5",
			property_type: "residential",
			bedrooms: 2,
			listed_price: "120000",
			plot_geojson: {
				type: "Polygon",
				coordinates: [
					[623967.16, 158404.34],
					[623972.493, 158402.905],
					[623977.827, 158401.47],
					[623984.482, 158399.707],
					[623989.802, 158395.957],
					[623995.121, 158392.207],
					[624002.873, 158389.013],
					[624010.625, 158385.819],
					[624018.378, 158382.626],
					[624026.13, 158379.433],
					[624033.883, 158376.239],
					[624036.702, 158383.087],
					[624040.322, 158391.79],
					[624043.943, 158400.494],
					[624037.337, 158404.749],
					[624030.731, 158409.005],
					[624025.641, 158415.664],
					[624020.401, 158418.903],
					[624015.161, 158422.142],
					[624009.548, 158425.545],
					[624003.755, 158428.27],
					[623997.386, 158428.432],
					[623989.16, 158427.64],
					[623988.56, 158425.74],
					[623987.742, 158424.104],
					[623987.717, 158424.054],
					[623987.66, 158423.94],
					[623986.16, 158421.54],
					[623984.46, 158419.34],
					[623982.66, 158417.24],
					[623980.76, 158415.24],
					[623980.744, 158415.225],
					[623980.517, 158415.02],
					[623978.66, 158413.34],
					[623976.86, 158411.64],
					[623976.56, 158411.44],
					[623972.98, 158408.51],
					[623970.46, 158406.64],
					[623969.61, 158406.05],
					[623967.16, 158404.34],
				],
			},
			centroid_geojson: {
				type: "Point",
				coordinates: [0.9, 0.9],
			},
		};

		return {
			bounds: {
				minLon: area.minLon,
				minLat: area.minLat,
				maxLon: area.maxLon,
				maxLat: area.maxLat,
			},
			count: 4,
			properties: [
				convertPropertyCoordinates(propertyA),
				convertPropertyCoordinates(propertyB),
				convertPropertyCoordinates(propertyC),
				convertPropertyCoordinates(propertyD),
				convertPropertyCoordinates(propertyE),
			],
		};
	}
}
