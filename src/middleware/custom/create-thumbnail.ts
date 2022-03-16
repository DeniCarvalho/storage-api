import * as fs from "fs";
import { RequestError } from "af-utils-node";

var spawn = require("child_process").spawn;

const _create = (output: string, file: string) => {
  return new Promise((resolve: any, reject: any) => {
    try {
      if (!fs.existsSync(file)) {
        return reject(new RequestError("Temp folder not exist"));
      }

      var args = ["-y", "-i", file, "-frames:v", "1", output];

      const proc = spawn("ffmpeg", args);
      proc.on("exit", () => {
        resolve();
      });

      // proc.stdout.on("data", (data: any) => {
      //   console.log(data);
      //   resolve("success!");
      // });

      // proc.stderr.setEncoding("utf8");

      // proc.stderr.on("data", (data: any) => {
      //   reject(new RequestError(data));
      // });

      // proc.on("close", () => {
      //   console.log("custom finished");
      // });
    } catch (error) {
      reject(new RequestError(error));
    }
  });
};

export default async (req: any, res: any, next: any) => {
  try {
    const { guid } = req.params;
    const dir = `tmp/videos/${guid}`;
    const file = `${dir}/output${process.env.OUTPUT_EXTENSION}`;
    const output = `${dir}/thumbnail.jpg`;
    await _create(output, file);
    next();
  } catch (error) {
    next(error);
  }
};
