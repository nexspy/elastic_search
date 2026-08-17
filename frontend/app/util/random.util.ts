// Generate a random string of the specified length using base36 encoding (0-9, a-z)
export const generateRandomStrForId = (length: number = 16): string => {
	return Math.random()
		.toString(36)
		.substring(2, 2 + length);
};

// Generate random string
export const generateRandomStr = (length: number = 16): string => {
	const chars =
		"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
	let result = "";
	for (let i = 0; i < length; i++) {
		const randomIndex = Math.floor(Math.random() * chars.length);
		result += chars[randomIndex];
	}
	return result;
};

// Generate random property name
export const generateRandomPropertyName = (
	length: number = 8,
	withSpace: boolean = false,
): string => {
	const randomStr = generateRandomStr(length);
	return withSpace ? `${randomStr} ` : `${randomStr}`;
};
