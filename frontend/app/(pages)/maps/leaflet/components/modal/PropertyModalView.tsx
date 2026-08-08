import { PropertyViewType } from "@/app/types/Property.type";

interface Props {
	propertyView: PropertyViewType;
	onClose?: () => void;
}

export const PropertyModalView = ({ propertyView, onClose }: Props) => {
	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
			<div className="bg-white p-6 rounded-lg shadow-lg w-96">
				<h2 className="text-xl font-semibold mb-4">
					{propertyView.name}
				</h2>
				<p className="mb-2">Property Name: {propertyView.name}</p>
				<p className="mb-2">Location: {propertyView.location}</p>
				<p className="mb-2">
					Price: ${propertyView.price.toLocaleString()}
				</p>
				<p className="mb-2">Description: {propertyView.description}</p>
				<button
					className="px-4 py-2 mt-4 text-white bg-amber-500 rounded hover:bg-amber-600 cursor-pointer"
					onClick={onClose}
				>
					Close
				</button>
			</div>
		</div>
	);
};
