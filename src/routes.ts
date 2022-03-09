import { Router } from "express";
import uploadVideo from "./middleware/upload/video";
import createThumbnail from "./middleware/custom/create-thumbnail";
import convertToMP4 from "./middleware/custom/convert-to-mp4";

const router = Router();

router.post(
  "/videos/:guid",
  uploadVideo,
  convertToMP4,
  createThumbnail,
  (req: Request, res: any) => {
    return res.status(201).send();
  }
);

export { router };
