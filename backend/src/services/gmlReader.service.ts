import { XMLParser } from "fast-xml-parser";
import path from "path";
import { extractFeaturesFromXML } from "../util/xmlReader.util.ts";
import type {
	GMLResponse,
	PropertyResponse,
} from "../types/property/PropertyResponse.type.ts";

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

		console.log("🚀 Extracted features:", features.length);
		if (features.length > 0) {
			console.log("🚀 First item:", features[0]);
			console.log("🚀 Coordinates:", features[0].geometry.coordinates);
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
