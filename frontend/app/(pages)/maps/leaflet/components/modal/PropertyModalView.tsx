import { IoCloseSharp } from "react-icons/io5";

import { PropertyViewType } from "@/app/types/Property.type";

interface Props {
	propertyView: PropertyViewType;
	onClose?: () => void;
}

export const PropertyModalView = ({ propertyView, onClose }: Props) => {
	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs">
			<div className=" w-[50%] flex flex-col gap-4 modal-content-fade-in">
				<div className="relative flex flex-row gap-4 justify-between">
					<button
						className="absolute -top-10 right-0 text-white cursor-pointer hover:text-amber-300"
						onClick={onClose}
					>
						<IoCloseSharp size={24} />
					</button>
					<div className="group bg-white p-6 rounded-sm shadow-lg flex-1 hover:bg-amber-50">
						<h3 className="text-amber-800 text-lg font-bold transition-all duration-100 ease-in group-hover:scale-101">
							Property Name
						</h3>
						<p>{propertyView.name}</p>
					</div>

					<div className="group bg-white p-6 rounded-sm shadow-lg flex-1 hover:bg-amber-50">
						<h3 className="text-amber-800 text-lg font-bold transition-all duration-100 ease-in group-hover:scale-101">
							Property Location
						</h3>
						<p>{propertyView.location}</p>
					</div>

					<div className="group bg-white p-6 rounded-sm shadow-lg flex-1 hover:bg-amber-50">
						<h3 className="text-amber-800 text-lg font-bold transition-all duration-100 ease-in group-hover:scale-101">
							Property Price
						</h3>
						<p className="flex flex-row gap-2 items-center">
							£ {propertyView.price}{" "}
							<span className="text-green-800 bg-green-100 text-xs p-2 rounded-lg">
								+ 0.20%
							</span>
						</p>
					</div>
				</div>

				<div className="flex flex-row gap-4 min-h-[30vh]">
					<div className="group bg-white p-6 rounded-sm shadow-lg flex-2 hover:bg-amber-50">
						<div className="flex justify-center items-center h-full">
							<h3 className="text-amber-800 text-lg font-bold transition-all duration-100 ease-in group-hover:scale-101">
								Map View {"<TBD>"}
							</h3>
						</div>
					</div>

					<div className="group bg-white p-6 rounded-sm shadow-lg flex-1 flex flex-col gap-4 hover:bg-amber-50">
						<div>
							<h3 className="text-amber-800 text-lg font-bold transition-all duration-100 ease-in group-hover:scale-101">
								Description
							</h3>
							<p className="text-sm">
								{propertyView.description}
							</p>
						</div>

						<div>
							<h3 className="text-amber-800 text-lg font-bold transition-all duration-100 ease-in group-hover:scale-101">
								Chart
							</h3>
							<p>TBD</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
