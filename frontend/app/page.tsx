import Link from "next/link";

export default function Home() {
	return (
		<div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
			<main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
				<div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
					<h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
						Elastic Search{" "}
						<span className="text-sm text-olive-600">
							+ PostGIS + Leaflet + Mapbox
						</span>
					</h1>
					<p className="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400">
						Geospatial search and visualization using Elastic
						Search, PostGIS, Leaflet, and Mapbox. This project
						demonstrates how to integrate these technologies to
						create a powerful geospatial search and mapping
						application.
					</p>
					<a
						href="https://github.com/nexspy/elastic_search"
						target="_blank"
						rel="noopener noreferrer"
						className="text-amber-700 hover:underline"
					>
						[ View on GitHub ]
					</a>

					<div className="flex flex-col gap-4 md:flex-row">
						<Link
							href="/maps/leaflet"
							className="px-4 py-2 mt-4 text-white bg-amber-500 rounded hover:bg-amber-600"
						>
							Leaflet Map
						</Link>

						<p className="px-4 py-2 mt-4 text-amber-800 bg-amber-300 rounded cursor-not-allowed">
							Mapbox Map
						</p>
					</div>
				</div>
			</main>
		</div>
	);
}
