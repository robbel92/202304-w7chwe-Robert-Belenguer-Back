import { type Request } from "express";

export type UserCredentialsRequest = Request<
  Record<string, any>,
  Record<string, any>,
  UserCredentials
>;

export interface UserCredentials {
  username: string;
  password: string;
}

export interface UserCredentialsWithName {
  name: string;
  password: string;
}
export interface UserStructure {
  _id: string;
  username: string;
  password: string;
}
