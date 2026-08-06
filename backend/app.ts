import express from "express";
import cors from "cors";
import { DatabasePoolService } from "./src/services/database.service.ts";

import routes from "./src/routes/index.ts";

const app = express();
const port = process.env.PORT || 5020;

// allow CORS
app.use(
	cors({
		origin: process.env.CORS_ORIGIN || "http://localhost:3020",
	}),
);

DatabasePoolService.initializePool();

app.use(routes);

app.listen(port, () => {
	console.log(`Server running at http://localhost:${port}`);
});
