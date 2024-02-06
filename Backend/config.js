import { config } from "dotenv";
config();

export const db = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_DATABASE,
  secretkey: process.env.SECRET_KEY
};

export const PORT = process.env.PORT || 5000;
export const SECRET_KEY=process.env.SECRET_KEY