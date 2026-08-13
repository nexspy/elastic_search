import { useMap } from "react-leaflet";
import { useEffect } from "react";

const MapReadyLogger = ({
	onMapLoaded,
}: {
	onMapLoaded: (
		center: [number, number],
		zoom: number,
		bounds: string,
	) => void;
}) => {
	const map = useMap();

	useEffect(() => {
		if (!map) return;

		const center = map.getCenter();
		const zoom = map.getZoom();
		const bounds = map.getBounds().toBBoxString();

		onMapLoaded([center.lat, center.lng], zoom, bounds);
	}, [map, onMapLoaded]);

	return null;
};

export default MapReadyLogger;
