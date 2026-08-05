"use client";

import L from "leaflet";

export const MyMarkerIcon = new L.Icon({
	iconUrl: "/icons/marker.png", // Place your image in the public folder
	iconSize: [32, 32], // Adjust size as needed
	iconAnchor: [16, 32], // Point of the icon which will correspond to marker's location
	popupAnchor: [0, -32], // Point from which the popup should open relative to the iconAnchor
});
