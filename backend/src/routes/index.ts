import { Router } from "express";
import { getPropertiesInArea } from "./property.route.ts";

const router = Router();

router.get("/", (_req, res) => {
	res.json({ message: "Backend is running" });
});

router.get("/properties/in-area", getPropertiesInArea);

export default router;
