"use client";

import { FullScreenLoader } from "@/app/components/common/FullScreenLoader";
import dynamic from "next/dynamic";

const LeafletMapWrapper = dynamic(
	() =>
		import("@/app/(pages)/maps/leaflet/components/LeafletMapWrapper").then(
			(mod) => mod.LeafletMapWrapper,
		),
	{
		ssr: false,
		loading: () => (
			<div className="h-screen w-full flex items-center justify-center bg-gray-100">
				<div className="text-lg">Loading map...</div>
			</div>
		),
	},
);

const LeafletPage = () => {
	return (
		<div>
			<FullScreenLoader isVisible={false} />
			<LeafletMapWrapper />
		</div>
	);
};

export default LeafletPage;
