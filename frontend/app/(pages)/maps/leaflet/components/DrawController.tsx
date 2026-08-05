"use client";

import { useMap } from "react-leaflet";
import { useEffect, useRef } from "react";
import "leaflet-draw/dist/leaflet.draw.css";
import L from "leaflet";

type DrawControllerProps = {
	activeTool: "polygon" | "line" | "circle" | "rectangle" | "marker" | null;
	onToolEnd: (latLngs: L.LatLng[]) => void;
};

const DrawController = ({ activeTool, onToolEnd }: DrawControllerProps) => {
	// useMap() requires this component to live inside <MapContainer>
	const map = useMap();
	// active draw handler — kept in a ref so effects can disable it across renders
	const handlerRef = useRef<any>(null);
	// FeatureGroup persists drawn shapes across tool activations
	const drawnItemsRef = useRef<L.FeatureGroup | null>(null);

	// Initialize FeatureGroup once to hold all drawn shapes
	useEffect(() => {
		const drawnItems = new L.FeatureGroup();
		map.addLayer(drawnItems);
		drawnItemsRef.current = drawnItems;

		return () => {
			map.removeLayer(drawnItems);
		};
	}, [map]);

	useEffect(() => {
		if (!window) return;

		if (handlerRef.current) {
			handlerRef.current.disable();
			handlerRef.current = null;
		}

		if (!activeTool) return;

		//! default import L is module.exports — same mutable reference leaflet-draw extends internally
		(window as any).L = L;
		//! require (not import) so it runs after window.L is set
		require("leaflet-draw");
		const WL = (window as any).L;

		const handlerMap: Record<string, any> = {
			polygon: WL.Draw.Polygon,
			line: WL.Draw.Polyline,
			circle: WL.Draw.Circle,
			rectangle: WL.Draw.Rectangle,
			marker: WL.Draw.Marker,
		};

		const Handler = handlerMap[activeTool];
		if (!Handler) return;

		const handler = new Handler(map, {
			guidelineDistance: 6,
			shapeOptions: {
				color: "#3b82f6",
				fillColor: "#3b82f6",
				fillOpacity: 0.2,
				weight: 2,
				dashArray: "2 4",
			},
			icon: new L.DivIcon({
				iconSize: new L.Point(8, 8),
				className: "leaflet-div-icon",
			}),
		});
		//! enable() activates the draw mode and attaches mouse listeners to the map
		handler.enable();
		handlerRef.current = handler;

		//! handle created event to get the drawn shape's coordinates
		const onCreated = (e: any) => {
			const layer = e.layer as L.Polygon;
			const latlngs = layer.getLatLngs()[0] as L.LatLng[];

			drawnItemsRef.current?.addLayer(layer);
			onToolEnd(latlngs);
		};

		map.on(WL.Draw.Event.CREATED, onCreated);

		//! cleanup: fires when activeTool changes or component unmounts
		return () => {
			map.off(WL.Draw.Event.CREATED, onCreated);
			handlerRef.current?.disable();
			handlerRef.current = null;
		};
	}, [activeTool, map, onToolEnd]);

	return null;
};

export default DrawController;
