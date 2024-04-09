import axios, { AxiosDefaults } from "axios";

const fs = require("fs");
const readline = require("readline");
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;

const categoryIds = {
  Entertainment: 24,
  Education: 27,
  ScienceTechnology: 28,
};

const SCOPES = ["https://www.googleapis.com/auth/youtube.upload"];

export function uploadVideo() {
  const oauth2Client = new OAuth2(
    process.env.OAUTH_CLIENT_ID,
    process.env.OAUTH_CLIENT_SECRET,
    process.env.REDIRECT_URL
  );

  // Authorize the client and upload the video
  authorize(oauth2Client, (auth: any) => uploadVideo1(auth));
}

async function uploadVideo1(auth: any) {
  const service = google.youtube("v3");

  const response = await axios.get(process.env.AWS_S3_VIDEO_URL!, {
    responseType: "stream",
  });

  service.videos.insert({
    auth: auth,
    part: "snippet,status",
    requestBody: {
      snippet: {
        title: "this it Title",
        description: "This is desc",
        tags: "tags",
        categoryId: categoryIds.ScienceTechnology,
        defaultLanguage: "en",
        defaultAudioLanguage: "en",
      },
      status: {
        privacyStatus: "private",
      },
    },
    media: {
      body: response.data,
    },
  });
}

function authorize(credentials: any, callback: any) {
  const oauth2Client = new OAuth2();

  oauth2Client.setCredentials({
    access_token: process.env.ACCESS_TOKEN,
    refresh_token: process.env.REFRESH_TOKEN,
    scope: SCOPES,
  });

  callback(oauth2Client);
}
