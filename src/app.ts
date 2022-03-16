import express from "express";
import * as fs from "fs";

import { handle404, handleError } from "af-utils-node";
import { router } from "./routes";

require("dotenv-safe").config();

const app = express();

if (!fs.existsSync("tmp")) {
  fs.mkdirSync("tmp");
}
if (!fs.existsSync("tmp/videos")) {
  fs.mkdirSync("tmp/videos");
}
if (!fs.existsSync("tmp/images")) {
  fs.mkdirSync("tmp/images");
}

app.use(express.json());
app.use(router);

app.use(handle404);
app.use((error: any, req: any, res: any, _: any) => {
  handleError(error, req, res, _);
});

export { app };
