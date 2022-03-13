import ffmpeg from "fluent-ffmpeg";

import * as fs from "fs";
import { RequestError } from "../../core/errors/requestError";

const _convert = (output: string, file: any) => {
  return new Promise((resolve: any, reject: any) => {
    try {
      if (!fs.existsSync(file.path)) {
        return reject(new RequestError("Temp folder not exist"));
      }

      var args = [
        "-f",
        "mp4",
        "-c:v",
        "h264_videotoolbox",
        "-b:v",
        "5000k",
        // "-filter_complex",
        // "scale=w=1080:h=1920", // ,lut3d=assets/filters/01.CUBE
        "-crf",
        "18",
        // "-vcodec",
        // "libx264",
        "-preset",
        "faster", // veryfast | faster | fast | medium | slow | slower | veryslow
        "-af",
        "arnndn=m=assets/bd.rnnn:mix=0.9,loudnorm=I=-16:LRA=11:TP=-1.5",
      ];

      ffmpeg(file.path)
        .outputOptions(args)
        .on("end", function () {
          resolve();
        })
        .on("error", function (err) {
          reject(new RequestError(err));
        })
        .save(output);
    } catch (error) {
      reject(new RequestError(error));
    }
  });
};

export default async (req: any, res: any, next: any) => {
  try {
    const { guid } = req.params;
    const file = req.file;
    const dir = `tmp/videos/${guid}`;
    const output = `${dir}/output${process.env.OUTPUT_EXTENSION}`;
    await _convert(output, file);
    next();
  } catch (error) {
    next(error);
  }
};
