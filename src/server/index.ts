import cors from "cors";
import express from "express";

export const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  "https://202304-w7chwe-robert-belenguer-front.netlify.app",
];

app.use(cors({ origin: allowedOrigins }));
