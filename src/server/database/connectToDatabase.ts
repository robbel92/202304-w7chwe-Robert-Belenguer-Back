import chalk from "chalk";
import createDebug from "debug";
import mongoose from "mongoose";

const debug = createDebug("societ-api:connectDatabase");

const connectToDatabase = async (connectionDatabase: string) => {
  try {
    mongoose.set("debug", true);
    mongoose.set("toJSON", {
      virtuals: true,
      versionKey: false,
      transform(doc, ret) {
        delete ret._id;
      },
    });
    await mongoose.connect(connectionDatabase);
  } catch (error: unknown) {
    debug(
      chalk.redBright(`Error connecting database ${(error as Error).message}`)
    );
  }
};

export default connectToDatabase;
