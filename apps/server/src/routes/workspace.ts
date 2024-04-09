import Auth from "../middleware/auth";
import { prisma } from "../prisma";
import express from "express";
import WorkspaceService from "../services/workspace";
import { upload } from "../utility";
import { uploadVideo } from "../services/test";

const router = express.Router();

// editor Logic
router
  .route("/upload-video")
  .get(Auth.editorAuth, upload.single("file"), WorkspaceService.uploadVideo);

// Testing Mode.
router.get("/upload-to-youtube", async (req: any, res: any) => {
  try {
    await uploadVideo();
    res.status(200).send("Video uploaded successfully.");
  } catch (error) {
    console.error("Error uploading video:", error);
    res.status(500).send("Failed to upload video.");
  }
});

router.post("/upload-video-testing", async (req: any, res: any) => {
  try {
    await uploadVideo();
    res.status(200).send("Video uploaded successfully.");
  } catch (error) {
    console.error("Error uploading video:", error);
    res.status(500).send("Failed to upload video.");
  }
});

export default router;
