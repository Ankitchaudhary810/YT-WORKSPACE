import { NextFunction, Request, Response, json } from "express";
import { prisma } from "../prisma";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import axios from "axios";
import { generateAuthUrl, getSignedUrlForAws, oauth2Client } from "../utility";
import fs from "fs";
const { google } = require("googleapis");

class WorkspaceService {
  public static async uploadVideo(req: Request, res: Response) {
    try {
      // console.log(req.file?.filename);
      const id = req.headers["userId"];
      if (typeof id !== "string") return res.sendStatus(403);

      const editor = await prisma.video_Editor.findUnique({
        where: {
          id: id,
        },
      });

      if (!editor) return res.sendStatus(403);

      const userid = editor.userId;
      if (!userid) return res.sendStatus(403);

      const user = await prisma.user.findUnique({
        where: {
          id: userid,
        },
      });

      if (!user) return res.sendStatus(403);

      if (!req.file?.filename) return res.sendStatus(403);

      const { getSignedUrl, fileName } = await getSignedUrlForAws(
        userid,
        req.file?.filename
      );
      if (!getSignedUrl) return;

      const file_pat = `../server/upload/${req.file?.filename}`;
      const videoFileData = fs.readFileSync(file_pat);

      // upload logic
      const response = await axios.put(await getSignedUrl, videoFileData, {
        headers: {
          "Content-Type": "video/mp4",
        },
      });

      console.log("Upload response:", response.data);

      const aws_video_url: string =
        process.env.AWS_USER_VIDEO_PATH + userid + "/video/" + fileName;

      const workspace = await prisma.workspace.create({
        data: {
          status: "PENDING",
          aws_s3_url: aws_video_url,
          videoName: fileName,
          uploadedBy: {
            connect: { id: userid },
          },
        },
      });

      // remove the file from the server
      fs.unlinkSync(file_pat);

      return res.sendStatus(200);
    } catch (error) {
      console.log("Error in uploadVideo", error);
      return res.status(501).json({ msg: "Internal Server Error" });
    }
  }

  public static async handleGetVideoById(req: Request, res: Response) {
    try {
      const id = req.params.id;
      if (!id) return;

      const video = await prisma.workspace.findFirst({
        where: {
          id: id,
        },
      });

      if (!video) return res.status(403);

      return res.status(200).json(video);
    } catch (error) {
      console.log("Error in handleGetVideoById", error);
      return res.status(501).json({ msg: "Internal Server Error" });
    }
  }

  public static async handleGetUserWorkspaces(req: Request, res: Response) {
    try {
      const userId = req.headers["userId"];
      if (!userId) return;
      if (typeof userId !== "string") return;
      const workspaces = await prisma.user.findFirst({
        where: {
          id: userId,
        },
        select: {
          workspace: true,
        },
      });
      return res.json(workspaces?.workspace);
    } catch (error) {
      console.log("Error in handleGetUserWorkspaces", error);
      return res.status(501).json({ msg: "Internal Server Error" });
    }
  }

  public static async handleUpdateWorkspaceById(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const { title, description } = req.body;
      console.log({ title, description });
      if (!id || typeof id !== "string") return;
      const workspace = await prisma.workspace.update({
        where: {
          id: id,
        },
        data: {
          title,
          description,
        },
      });
      return res.status(200).json(workspace);
    } catch (error) {
      console.log("Error in handleUpdateWorkspaceById", error);
      return res.status(501).json({ msg: "Internal Server Error" });
    }
  }

  public static async handleVerifyUser(req: Request, res: Response) {
    const url = generateAuthUrl();
    return res.status(200).json(url);
  }

  public static async handleAuth(req: Request, res: Response) {
    const code: any = req.query.code; //FIXME: code type
    console.log("code: ", code);
    if (code) {
      oauth2Client.getToken(code, function (err, token) {
        if (err) throw err;
        console.log("user authenticated.");
        oauth2Client.setCredentials(token!);
        res.send("Verified.. Close the Window And Upload the Content.");
      });
    }
  }

  public static async handleVideoUploadToYoutube(req: Request, res: Response) {
    try {
      const service = google.youtube("v3");
      const id = req.params.id;
      if (!id) return res.status(404);

      const workspace = await prisma.workspace.findFirst({
        where: {
          id: id,
        },
      });
      if (!workspace) return res.status(404);
      const videoUrl = `${process.env.AWS_S3_VIDEO_URL}/${workspace.userId}/video/${workspace.videoName}`;
      console.log(videoUrl);
      const video = await axios.get(videoUrl, {
        responseType: "stream",
      });

      if (!video.data) {
        return res.status(404).send("Video not found On AWS s3");
      }

      const response = await service.videos.insert({
        auth: oauth2Client,
        part: "snippet,status",
        requestBody: {
          snippet: {
            title: workspace?.title,
            description: workspace?.description,
            defaultLanguage: "en",
            defaultAudioLanguage: "en",
          },
          status: {
            privacyStatus: "private",
          },
        },
        media: {
          body: video?.data,
        },
      });

      console.log("Video uploaded, response data:", response.data);
      res.status(200).send("Video uploaded successfully");
    } catch (err) {
      console.error("The API returned an error:", err);
      res.status(500).send("Failed to upload video due to an error.");
    }
  }
}
export default WorkspaceService;
