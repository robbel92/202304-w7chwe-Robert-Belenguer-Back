import { Schema, Types, model } from "mongoose";

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    min: 3,
  },
  username: {
    type: String,
    required: true,
    min: 5,
  },
  password: {
    type: String,
    required: true,
    min: 5,
  },
  image: {
    type: String,
  },
  interest: {
    type: String,
  },
  friends: {
    type: [Types.ObjectId],
  },
  enemies: {
    type: [Types.ObjectId],
  },
});

const User = model("User", userSchema, "users");

export default User;
