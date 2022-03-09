import * as fs from "fs";
import { RequestError } from "../errors/requestError";

export default async (req: any, res: any, next: any) => {
  try {
    const { guid } = req.params;
    const dirpath = `tmp/videos/${guid}`;
    fs.readdirSync(dirpath).forEach((f) => fs.rmSync(`${dirpath}/${f}`));
    next();
  } catch (error) {
    next(new RequestError(error));
  }
};
