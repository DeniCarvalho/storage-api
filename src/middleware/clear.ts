import * as fs from "fs";
import { promises as Fs } from "fs";
import { RequestError } from "../core/errors/requestError";

const recursive = async (dir: string) => {
  fs.readdirSync(dir).forEach(async (f) => {
    const isDirectory = fs.lstatSync(`${dir}/${f}`).isDirectory();
    if (!isDirectory) {
      fs.rmSync(`${dir}/${f}`);
    } else {
      await recursive(`${dir}/${f}`);
    }
  });

  const isEmpty = await isEmptyDir(dir);
  if (isEmpty) {
    fs.rmdirSync(`${dir}`);
  }
};

const isEmptyDir = async (path: string) => {
  try {
    const directory = await Fs.opendir(path);
    const entry = await directory.read();
    await directory.close();

    return entry === null;
  } catch (error) {
    return false;
  }
};

const video = async (req: any, res: any, next: any) => {
  try {
    const { guid } = req.params;
    const dirpath = `tmp/videos/${guid}`;
    await recursive(dirpath);
    // fs.rmdirSync(`${dirpath}`, { recursive: true });
    // fs.readdirSync(dirpath).forEach((f) =>
    //   fs.rmSync(`${dirpath}/${f}`, { recursive: true, force: true })
    // );
    next();
  } catch (error) {
    next(new RequestError(error));
  }
};

export default { video, recursive };
