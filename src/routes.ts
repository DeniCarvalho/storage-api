import { Router, Request, Response } from "express";
import tempVideo from "./middleware/temp/video";
import convertToMP4 from "./middleware/custom/convert-to-mp4";
import updateValidator from "./middleware/validator/upload";
import getValidator from "./middleware/validator/get";
import { fileController } from ".";
const router = Router();

// Upload video
router.post(
  "/videos/:guid",
  tempVideo,
  updateValidator,
  convertToMP4,
  // createThumbnail,
  (req: Request, res: Response) => {
    return fileController.upload(req, res);
  }
);

// Get video
router.get("/videos/:guid", getValidator, (req: Request, res: Response) => {
  return fileController.get(req, res);
});

// Delete video
router.delete("/videos/:guid", getValidator, (req: Request, res: Response) => {
  return fileController.delete(req, res);
});

export { router };
