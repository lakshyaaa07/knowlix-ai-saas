import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import * as dotenv from 'dotenv';

dotenv.config({
  path: '.env.local',
});


const sql = neon(process.env.NEXT_PUBLIC_DATABASE_CONNECTION_STRING);
export const db = drizzle({ client: sql });