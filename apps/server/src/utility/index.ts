import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import multer from "multer";
import { google } from "googleapis";
import { OAuth2Client } from "google-auth-library";
const querystring = require("querystring");

const s3Client = new S3Client({
  credentials: {
    accessKeyId: process.env.AWS_USER_ACCESS_KEY as string,
    secretAccessKey: process.env.AWS_USER_SECRET_KEY as string,
  },
  region: "ap-south-1",
});

export async function getSignedUrlForAws(userid: string, fileName: string) {
  const pubtobjectCommand = new PutObjectCommand({
    Bucket: process.env.BUCKET_NAME,
    Key: `uploads/${userid}/video/${fileName}`,
  });
  const signedUrl = getSignedUrl(s3Client, pubtobjectCommand);

  return { getSignedUrl: signedUrl, fileName: fileName };
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./upload");
  },
  filename: function (req, file, cb) {
    const originalname = file.originalname;
    const nameParts = originalname.split(".");
    const extension = nameParts.pop();
    const newName = nameParts.join(".") + "-" + Date.now() + "." + extension;
    cb(null, newName);
  },
});

export const upload = multer({ storage: storage });

export const youtube = google.youtube({
  version: "v3",
  auth: process.env.YOUTUBE_API_KEY,
});

export const oauth2Client = new OAuth2Client({
  clientId: process.env.OAUTH_CLIENT_ID,
  clientSecret: process.env.OAUTH_CLIENT_SECRET,
  redirectUri: process.env.REDIRECT_URL,
});

export const generateAuthUrl = () => {
  return oauth2Client.generateAuthUrl({
    access_type: "offline",
    scope:
      "https://www.googleapis.com/auth/youtube.upload https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email",
  });
};

export const getGoogleAuthURL = () => {
  const rootUrl = "https://accounts.google.com/o/oauth2/v2/auth";
  const options = {
    redirect_uri: `${process.env.REDIRECT_URL}` || "ankit",
    client_id: process.env.OAUTH_CLIENT_ID || "ankit",
    access_type: "offline",
    response_type: "code",
    prompt: "consent",
    scope: [
      "https://www.googleapis.com/auth/userinfo.profile",
      "https://www.googleapis.com/auth/userinfo.email",
      "https://www.googleapis.com/auth/youtube.upload",
    ].join(" "),
  };
  console.log("Redirect URI:", options.redirect_uri);

  return `${rootUrl}?${querystring.stringify(options)}`;
};
