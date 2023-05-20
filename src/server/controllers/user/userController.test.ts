import { type NextFunction, type Response } from "express";

import jwt from "jsonwebtoken";
import User from "../../database/models/User/User";
import { Types } from "mongoose";
import bcrypt from "bcryptjs";
import { loginUser } from "./userController";
import { type UserCredentialsRequest, type UserStructure } from "../../types";
import CustomError from "../../CustomError/CustomError";

beforeEach(() => {
  jest.clearAllMocks();
});

type CustomResponse = Pick<Response, "status" | "json">;

describe("Given a loginUser middleware", () => {
  const validUser = {
    password: "Usnary",
    username: "Usnary",
  };

  const req: Pick<UserCredentialsRequest, "body"> = {
    body: validUser,
  };

  bcrypt.compare = jest.fn().mockResolvedValue(true);

  const user: UserStructure = {
    _id: new Types.ObjectId().toString(),
    username: "Usnary",
    password: "passwordhasheada",
  };

  const token = "un buen token ahí!";

  User.findOne = jest.fn().mockReturnValue({
    exec: jest.fn().mockResolvedValue(user),
  });

  jwt.sign = jest.fn().mockReturnValue(token);

  const expectedStatusCode = 200;

  const next = jest.fn();

  const res: CustomResponse = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };
  describe("When it receives a request with a valid credentials", () => {
    test("Then it should call a response's status method with a status code 200", async () => {
      await loginUser(
        req as UserCredentialsRequest,
        res as Response,
        next as NextFunction
      );

      expect(res.status).toHaveBeenCalledWith(expectedStatusCode);
    });
    test("Then it should call the response's method json with token", async () => {
      await loginUser(
        req as UserCredentialsRequest,
        res as Response,
        next as NextFunction
      );

      expect(res.json).toHaveBeenCalledWith({ token });
    });
  });
  describe("When it receives a invalid credentials and next function", () => {
    test("Then it should call the next function with error 'Invalid credentials' and status 401", async () => {
      const error = new CustomError("Invalid credentials", 401);
      const invalidUser = {
        password: "Usnary",
        username: "Uary",
      };

      const reqInvalid: Pick<UserCredentialsRequest, "body"> = {
        body: invalidUser,
      };
      bcrypt.compare = jest.fn().mockResolvedValue(false);
      await loginUser(
        reqInvalid as UserCredentialsRequest,
        res as Response,
        next as NextFunction
      );

      expect(next).toHaveBeenCalledWith(error);
    });
  });
});
