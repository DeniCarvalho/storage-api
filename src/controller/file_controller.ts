import { Request, Response } from "express";
import * as fs from "fs";
import {
  GetVideoUsecase,
  UploadVideoUsecase,
  DeleteVideoUsecase,
} from "../domain";
import { RequestError } from "../core/errors/requestError";
import clear from "../middleware/clear";

export class FileController {
  constructor(
    private uploadVideoUsecase: UploadVideoUsecase,
    private getVideoUsecase: GetVideoUsecase,
    private deleteVideoUsecase: DeleteVideoUsecase
  ) {}

  async upload(request: Request, response: Response): Promise<Response> {
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

  async get(request: Request, response: Response): Promise<Response> {
    const { guid } = request.params;
    const { bucket, path } = request.body;
    const key = !path ? `${guid}/video.mp4` : `${guid}/${path}/video.mp4`;

    const data = await this.getVideoUsecase.execute({
      bucket: bucket,
      key: key,
    });
    return response.status(200).send(data);
  }

  async delete(request: Request, response: Response): Promise<Response> {
    const { guid } = request.params;
    const { bucket, path } = request.body;
    const key = !path ? `${guid}/video.mp4` : `${guid}/${path}/video.mp4`;

    await this.deleteVideoUsecase.execute({
      bucket: bucket,
      key: key,
    });
    return response.status(201).send();
  }
}
