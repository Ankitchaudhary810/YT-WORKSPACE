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

const privateKey = fs.readFileSync(
  "./src/routes/client_secret_1046797363940-ee4ntsgg3c7esq8tdn1m7iaeol52q7ni.apps.googleusercontent.com.json"
);

const auth = new google.auth.GoogleAuth(
  {
    credentials: {
      client_email: "ankitchaudhary810@gmail.com",
      private_key: privateKey,
    },
    scopes: ["https://www.googleapis.com/auth/youtube.upload"],
  },
  console.log("GoogleAuth")
);

const youtube = google.youtube({
  version: "v3",
  auth: auth,
});

async function uploadVideo() {
  try {
    console.log("uploadVideo");
    const video = await axios.get(process.env.AWS_S3_VIDEO_URL!, {
      responseType: "stream",
    });

    const response = await youtube.videos.insert({
      part: "snippet,status",
      requestBody: {
        snippet: {
          title: "My Test Video",
          description: "Description of my test video",
        },
        status: {
          privacyStatus: "private",
        },
      },
      media: {
        body: video.data,
      },
    });

    console.log("Video uploaded:", response.data);
  } catch (error) {
    console.error("Error uploading video:", error);
  }
}

uploadVideo();

export default router;
