export const PropertyModalView = () => {
	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
			<div className="bg-white p-6 rounded-lg shadow-lg w-96">
				<h2 className="text-xl font-semibold mb-4">Property Details</h2>
				<p className="mb-2">Property Name: Example Property</p>
				<p className="mb-2">Location: 123 Main St, City, Country</p>
				<p className="mb-2">Price: $500,000</p>
				<p className="mb-2">
					Description: This is a beautiful property located in a prime
					area.
				</p>
				<button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
					Close
				</button>
			</div>
		</div>
	);
};
