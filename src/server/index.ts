import "./loadEnvironment.js";

import cors from "cors";
import express from "express";
import morgan from "morgan";
import userRouter from "./routers/userRouter.js";
import {
  generalErrorMiddleware,
  notFoundError,
} from "./middlewares/errorMiddlewares.js";
import contactsRouter from "./routers/contactsRouter.js";

export const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  "https://202304-w7chwe-robert-belenguer-front.netlify.app",
];

app.use(cors({ origin: allowedOrigins }));

app.use(express.json());

app.disable("x-powered-by");

app.use(morgan("dev"));

app.use("/user", userRouter);
app.use("/contacts", contactsRouter);

app.use(notFoundError);
app.use(generalErrorMiddleware);
