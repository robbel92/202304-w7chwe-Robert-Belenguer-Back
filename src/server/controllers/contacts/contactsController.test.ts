import { type NextFunction, type Request, type Response } from "express";
import User from "../../database/models/User/User";
import { contactsMock } from "../../../mocks/contactsMocks";
import { getContacts } from "./contactsController";

type CustomResponse = Pick<Response, "status" | "json">;

const res: CustomResponse = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
};

const next = jest.fn();
beforeEach(() => {
  jest.clearAllMocks();
});
describe("Given a getContacts function", () => {
  const req = {};
  describe("When it is invoked with a response", () => {
    User.find = jest.fn().mockReturnValue({
      exec: jest.fn().mockResolvedValue(contactsMock),
    });
    test("Then it should call the method status with 200", async () => {
      const expectedStatusCode = 200;

      await getContacts(req as Request, res as Response, next as NextFunction);

      expect(res.status).toHaveBeenCalledWith(expectedStatusCode);
    });

    test("Then it should call the method json with a collection of contacts", async () => {
      const collectionOfContacts = contactsMock;

      await getContacts(req as Request, res as Response, next as NextFunction);

      expect(res.json).toHaveBeenCalledWith(collectionOfContacts);
    });
  });
  describe("When it is receives a next function and the method exec throw an error", () => {
    test("Then it should call the next function with error 'Error with database'", async () => {
      const error = new Error("Error with database");

      User.find = jest.fn().mockReturnValue({
        exec: jest.fn().mockRejectedValue(error),
      });

      await getContacts(req as Request, res as Response, next as NextFunction);

      expect(next).toHaveBeenCalledWith(error);
    });
  });
});
