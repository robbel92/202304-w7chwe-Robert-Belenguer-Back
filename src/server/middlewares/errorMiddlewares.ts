import createDebug from "debug";
import { type NextFunction, type Request, type Response } from "express";
import CustomError from "../CustomError/CustomError.js";

const debug = createDebug("items-api:server:middlewares:errorMiddlewares");

export const notFoundError = (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  debug("Not found error");
  const error = new CustomError(
    "Sorry, endpoint notfound please check it",
    404
  );
  next(error);
};

export const generalErrorMiddleware = (
  error: CustomError,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  const statusCode = error.statusCode || 500;
  const message = error.statusCode ? error.publicMessage : "General error";

  res.status(statusCode).json({ message });
};
