"use client";

import { useEffect, useRef } from "react";

export const LeafletSearchFilters = () => {
	const searchInputRef = useRef<HTMLInputElement | null>(null);

	//! listen for Cmd + K or Ctrl + K to focus the search input
	useEffect(() => {
		const handleKeyDown = (event: KeyboardEvent) => {
			const isK = event.key.toLowerCase() === "k";
			const hasModifier = event.metaKey || event.ctrlKey;

			if (hasModifier && isK) {
				event.preventDefault();
				searchInputRef.current?.focus();
			}
		};

		window.addEventListener("keydown", handleKeyDown);
		return () => window.removeEventListener("keydown", handleKeyDown);
	}, []);

	//! focus the search input on component mount
	useEffect(() => {
		searchInputRef.current?.focus();
	}, []);

	return (
		<div className="">
			<input
				ref={searchInputRef}
				type="text"
				placeholder="Search... Cmd + K"
				className="p-2 border-slate-800 border-2 rounded-lg text-sm bg-slate-800 text-white w-75"
			/>
		</div>
	);
};
