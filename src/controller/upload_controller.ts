import { Request, Response } from "express";
import * as fs from "fs";
import { UploadVideoUsecase } from "../domain";
import { RequestError } from "../errors/requestError";
import clear from "../middleware/clear";

export class UploadController {
  constructor(private uploadVideoUsecase: UploadVideoUsecase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { guid } = request.params;
    const { bucket, path } = request.body;

    const fileDir = !path
      ? `tmp/videos/${guid}/video.mp4`
      : `tmp/videos/${guid}/${path}/video.mp4`;

    const key = path ? `${guid}/${path}/video.mp4` : `${guid}/video.mp4`;

    if (!fs.existsSync(fileDir)) {
      throw new RequestError("Local file not exist", 400);
    }
    const fileContent = fs.readFileSync(fileDir);
    await this.uploadVideoUsecase.execute({
      bucket: bucket,
      key: key,
      fileContent,
    });
    clear.recursive(`tmp/videos/${guid}`);
    return response.status(201).send();
  }
}
