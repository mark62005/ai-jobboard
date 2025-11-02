import "dotenv/config";
import { env } from "@/data/env/server";
import { Client } from "pg";

export async function ensureDatabaseExists() {
	const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME } = env;

	console.log("Using validated env:", { DB_HOST, DB_PORT, DB_USER, DB_NAME });

	const adminClient = new Client({
		host: DB_HOST,
		port: Number(DB_PORT),
		user: DB_USER,
		password: DB_PASSWORD,
		database: "postgres", // connect to default DB first
	});

	try {
		console.log(
			"Connecting to Postgres at",
			DB_HOST,
			DB_PORT,
			"as user",
			DB_USER
		);

		await adminClient.connect();
		const res = await adminClient.query(
			"SELECT 1 FROM pg_database WHERE datname = $1",
			[DB_NAME]
		);

		if (res.rowCount === 0) {
			console.log(`🟡 Database '${DB_NAME}' not found. Creating...`);
			await adminClient.query(`CREATE DATABASE "${DB_NAME}";`);
			console.log(`✅ Database '${DB_NAME}' created successfully.`);
		} else {
			console.log(`✅ Database '${DB_NAME}' already exists.`);
		}
	} catch (err) {
		console.error("❌ Error ensuring database exists:", err);
		process.exit(1);
	} finally {
		await adminClient.end();
	}
}

ensureDatabaseExists();
