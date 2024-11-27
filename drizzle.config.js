import { defineConfig } from "drizzle-kit";
import * as dotenv from "dotenv";

// Load the environment variables
dotenv.config({ path: ".env.local" });

export default defineConfig({
  dialect: "postgresql", // Use "pg" for PostgreSQL
  schema: "./configs/schema.js", // Path to your schema file
  out: "./drizzle", // Output folder for migrations
  dbCredentials: {
    url: process.env.NEXT_PUBLIC_DATABASE_CONNECTION_STRING, // Read connection string from .env.local
  },
});
