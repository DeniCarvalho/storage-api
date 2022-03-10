import { Router } from "express";
import uploadVideo from "./middleware/upload/video";
import createThumbnail from "./middleware/custom/create-thumbnail";
import convertToMP4 from "./middleware/custom/convert-to-mp4";
import uploadValidator from "./middleware/validator/upload";
import clear from "./middleware/clear";
const router = Router();

router.post(
  "/videos/:guid",
  uploadVideo,
  uploadValidator,
  convertToMP4,
  createThumbnail,
  clear.video,
  (req: Request, res: any) => {
    return res.status(201).send();
  }
);

export { router };
