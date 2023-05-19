import "./loadEnvironment.js";

import cors from "cors";
import express from "express";
import morgan from "morgan";

export const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  "https://202304-w7chwe-robert-belenguer-front.netlify.app",
];

app.use(cors({ origin: allowedOrigins }));

app.use(express.json());

app.disable("x-powered-by");

app.use(morgan("dev"));
