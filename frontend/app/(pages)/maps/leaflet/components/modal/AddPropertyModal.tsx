import { generateRandomPropertyName } from "@/app/util/random.util";
import { useRef, useState } from "react";
import { IoCloseSharp } from "react-icons/io5";

interface Props {
	onClose?: () => void;
	onSave: (propertyName: string) => void;
}

export const AddPropertyModal = ({ onClose, onSave }: Props) => {
	const inputRef = useRef<HTMLInputElement>(null);
	const defaultName = generateRandomPropertyName(12);
	const [propertyName, setPropertyName] = useState<string>(defaultName);

	const handleSubmit = () => {
		if (!propertyName) {
			alert("Please enter a property name.");
			// focus back to input
			inputRef.current?.focus();
			return;
		}

		// validate name cannot have special characters
		const regex = /^[a-zA-Z0-9 ]+$/;
		if (!regex.test(propertyName)) {
			alert(
				"Property name can only contain letters, numbers, and spaces.",
			);
			// focus back to input
			inputRef.current?.focus();
			return;
		}

		//! save
		onSave(propertyName);
	};

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs">
			<div className=" w-[50%] flex flex-col gap-4 modal-content-fade-in">
				<div className="relative flex flex-row gap-4 justify-between">
					<div className="group bg-white p-6 rounded-sm shadow-lg flex flex-1  flex-col gap-4">
						<button
							className="absolute -top-10 right-0 text-white cursor-pointer "
							onClick={onClose}
						>
							<IoCloseSharp size={24} />
						</button>

						<h3 className="text-amber-800 text-lg font-bold transition-all duration-100 ease-in">
							Add Property
						</h3>
						<p>
							<input
								type="text"
								name="propertyName"
								id="propertyName"
								ref={inputRef}
								placeholder="Enter property name"
								className="w-full border border-gray-300 rounded-md p-2"
								value={propertyName}
								onChange={(e) =>
									setPropertyName(e.target.value)
								}
								required
							/>
						</p>
						<button
							type="button"
							className="bg-amber-500 text-white px-4 py-2 rounded hover:bg-amber-600 cursor-pointer"
							onClick={handleSubmit}
						>
							Save
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};
