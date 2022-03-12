import { Router, Request, Response } from "express";
import tempVideo from "./middleware/temp/video";
import createThumbnail from "./middleware/custom/create-thumbnail";
import convertToMP4 from "./middleware/custom/convert-to-mp4";
import validator from "./middleware/validator/upload";
import clear from "./middleware/clear";
import { uploadController } from "./modular";
const router = Router();

// Upload video
router.post(
  "/videos/:guid",
  tempVideo,
  validator,
  convertToMP4,
  createThumbnail,
  (req: Request, res: Response) => {
    return uploadController.handle(req, res);
  }
);

export { router };
