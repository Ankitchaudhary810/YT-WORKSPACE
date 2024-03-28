import Auth from "../middleware/auth";
import { prisma } from "../prisma";
import express from "express";
import WorkspaceService from "../services/workspace";

const router = express.Router();

// editor Logic
router
  .route("/upload-video")
  .get(Auth.editorAuth, WorkspaceService.uploadVideo);

export default router;
