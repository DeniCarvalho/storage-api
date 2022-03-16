require("dotenv-safe").config();
import { FileController } from "./controller";
import { S3Provider } from "./data";
import {
  UploadVideoUsecase,
  GetVideoUsecase,
  GetAllVideoUsecase,
  DeleteVideoUsecase,
} from "./domain/usecases";

const s3Provider = new S3Provider();

const uploadVideoUsecase = new UploadVideoUsecase(s3Provider);
const getVideoUsecase = new GetVideoUsecase(s3Provider);
const getAllVideoUsecase = new GetAllVideoUsecase(s3Provider);
const deleteVideoUsecase = new DeleteVideoUsecase(s3Provider);

const fileController = new FileController(
  uploadVideoUsecase,
  getVideoUsecase,
  getAllVideoUsecase,
  deleteVideoUsecase
);

export {
  uploadVideoUsecase,
  getVideoUsecase,
  getAllVideoUsecase,
  deleteVideoUsecase,
  fileController,
};
