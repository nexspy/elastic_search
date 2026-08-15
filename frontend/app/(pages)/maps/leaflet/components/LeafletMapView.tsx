"use client";

import { useCallback, useEffect, useState } from "react";
import {
	MapContainer,
	TileLayer,
	Marker,
	Popup,
	ZoomControl,
	Polygon,
	useMapEvents,
} from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-markercluster";

import { IoMdHome, IoMdSearch } from "react-icons/io";
import { BsSlashLg } from "react-icons/bs";
import { BiLogOut } from "react-icons/bi";
import { MdPentagon } from "react-icons/md";
import { FaCircle, FaTrash } from "react-icons/fa";
import { IoCloseSharp } from "react-icons/io5";
import { FaTableList, FaPenNib } from "react-icons/fa6";

import { MyMarkerIcon } from "./LeafletMarker";
import { MarkerType } from "@/app/types/Marker.type";
import { LeafletSearchFilters } from "./LeafletSearchFilters";
import DrawController from "./DrawController";
import { useRouter } from "next/dist/client/components/navigation";
import { PropertyModalView } from "./modal/PropertyModalView";
import {
	ES_PropertyItem,
	PropertyInAreaItem,
	PropertyMapItem,
	PropertyViewType,
} from "@/app/types/Property.type";
import {
	convertESPropertyInAreaItemToPropertyViewType,
	convertPropertyInAreaItemToPropertyViewType,
} from "@/app/util/property.util";
import MapReadyLogger from "./MapReadyLogger";

const toolSize = 24;
const toolColour = "#d8d8d0";

//! Starting position
const startingPosition: [number, number] = [
	51.52975152891632, -0.1160599992007142,
];

interface MapMoveProps {
	onMoveMoved: (
		center: [number, number],
		zoom: number,
		bounds: string,
	) => void;
}

// small component to log map move events
const MapMoveLogger = ({ onMoveMoved }: MapMoveProps) => {
	useMapEvents({
		moveend: (event) => {
			const map = event.target;
			const center = map.getCenter();

			const centerCoords: [number, number] = [center.lat, center.lng];
			const zoom = map.getZoom();
			const bounds = map.getBounds().toBBoxString();

			onMoveMoved(centerCoords, zoom, bounds);
		},
	});

	return null;
};

interface Props {
	properties: PropertyInAreaItem[];
	refreshProperties?: (
		minLon: number,
		minLat: number,
		maxLon: number,
		maxLat: number,
	) => void;
}

export const LeafletMapView = ({ properties, refreshProperties }: Props) => {
	const router = useRouter();
	const markerPositions: MarkerType[] = [];

	const [zoomLevel, setZoomLevel] = useState<number>(18);
	const [showSearch, setShowSearch] = useState<boolean>(true);
	const [showDrawTools, setShowDrawTools] = useState<boolean>(false);
	const [showModalView, setShowModalView] = useState<boolean>(true);
	const [activeTool, setActiveTool] = useState<"polygon" | null>(null);

	const [propertiesList, setPropertiesList] = useState<PropertyMapItem[]>([]);

	// current mapbounds
	const [mapBounds, setMapBounds] = useState<
		[[number, number], [number, number]] | null
	>(null);

	// this is the property we see in the modal view
	const sampleProperty: PropertyViewType = {
		id: "1",
		name: "London Property",
		location: "123 Main St, London, UK",
		price: 500000,
		description: "This is a beautiful property located in a prime area.",
	};
	const [selectedProperty, setSelectedProperty] =
		useState<PropertyViewType | null>(null);

	const handleMapMoved = (
		center: [number, number],
		zoom: number,
		bounds: string,
	) => {
		const boundsArray = bounds.split(",").map(Number);

		// show loading animation and fetch properties in the new bounds
		if (refreshProperties) {
			const minLon = boundsArray[0];
			const minLat = boundsArray[1];
			const maxLon = boundsArray[2];
			const maxLat = boundsArray[3];
			refreshProperties(minLon, minLat, maxLon, maxLat);
		}

		// update bounds state
		const newBounds: [[number, number], [number, number]] = [
			[boundsArray[1], boundsArray[0]], // Southwest corner
			[boundsArray[3], boundsArray[2]], // Northeast corner
		];
		setMapBounds(newBounds);
	};

	const handleMapLoaded = useCallback(
		(center: [number, number], zoom: number, bounds: string) => {
			const boundsArray = bounds.split(",").map(Number);
			const nextBounds: [[number, number], [number, number]] = [
				[boundsArray[1], boundsArray[0]],
				[boundsArray[3], boundsArray[2]],
			];

			setMapBounds((prev) => {
				const same =
					prev &&
					prev[0][0] === nextBounds[0][0] &&
					prev[0][1] === nextBounds[0][1] &&
					prev[1][0] === nextBounds[1][0] &&
					prev[1][1] === nextBounds[1][1];

				return same ? prev : nextBounds;
			});
			console.log("map loaded first time and bounds were set");
		},
		[],
	);

	useEffect(() => {
		if (properties.length === 0) {
			setPropertiesList([]);
			return;
		}

		// convert all properties in the array
		const convertedPropertiesArray = properties.map(
			(property: PropertyInAreaItem | ES_PropertyItem) =>
				// convertPropertyInAreaItemToPropertyViewType(property),
				convertESPropertyInAreaItemToPropertyViewType(
					property as ES_PropertyItem,
				),
		);

		setPropertiesList(convertedPropertiesArray);
	}, [properties]);

	useEffect(() => {
		// set current map bounds to the initial bounds of the map
		const initialBounds: [[number, number], [number, number]] = [
			[startingPosition[0], startingPosition[1]], // Southwest corner
			[startingPosition[0] + 0.01, startingPosition[1] + 0.01], // Northeast corner
		];
		setMapBounds(initialBounds);
	}, []);

	return (
		<div
			className={`w-full h-screen relative bg-gray-200 flex items-center justify-center`}
			style={{ height: "100vh", width: "100vw" }}
		>
			<div className="absolute top-4 left-23 z-50 flex flex-col gap-2">
				{showSearch && (
					<div className="flex flex-row gap-2 rounded-lg shadow-2xl">
						{/* Search box */}
						<LeafletSearchFilters />
					</div>
				)}

				{showDrawTools && (
					<div className="px-6 py-4 flex flex-row justify-between gap-4 rounded-lg bg-slate-800 shadow-2xl">
						<div className="flex flex-row gap-6">
							<BsSlashLg
								size={toolSize}
								color={toolColour}
								// className="hover:opacity-75 cursor-pointer"
								className="cursor-not-allowed"
								title="Draw Line"
							/>
							<MdPentagon
								size={toolSize}
								color={
									activeTool === "polygon"
										? "#fe9a00"
										: toolColour
								}
								className="hover:opacity-75 cursor-pointer"
								title="Draw Pentagon"
								onClick={() =>
									setActiveTool((prev) =>
										prev === "polygon" ? null : "polygon",
									)
								}
							/>
							<FaCircle
								size={toolSize}
								color={toolColour}
								// className="hover:opacity-75 cursor-pointer"
								className="cursor-not-allowed"
								title="Draw Circle"
							/>
							<FaTrash
								size={toolSize}
								color={toolColour}
								// className="hover:opacity-75 cursor-pointer"
								className="cursor-not-allowed"
								title="Delete Shape"
							/>
						</div>

						<div>
							<IoCloseSharp
								size={toolSize}
								color={toolColour}
								className="hover:opacity-75 cursor-pointer"
								title="Hide tools"
								onClick={() => setShowDrawTools(false)}
							/>
						</div>
					</div>
				)}
			</div>

			<div className="absolute top-4 left-4 z-50">
				<div className="px-4 py-2 rounded-lg bg-slate-800 shadow-2xl text-olive-200 h-full min-w-15 max-w-[20%] flex flex-col items-center justify-between">
					<div className="flex flex-col items-center gap-4">
						<IoMdHome
							size={26}
							className="hover:opacity-75 mt-2 cursor-pointer"
							title="Dashboard"
							onClick={() => router.push("/")}
						/>

						<IoMdSearch
							size={22}
							className="hover:opacity-75 cursor-pointer"
							title="Search"
							onClick={() => setShowSearch((prev) => !prev)}
						/>

						<FaPenNib
							size={22}
							className="hover:opacity-75 cursor-pointer"
							title="Draw"
							onClick={() => setShowDrawTools((prev) => !prev)}
						/>

						<FaTableList
							size={22}
							className="hover:opacity-75 cursor-pointer"
							title="Data Table"
						/>
					</div>

					<div className="mb-4">
						<BiLogOut
							size={26}
							className="hover:opacity-75 mt-2 cursor-pointer"
							title="Logout"
						/>
					</div>
				</div>
			</div>

			<MapContainer
				center={startingPosition}
				zoom={zoomLevel}
				zoomControl={false}
				style={{ height: "100%", width: "100%", zIndex: 0 }}
			>
				{/* //! Map move event handler */}
				<MapMoveLogger
					onMoveMoved={(center, zoom, bounds) =>
						handleMapMoved(center, zoom, bounds)
					}
				/>
				<MapReadyLogger onMapLoaded={handleMapLoaded} />

				<ZoomControl position="topright" />

				<TileLayer
					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
					attribution="&copy; OpenStreetMap contributors"
				/>

				{/* //! Shapes to draw */}
				{propertiesList.map((polygon, idx) => (
					<Polygon
						key={idx}
						positions={polygon.positions}
						pathOptions={{ color: polygon.color, fillOpacity: 0.3 }}
					>
						<Popup>
							<h2
								onClick={() => {
									setSelectedProperty(sampleProperty);
									setShowModalView(true);

									// close the popup
									const popup = document.querySelector(
										".leaflet-popup-close-button",
									) as HTMLElement;
									if (popup) {
										popup.click();
									}
								}}
								className="text-lg font-bold cursor-pointer hover:text-amber-500"
							>
								{polygon.label}
							</h2>
							<p>{polygon.summary}</p>
							<button
								onClick={() => {
									setSelectedProperty(sampleProperty);
									setShowModalView(true);

									// close the popup
									const popup = document.querySelector(
										".leaflet-popup-close-button",
									) as HTMLElement;
									if (popup) {
										popup.click();
									}
								}}
								className="cursor-pointer text-amber-950 bg-amber-400 hover:bg-amber-300 rounded-sm px-4 py-2"
							>
								View
							</button>
						</Popup>
					</Polygon>
				))}

				<MarkerClusterGroup>
					{markerPositions.map((pos, idx) => (
						<Marker
							key={idx}
							position={pos.location}
							icon={MyMarkerIcon}
						>
							<Popup>Marker {idx + 1}</Popup>
						</Marker>
					))}
				</MarkerClusterGroup>

				{activeTool && (
					<DrawController
						activeTool={activeTool}
						onToolEnd={(latLngs: L.LatLng[]) => {
							// latlngs is an array of { lat, lng } objects
							console.log("points: ", latLngs);
							setActiveTool(null);
						}}
					/>
				)}
			</MapContainer>

			{selectedProperty && showModalView && (
				<PropertyModalView
					propertyView={selectedProperty}
					onClose={() => setShowModalView(false)}
				/>
			)}
		</div>
	);
};
