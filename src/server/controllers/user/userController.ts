import { type Response, type NextFunction } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

import User from "../../database/models/User/User.js";
import CustomError from "../../CustomError/CustomError.js";
import { type UserCredentialsRequest } from "../../types.js";

export const loginUser = async (
  req: UserCredentialsRequest,
  res: Response,
  next: NextFunction
) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username }).exec();

    if (!user || !(await bcrypt.compare(password, user.password))) {
      const customError = new CustomError("Not validate credentials", 401);

      throw customError;
    }

    const tokenPaylod = {
      sub: user._id.toString(),
      user: user.username,
    };

    const token = jwt.sign(tokenPaylod, process.env.JWT_SECRET!);

    res.status(200).json({ token });
  } catch (error) {
    next(error);
  }
};
