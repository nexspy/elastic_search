import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
	title: "Elastic Search with PostGIS",
	description:
		"Property and Spatial Data Management with Elastic Search and PostGIS",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" className="h-full antialiased">
			<body className="min-h-full flex flex-col">{children}</body>
		</html>
	);
}
