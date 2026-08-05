import { LatLngExpression } from "leaflet";

export type MarkerType = {
	id: string;
	position: LatLngExpression;
	location: {
		lat: number;
		lng: number;
	};
	icon: L.Icon;
	info?: string;
};
