import "./server/loadEnvironment.js";

import chalk from "chalk";
import createDebug from "debug";
import { app } from "./server/index.js";
import connectToDatabase from "./server/database/connectToDatabase.js";
const port = process.env.PORT ?? 4000;

const debug = createDebug("societ-api:root");

const mongoDbConnection = process.env.MONGODB_CONNECTION!;

await connectToDatabase(mongoDbConnection);

app.listen(port, () => {
  debug(chalk.blueBright(`Listening in port ${port}`));
});
