import { Request, Response } from "express";
import * as fs from "fs";
import {
  GetVideoUsecase,
  GetAllVideoUsecase,
  UploadVideoUsecase,
  DeleteVideoUsecase,
} from "../domain";
import { RequestError } from "../core/errors/requestError";
import clear from "../middleware/clear";

export class FileController {
  constructor(
    private uploadVideoUsecase: UploadVideoUsecase,
    private getVideoUsecase: GetVideoUsecase,
    private getAllVideoUsecase: GetAllVideoUsecase,
    private deleteVideoUsecase: DeleteVideoUsecase
  ) {}

  async upload(request: Request, response: Response): Promise<Response> {
    const { guid } = request.params;
    const { bucket, key } = request.body;

    const fileDir = `tmp/videos/${guid}/output${process.env.OUTPUT_EXTENSION}`;

    if (!fs.existsSync(fileDir)) {
      throw new RequestError("Local file not exist", 400);
    }
    const fileContent = fs.readFileSync(fileDir);
    await this.uploadVideoUsecase.execute({
      bucket: bucket,
      key: `${key}${process.env.OUTPUT_EXTENSION}`,
      fileContent,
    });
    clear.recursive(`tmp/videos/${guid}`);
    return response.status(201).send();
  }

  async get(request: Request, response: Response): Promise<Response> {
    const { bucket, key } = request.body;
    const data = await this.getVideoUsecase.execute({
      bucket: bucket,
      key: key,
    });
    return response.status(200).send(data);
  }

  async getAll(request: Request, response: Response): Promise<Response> {
    const { bucket, key } = request.body;

    const data = await this.getAllVideoUsecase.execute({
      bucket: bucket,
      key: key,
    });
    return response.status(200).send(data);
  }

  async delete(request: Request, response: Response): Promise<Response> {
    const { bucket, key } = request.body;

    await this.deleteVideoUsecase.execute({
      bucket: bucket,
      key: key,
    });
    return response.status(201).send();
  }
}
