import { XMLParser } from "fast-xml-parser";
import path from "path";
import { extractFeaturesFromXML } from "../util/xmlReader.util.ts";
import type {
	ES_GMLResponse,
	ES_PropertyResponse,
	ES_PropertyResponseItem,
} from "../types/property/PropertyResponse.type.ts";
import { ElasticService } from "./elastic.service.ts";

const MAX_FEATURES_TO_INDEX = 150;

export class GMLReaderService {
	/**
	 * Reads a GML file and extracts features from it.
	 * @param file - The GML file to read.
	 * @returns An object containing file metadata.
	 */
	public static readGMLFile(file: Express.Multer.File): ES_GMLResponse {
		const xmlText = file.buffer.toString("utf-8");

		const parser = new XMLParser({
			ignoreAttributes: false,
			attributeNamePrefix: "",
			removeNSPrefix: true,
			trimValues: true,
		});

		const parsed = parser.parse(xmlText);
		const features: ES_PropertyResponse = extractFeaturesFromXML(parsed);

		if (features.length > 0) {
			console.log("🚀 First item:", features[0]);

			// index few features in elasticsearch
			const elasticService = new ElasticService();
			features
				// .slice(0, MAX_FEATURES_TO_INDEX)
				.forEach(async (feature: ES_PropertyResponseItem) => {
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
