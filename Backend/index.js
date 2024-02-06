import express from "express";
import cors from "cors";
import { logger } from "logger-express";
import { PORT } from "./config.js";
import morgan from "morgan";

import router from "./src/routes/softjobsroutes.js"

const app = express();


app.use(express.json());
app.use(cors());
app.use(logger());
app.use(morgan("dev"));

app.use(router);

app.listen(
  PORT,
  console.log(`🟢 Servidor encendido http://localhost:${PORT} 🟢`)
);