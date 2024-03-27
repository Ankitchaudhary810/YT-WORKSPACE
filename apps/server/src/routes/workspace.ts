import Auth from "../middleware/auth";
import { prisma } from "../prisma";
import express from "express";
import WorkspaceService from "../services/workspace";

const router = express.Router();

// editor Logic
router
  .route("/upload-video")
  .post(Auth.editorAuth, WorkspaceService.uploadVideo);

router.route("/get-signed-url").get(WorkspaceService.GetSignedUrlForVideo);

export default router;
