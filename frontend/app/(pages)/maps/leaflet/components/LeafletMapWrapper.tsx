"use client";

import { useState, useEffect } from "react";
import type { PropertyInAreaItem } from "@/app/types/Property.type";

import { LeafletMapView } from "./LeafletMapView";

export const LeafletMapWrapper = () => {
	//TODO: load properties visible in current map bounds

	const [properties, setProperties] = useState<PropertyInAreaItem[]>([]);

	const fetchProperties = async () => {
		try {
			console.log("🚀 Lets fetch properties...");
			const res = await fetch(
				`${process.env.NEXT_PUBLIC_API_URL}/properties/in-area?minLon=85.30&minLat=27.65&maxLon=85.40&maxLat=27.75`,
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
				refreshProperties={() => fetchProperties()}
			/>
		</div>
	);
};
