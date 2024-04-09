import axios, { AxiosDefaults } from "axios";
import { oauth2Client } from "../utility";

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
const TOKEN_PATH = "../" + "client_oauth_token.json";

const oauth_path = "../../apps/server/client_secret.json";
export function uploadVideo() {
  fs.readFile(
    oauth_path,
    function processClientSecrets(err: any, content: any) {
      if (err) {
        console.log("Error loading client secret file: " + err);
        return;
      }

      authorize(JSON.parse(content), (auth: any) => uploadVideo1(auth));
    }
  );
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
  console.log(credentials);
  console.log("token path", TOKEN_PATH);
  if (
    !credentials ||
    !credentials.installed ||
    !credentials.installed.client_secret ||
    !credentials.installed.client_id
  ) {
    console.error("Invalid credentials format.");
    return;
  }

  const clientSecret = credentials.installed.client_secret;
  const clientId = credentials.installed.client_id;
  const redirectUrl = credentials.installed.redirect_uris[0];
  const oauth2Client = new OAuth2(clientId, clientSecret, redirectUrl);

  // Check if we have previously stored a token.
  fs.readFile(TOKEN_PATH, function (err: any, token: any) {
    if (err) {
      getNewToken(oauth2Client, callback);
    } else {
      oauth2Client.credentials = JSON.parse(token);
      callback(oauth2Client);
    }
  });
}

function getNewToken(credentials: any, callback: any) {
  const authUrl = oauth2Client.generateAuthUrl({
    access_type: "offline",
    scope: SCOPES,
  });
  console.log("Authorize this app by visiting this url: ", authUrl);
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  rl.question("Enter the code from that page here: ", function (code: any) {
    rl.close();
    oauth2Client.getToken(code, function (err, token) {
      if (err) {
        console.log("Error while trying to retrieve access token", err);
        return;
      }
      if (!token) {
        console.log("No token received.");
        return;
      }
      oauth2Client.credentials = token;
      storeToken(token);
      callback(oauth2Client);
    });
  });
}

function storeToken(token: any) {
  fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err: any) => {
    if (err) throw err;
    console.log("Token stored to" + TOKEN_PATH);
  });
}
