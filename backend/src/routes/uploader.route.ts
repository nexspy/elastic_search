import { Router } from "express";
import multer from "multer";
import path from "path";
import { XMLParser } from "fast-xml-parser";
import { extractFeaturesFromXML } from "../util/xmlReader.util.ts";

const router = Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
	destination: (req: any, file: Express.Multer.File, cb) => {
		cb(null, "uploads/");
	},
	filename: (req: any, file: Express.Multer.File, cb) => {
		const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
		cb(
			null,
			file.fieldname +
				"-" +
				uniqueSuffix +
				path.extname(file.originalname),
		);
	},
});

//* this stores the file locally as well
// const upload = multer({ storage });

//* this stores the file in memory as a buffer
const upload = multer({
	storage: multer.memoryStorage(),
	limits: { fileSize: 35 * 1024 * 1024 },
}); // Limit file size to 35MB

// POST route to handle file upload
router.post("/upload", (req, res) => {
	upload.single("file")(req, res, (err) => {
		if (err instanceof multer.MulterError) {
			if (err.code === "LIMIT_FILE_SIZE") {
				return res.status(413).json({
					error: "File too large",
					message: "Maximum allowed file size is 35MB",
				});
			}

			return res.status(400).json({
				error: "Upload error",
				message: err.message,
				code: err.code,
			});
		}

		if (err) {
			return res.status(500).json({
				error: "Unexpected upload error",
				message: "Failed to process upload",
			});
		}

		if (!req.file) {
			return res.status(400).json({ error: "No file uploaded" });
		}

		const xmlText = req.file.buffer.toString("utf-8");

		const parser = new XMLParser({
			ignoreAttributes: false,
			attributeNamePrefix: "",
			removeNSPrefix: true,
			trimValues: true,
		});

		const parsed = parser.parse(xmlText);
		const features = extractFeaturesFromXML(parsed);

		console.log("🚀 Extracted features:", features.length);
		if (features.length > 0) {
			console.log("🚀 First item:", features[0]);
			console.log("🚀 Coordinates:", features[0].geometry.coordinates);
		}

		const fileData = {
			filename: req.file.originalname,
			extension: path.extname(req.file.originalname).toLowerCase(),
			mimetype: req.file.mimetype,
			size: req.file.size,
		};

		return res.status(200).json({
			message: "File uploaded successfully",
			file: fileData,
		});
	});
});

// GET route to retrieve file metadata
router.get("/file/:filename", (req: any, res: any) => {
	const { filename } = req.params;
	const extension = path.extname(filename);

	res.status(200).json({
		filename: filename,
		extension: extension,
	});
});

export default router;
