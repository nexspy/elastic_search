"use client";

import { useState, useEffect } from "react";
import type { PropertyInAreaItem } from "@/app/types/Property.type";

import { LeafletMapView } from "./LeafletMapView";

export const LeafletMapWrapper = () => {
	//TODO: load properties visible in current map bounds

	const [properties, setProperties] = useState<PropertyInAreaItem[]>([]);

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

	useEffect(() => {
		fetchProperties();
	}, []);

	return (
		<div>
			<LeafletMapView
				properties={properties}
				refreshProperties={(minLon, minLat, maxLon, maxLat) =>
					fetchProperties(minLon, minLat, maxLon, maxLat)
				}
			/>
		</div>
	);
};
