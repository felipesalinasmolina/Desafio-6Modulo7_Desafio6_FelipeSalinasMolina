import { db } from "./config.js";
import pg from "pg";

export const pool = new pg.Pool(db);

pool.on("connect", () => console.log("🟢DataBase Connected"));
