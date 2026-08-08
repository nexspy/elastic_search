interface Props {
	onConfirm?: () => void;
	onClose?: () => void;
}

export const ConfirmModalView = ({ onConfirm, onClose }: Props) => {
	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
			<div className="bg-white p-6 rounded-lg shadow-lg w-96">
				<h2 className="text-xl font-semibold mb-4">Are you sure?</h2>
				<p className="mb-2">Property Name: Example Property</p>
				<button
					className="px-4 py-2 mt-4 text-white bg-amber-500 rounded hover:bg-amber-600 cursor-pointer"
					onClick={onConfirm}
				>
					Yes
				</button>
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
