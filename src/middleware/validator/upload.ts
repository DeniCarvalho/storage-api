import { RequestError } from "af-utils-node";
import * as fs from "fs";

export default async (req: any, res: any, next: any) => {
  const { guid } = req.params;
  const { bucket, key } = req.body;
  if (!guid) {
    return next(new RequestError("Guid is required"));
  }
  if (!bucket) {
    const { guid } = req.params;
    const dirpath = `tmp/videos/${guid}`;
    fs.readdirSync(dirpath).forEach((f) => fs.rmSync(`${dirpath}/${f}`));
    return next(new RequestError("Bucket is required"));
  }

  if (!key) {
    return next(new RequestError("Key is required"));
  }

  if (key) {
    let tempDir = key.trim().toLowerCase();
    const firstChar = tempDir.charAt(0);
    if (firstChar == "/") {
      tempDir = tempDir.substring(1);
    }

    const lastChar = tempDir.substr(tempDir.length - 1);
    if (lastChar == "/") {
      tempDir = tempDir.slice(0, tempDir.length - 1);
    }

    const objects = tempDir.split("/");
    let isValid = true;
    for (let index = 0; index < objects.length; index++) {
      const obj = objects[index];
      const regex = new RegExp(/^([a-zA-Z0-9-/]+)$/);
      if (obj && !regex.test(obj)) {
        isValid = false;
        break;
      }
    }
    if (!isValid) return next(new RequestError("Invalid Key"));
  }
  next();
};
