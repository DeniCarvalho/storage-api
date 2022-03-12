import { UploadController } from "./controller";
import { S3Provider } from "./data";
import { UploadVideoUsecase } from "./domain/usecases";

const s3Provider = new S3Provider();

const uploadVideoUsecase = new UploadVideoUsecase(s3Provider);

const uploadController = new UploadController(uploadVideoUsecase);

export { uploadVideoUsecase, uploadController };
