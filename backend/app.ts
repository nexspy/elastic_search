import express, { type Express, type Request, type Response } from "express";
import { Client } from "@elastic/elasticsearch";

const app: Express = express();
app.use(express.json());

const indexName = process.env.ELASTICSEARCH_INDEX || "express-demo";

//! Create a new instance of the Elasticsearch client
const client = new Client({
	node: process.env.ELASTICSEARCH_URL || "http://localhost:9200",
});

app.get("/", (req: Request, res: Response) => {
	res.send("Hello World!");
});

app.get("/health", async (_req: Request, res: Response) => {
	try {
		const result = await client.ping();
		res.json({ ok: true, elasticsearch: result });
	} catch (error) {
		const message =
			error instanceof Error ? error.message : "Unknown error";
		res.status(500).json({ ok: false, error: message });
	}
});

//! Endpoint to index a document in Elasticsearch
app.post("/demo", async (req: Request, res: Response) => {
	try {
		const document = {
			message: "Hello from Express",
			...req.body,
			timestamp: new Date().toISOString(),
		};

		const response = await client.index({
			index: indexName,
			document,
		});

		res.status(201).json({
			success: true,
			id: response._id,
			index: response._index,
			document,
		});
	} catch (error) {
		const message =
			error instanceof Error ? error.message : "Unknown error";
		res.status(502).json({ success: false, error: message });
	}
});

//TODO: Add more endpoints for searching, updating, and deleting documents in Elasticsearch as needed.

app.listen(5020);
