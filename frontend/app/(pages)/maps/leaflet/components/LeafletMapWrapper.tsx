"use client";

import { useState, useEffect } from "react";
import type {
	ES_GeoShapeData,
	PropertyInAreaItem,
} from "@/app/types/Property.type";

import { LeafletMapView } from "./LeafletMapView";

export const LeafletMapWrapper = () => {
	//TODO: load properties visible in current map bounds

	const [properties, setProperties] = useState<PropertyInAreaItem[]>([]);

	// fetch properties in the current map bounds
	const fetchProperties = async (
		minLon = 85.3,
		minLat = 27.65,
		maxLon = 85.4,
		maxLat = 27.75,
	) => {
		try {
			console.log("🚀 Lets fetch properties...");
			const res = await fetch(
				`${process.env.NEXT_PUBLIC_API_URL}/properties/in-area?minLon=${minLon}&minLat=${minLat}&maxLon=${maxLon}&maxLat=${maxLat}`,
			);
			const data = await res.json();
			setProperties(data.properties || []);
		} catch (e) {
			console.error("Error fetching properties:", e);
		}
	};

	// add property using shape
	const handleAddProperty = async (shape: ES_GeoShapeData) => {
		try {
			// add property, send data to backend
			const res = await fetch(
				`${process.env.NEXT_PUBLIC_API_URL}/properties/add-using-shape`,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(shape),
				},
			);
			const data = await res.json();

			console.log("Property added:", data);
		} catch (e) {
			console.error("Error adding property:", e);
		}
	};

	useEffect(() => {
		fetchProperties();
	}, []);

	return (
		<div>
			<LeafletMapView
				properties={properties}
				addProperty={async (shape: ES_GeoShapeData) => {
					console.log("-- lets save this prop --", shape);
					await handleAddProperty(shape);
				}}
				refreshProperties={(minLon, minLat, maxLon, maxLat) =>
					fetchProperties(minLon, minLat, maxLon, maxLat)
				}
			/>
		</div>
	);
};
