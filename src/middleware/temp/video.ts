import multer from "multer";
import * as fs from "fs";
import { RequestError } from "af-utils-node";
import clear from "../clear";

import mime from "mime";

async function ensureDirSync(dirpath: string) {
  try {
    return fs.mkdirSync(dirpath);
  } catch (err) {
    if (err.code !== "EEXIST") throw new RequestError(err);
    else {
      await clear.recursive(dirpath);
    }
  }
}

export default async (req: any, res: any, next: any) => {
  const { guid } = req.params;
  const pathRoot = `tmp/videos/${guid}`;
  const storage = multer.diskStorage({
    destination: function (_req, _file, cb) {
      ensureDirSync(pathRoot);
      cb(null, pathRoot);
    },
    filename: async function (_req, _file, cb) {
      const arrString = _file.originalname.split(".");
      const extension = arrString[arrString.length - 1];
      const filename = `original.${extension}`;

      cb(null, filename);
    },
  });

  const fileFilter = (req: any, file: any, cb: any) => {
    const whitelist = ["video/mp4"];
    const _mime = mime.lookup(file.originalname);
    if (!whitelist.includes(_mime)) {
      cb("Unsupported file", false);
    } else {
      cb(null, true);
    }
  };

  const upload = multer({
    storage: storage,
    limits: {
      fieldNameSize: 300,
      fileSize: 52428800, // 50MB
    },
    fileFilter: fileFilter,
  });

  upload.single("video")(req, res, async function (err: any) {
    try {
      if (err instanceof multer.MulterError) {
        throw new RequestError(err.message, 400);
      } else if (err) {
        throw new RequestError(err, 500);
      }

      next();
    } catch (error) {
      next(error);
    }
  });
};
