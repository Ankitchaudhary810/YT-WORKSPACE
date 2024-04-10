import Auth from "../middleware/auth";
import { prisma } from "../prisma";
import express from "express";
import WorkspaceService from "../services/workspace";
import { oauth2Client, upload } from "../utility";
import { google } from "googleapis";

const router = express.Router();

// editor Logic
router
  .route("/upload-video")
  .get(Auth.editorAuth, upload.single("file"), WorkspaceService.uploadVideo);

const oAuth2Client = new google.auth.OAuth2({
  clientId: process.env.OAUTH_CLIENT_ID,
  clientSecret: process.env.OAUTH_CLIENT_SECRET,
  redirectUri: process.env.REDIRECT_URL,
});

const isAuthenticated = false;

router.get("/yt-upload", (req, res) => {
  if (!isAuthenticated) {
    var url = oauth2Client.generateAuthUrl({
      access_type: "offline",
      scope: [
        "https://www.googleapis.com/auth/youtube.upload https://www.googleapis.com/auth/userinfo.profile",
      ].join(" "),
    });

    return res.json(url);
  }
});

export default router;
