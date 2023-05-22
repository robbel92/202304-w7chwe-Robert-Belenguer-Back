import { type NextFunction, type Request, type Response } from "express";
import User from "../../database/models/User/User";

export const getContacts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const contacts = await User.find().exec();
    res.status(200).json({ contacts });
  } catch (error: unknown) {
    next(error);
  }
};
