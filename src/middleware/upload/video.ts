import multer from "multer";
import * as fs from "fs";
import { RequestError } from "../../errors/requestError";
import mime from "mime";

function ensureDirSync(dirpath: string) {
  try {
    return fs.mkdirSync(dirpath);
  } catch (err) {
    if (err.code !== "EEXIST") throw new RequestError(err);
    else {
      fs.readdirSync(dirpath).forEach((f) => fs.rmSync(`${dirpath}/${f}`));
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
      const whitelist = ["video/mp4"];
      const _mime = mime.lookup(_file.originalname);
      if (!whitelist.includes(_mime)) {
        throw new RequestError("Unsupported file", 500);
      }
      const arrString = _file.originalname.split(".");
      const extension = arrString[arrString.length - 1];
      const filename = `original.${extension}`;

      cb(null, filename);
    },
  });

  const upload = multer({ storage: storage });

  upload.single("video")(req, res, async function (err: any) {
    try {
      if (err instanceof multer.MulterError) {
        throw new RequestError(err.message, 500);
      } else if (err) {
        throw new RequestError(err, 500);
      }

      next();
    } catch (error) {
      next(error);
    }
  });
};
