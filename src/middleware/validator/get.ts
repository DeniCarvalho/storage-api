import { RequestError } from "../../core/errors/requestError";

export default async (req: any, res: any, next: any) => {
  const { bucket, key } = req.body;
  if (!bucket) {
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
