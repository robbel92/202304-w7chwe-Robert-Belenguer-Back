import "./server/loadEnvironment.js";

import chalk from "chalk";
import createDebug from "debug";
import { app } from "./server";
const port = process.env.PORT!;

const debug = createDebug("societ-api:root");

app.listen(port, () => {
  debug(chalk.blueBright(`Listening in port ${port}`));
});
