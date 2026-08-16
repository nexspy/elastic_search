// Generate a random string of the specified length using base36 encoding (0-9, a-z)
export const generateRandomStrForId = (length: number = 16): string => {
	return Math.random()
		.toString(36)
		.substring(2, 2 + length);
};
