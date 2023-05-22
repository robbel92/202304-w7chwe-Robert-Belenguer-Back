import { MongoMemoryServer } from "mongodb-memory-server";
import connectToDatabase from "../database/connectToDatabase";
import mongoose from "mongoose";
import request from "supertest";
import User from "../database/models/User/User";
import { type UserCredentials } from "../types";
import { app } from "..";
import jwt from "jsonwebtoken";

let server: MongoMemoryServer;

beforeAll(async () => {
  server = await MongoMemoryServer.create();
  await connectToDatabase(server.getUri());
});

afterAll(async () => {
  await mongoose.connection.close();
  await server.stop();
});

afterEach(async () => {
  await User.deleteMany();
});
const mockUserLogin: UserCredentials = {
  username: "Usnary",
  password: "Usnary",
};

const mockUserHashed = {
  name: "Usnary",
  username: "Usnary",
  password: "$2a$12$uoJ3cGR5oGC28bbFVYJsVO0Vgzn6KB16qTK.w4mAhKelQ/TMRDNwC",
  image: "asdfasdf",
  interest: "hola",
  friends: [],
  enemies: [],
};

describe(" Given a POST 'user/login' endpoint", () => {
  describe("When it receives a request with username 'Usnary' and password 'Usnary'", () => {
    beforeEach(async () => {
      await User.create(mockUserHashed);
    });

    test("The it should resnpond a status 200 and token", async () => {
      const expectedStatus = 200;

      const newUser = await User.findOne({
        username: mockUserLogin.username,
      }).exec();

      const response = await request(app)
        .post("/user/login")
        .send(mockUserLogin)
        .expect(expectedStatus);

      const payload = jwt.verify(
        response.body.token as string,
        process.env.JWT_SECRET!
      );

      const userId = payload.sub;

      expect(userId).toEqual(newUser?._id.toString());
    });
  });
});
