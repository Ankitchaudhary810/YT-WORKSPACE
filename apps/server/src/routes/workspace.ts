import Auth from "../middleware/auth";
import { prisma } from "../prisma";
import express from "express";
import WorkspaceService from "../services/workspace";
import { oauth2Client, upload } from "../utility";
import axios from "axios";

const { google } = require("googleapis");
const fs = require("fs");

const router = express.Router();

// editor Logic
router
  .route("/upload-video")
  .get(Auth.editorAuth, upload.single("file"), WorkspaceService.uploadVideo);

router
  .route("/get-video-by-id/:id")
  .get(Auth.userAuth, WorkspaceService.handleGetVideoById);

router
  .route("/get-user-workspaces")
  .get(Auth.userAuth, WorkspaceService.handleGetUserWorkspaces);

router
  .route("/update-workspace-by-id/:id")
  .post(Auth.userAuth, WorkspaceService.handleUpdateWorkspaceById);

router.route("/verify-auth").get(WorkspaceService.handleVerifyUser);

export default router;
