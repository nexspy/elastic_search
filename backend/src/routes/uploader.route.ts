import { Router } from "express";
import multer from "multer";
import path from "path";

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

const upload = multer({ storage });

// POST route to handle file upload
router.post("/upload", upload.single("file"), (req: any, res: any) => {
	if (!req.file) {
		return res.status(400).json({ error: "No file uploaded" });
	}

	const fileData = {
		filename: req.file.originalname,
		extension: path.extname(req.file.originalname).toLowerCase(),
		mimetype: req.file.mimetype,
		size: req.file.size,
		path: req.file.path,
	};

	res.status(200).json({
		message: "File uploaded successfully",
		file: fileData,
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
