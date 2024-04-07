import Auth from "../middleware/auth";
import { prisma } from "../prisma";
import express from "express";
import WorkspaceService from "../services/workspace";
import { upload } from "../utility";

const router = express.Router();

// editor Logic
router
  .route("/upload-video")
  .get(Auth.editorAuth, upload.single("file"), WorkspaceService.uploadVideo);

router
  .route("/upload-to-youtube")
  .post(Auth.userAuth, WorkspaceService.uploadVideoToYoutube);

export default router;
