import { XMLParser } from "fast-xml-parser";
import path from "path";
import { extractFeaturesFromXML } from "../util/xmlReader.util.ts";
import type {
	GMLResponse,
	PropertyResponse,
	PropertyResponseItem,
} from "../types/property/PropertyResponse.type.ts";
import { ElasticService } from "./elastic.service.ts";

export class GMLReaderService {
	/**
	 * Reads a GML file and extracts features from it.
	 * @param file - The GML file to read.
	 * @returns An object containing file metadata.
	 */
	public static readGMLFile(file: Express.Multer.File): GMLResponse {
		const xmlText = file.buffer.toString("utf-8");

		const parser = new XMLParser({
			ignoreAttributes: false,
			attributeNamePrefix: "",
			removeNSPrefix: true,
			trimValues: true,
		});

		const parsed = parser.parse(xmlText);
		const features: PropertyResponse = extractFeaturesFromXML(parsed);

		if (features.length > 0) {
			console.log("🚀 First item:", features[0]);

			// index few features in elasticsearch
			const elasticService = new ElasticService();
			features
				.slice(0, 5)
				.forEach(async (feature: PropertyResponseItem) => {
					console.log(
						"🚀 Indexing feature:",
						feature.properties.label,
					);
					await elasticService.indexProperty(feature);
				});
		}

		const fileData = {
			filename: file.originalname,
			extension: path.extname(file.originalname).toLowerCase(),
			mimetype: file.mimetype,
			size: file.size,
		};

		return fileData;
	}
}
