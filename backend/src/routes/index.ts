import { Router } from "express";
import { getPropertiesInArea } from "./property.route.ts";

const router = Router();

import uploaderRouter from "./uploader.route.ts";

router.get("/", (_req, res) => {
	res.json({ message: "Backend is running" });
});

router.get("/properties/in-area", getPropertiesInArea);

router.use("/properties", uploaderRouter);

export default router;
