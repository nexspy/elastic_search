function asArray<T>(v: T | T[] | undefined): T[] {
	if (!v) return [];
	return Array.isArray(v) ? v : [v];
}

function parsePosList(posList: string): [number, number][] {
	const nums = posList.trim().split(/\s+/).map(Number);
	const out: [number, number][] = [];
	for (let i = 0; i < nums.length; i += 2) {
		out.push([nums[i], nums[i + 1]]);
	}
	return out;
}

/**
 * Extracts features from a parsed XML object, handling both Polygon and Point geometries.
 * @param parsed The parsed XML object, typically from a GML or similar source.
 * @returns An array of features with their properties and geometries.
 */
export const extractFeatures = (parsed: any) => {
	// removeNSPrefix=true means gml:FeatureCollection becomes FeatureCollection
	const fc = parsed.FeatureCollection || parsed;
	const members = asArray(
		fc.featureMember || fc.featureMembers?.featureMember,
	);

	return members.map((m: any) => {
		const feature = m[Object.keys(m)[0]]; // first domain feature object
		const geom =
			feature.geometry ||
			feature.geom ||
			feature.shape ||
			feature.location;

		// Polygon example
		const polygonPosList =
			geom?.Polygon?.exterior?.LinearRing?.posList ||
			geom?.MultiSurface?.surfaceMember?.Polygon?.exterior?.LinearRing
				?.posList;

		// Point example
		const pointPos = geom?.Point?.pos;

		let geometry: any = null;

		if (polygonPosList) {
			geometry = {
				type: "Polygon",
				coordinates: [parsePosList(polygonPosList)],
			};
		} else if (pointPos) {
			const [x, y] = pointPos.trim().split(/\s+/).map(Number);
			geometry = { type: "Point", coordinates: [x, y] };
		}

		return {
			properties: feature,
			geometry,
		};
	});
};

/**
 * Extracts features from a parsed XML object, specifically for FeatureCollection structures.
 * This function is tailored for XML data that follows the FeatureCollection schema, commonly used in geospatial data formats.
 * @param parsed
 * @returns
 */
export const extractFeaturesFromXML = (parsed: any) => {
	const fc = parsed.FeatureCollection || parsed;

	// WFS 2.0 uses member
	const members = asArray(fc.member || fc.featureMember);

	return members.map((m: any) => {
		// e.g. { PREDEFINED: {...} }
		const feature = m[Object.keys(m)[0]] ?? m;

		// LR:GEOMETRY -> GEOMETRY after removeNSPrefix: true
		const geomContainer =
			feature.GEOMETRY ||
			feature.geometry ||
			feature.geom ||
			feature.shape;

		const polygonPosList =
			geomContainer?.Polygon?.exterior?.LinearRing?.posList ||
			geomContainer?.MultiSurface?.surfaceMember?.Polygon?.exterior
				?.LinearRing?.posList;

		let geometry: any = null;
		if (polygonPosList) {
			geometry = {
				type: "Polygon",
				coordinates: [parsePosList(polygonPosList)],
			};
		}

		return {
			properties: {
				inspireId: feature.INSPIREID,
				label: feature.LABEL,
				nationalCadastralReference: feature.NATIONALCADASTRALREFERENCE,
				validFrom: feature.VALIDFROM,
			},
			geometry,
		};
	});
};
