import { Router, Request, Response } from "express";
import tempVideo from "./middleware/temp/video";
import convertToMP4 from "./middleware/custom/convert-to-mp4";
import uploadValidator from "./middleware/validator/upload";
import getValidator from "./middleware/validator/get";
import { fileController } from ".";
const router = Router();

// Upload video
router.post(
  "/videos/:guid",
  tempVideo,
  uploadValidator,
  convertToMP4,
  // createThumbnail,
  (req: Request, res: Response) => {
    return fileController.upload(req, res);
  }
);

// Get video
router.get("/videos", getValidator, (req: Request, res: Response) => {
  return fileController.get(req, res);
});

// Get all video
router.get("/videos/all", getValidator, (req: Request, res: Response) => {
  return fileController.getAll(req, res);
});

// Delete video
router.delete("/videos", getValidator, (req: Request, res: Response) => {
  return fileController.delete(req, res);
});

export { router };
