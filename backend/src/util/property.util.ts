/**
 * Parse a string coordinate value into a number. Returns NaN if the value is undefined.
 * @param value
 * @returns
 */
export const parseCoordinate = (value: string | undefined) => {
	if (value === undefined) return NaN;
	return Number(value);
};

/**
 * Validate if the provided coordinate bounds are valid.
 * @param minLon
 * @param minLat
 * @param maxLon
 * @param maxLat
 * @returns
 */
export const isValidCoordinateBounds = (
	minLon: number,
	minLat: number,
	maxLon: number,
	maxLat: number,
) => {
	return (
		Number.isFinite(minLon) &&
		Number.isFinite(minLat) &&
		Number.isFinite(maxLon) &&
		Number.isFinite(maxLat) &&
		minLon >= -180 &&
		maxLon <= 180 &&
		minLat >= -90 &&
		maxLat <= 90 &&
		minLon < maxLon &&
		minLat < maxLat
	);
};
