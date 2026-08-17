// Generate a random string of the specified length using base36 encoding (0-9, a-z)
export const generateRandomStrForId = (length: number = 16): string => {
	return Math.random()
		.toString(36)
		.substring(2, 2 + length);
};

// Generate random property name
export const generateRandomPropertyName = (
	length: number = 8,
	withSpace: boolean = false,
): string => {
	const randomStr = generateRandomStrForId(length);
	return withSpace ? `_${randomStr} ` : `_${randomStr}`;
};
