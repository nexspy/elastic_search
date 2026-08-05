import { Pool } from "pg";

export class DatabasePoolService {
	public static pool: Pool;

	public static initializePool() {
		if (!DatabasePoolService.pool) {
			DatabasePoolService.pool = new Pool({
				host: process.env.DB_HOST || "postgres",
				port: Number(process.env.DB_PORT || 5432),
				user: process.env.DB_USER || "postgres",
				password: process.env.DB_PASSWORD || "postgres",
				database: process.env.DB_NAME || "postgreslearndb",
			});
		}
	}

	public static getPool(): Pool {
		if (!DatabasePoolService.pool) {
			throw new Error("Database pool has not been initialized.");
		}
		return DatabasePoolService.pool;
	}
}
