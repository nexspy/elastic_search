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
				<button className="px-4 py-2 mt-4 text-white bg-amber-500 rounded hover:bg-amber-600 cursor-pointer">
					Close
				</button>
			</div>
		</div>
	);
};
