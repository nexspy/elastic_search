import { PropertyInAreaItem, PropertyMapItem } from "../types/Property.type";

export const convertPropertyInAreaItemToPropertyViewType = (
	property: PropertyInAreaItem,
): PropertyMapItem => {
	const positions: [number, number][] = [];

	property.plot_geojson.coordinates.forEach((latlngs: any) => {
		positions.push(latlngs);
	});

	return {
		label: property.title,
		color: "#3b82f6", // based on property type
		summary: "",
		positions,
	};
};
