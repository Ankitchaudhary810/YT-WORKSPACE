import { NextFunction, Request, Response } from "express";
import { prisma } from "../prisma";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import axios from "axios";
import { getSignedUrlForAws } from ".";
import fs from "fs";
class WorkspaceService {
  public static async uploadVideo(req: Request, res: Response) {
    try {
      const id = req.headers["userId"];
      if (typeof id !== "string") return;

      const editor = await prisma.video_Editor.findUnique({
        where: {
          id: id,
        },
      });

      if (!editor) return res.sendStatus(403);

      const userid = editor.userId;
      if (!userid) return;

      const { getSignedUrl, fileName } = await getSignedUrlForAws(userid);
      if (!getSignedUrl) return;

      const user = await prisma.user.findUnique({
        where: {
          id: userid,
        },
      });

      if (!user) return res.sendStatus(403);

      const file_pat = "../server/upload/auth-service.mp4";
      const videoFileData = fs.readFileSync(file_pat);

      // upload logic
      const response = await axios.put(await getSignedUrl, videoFileData, {
        headers: {
          "Content-Type": "video/mp4",
        },
      });

      console.log("Upload response:", response.data);

      const aws_video_url: string =
        "https://yt-workspace.s3.ap-south-1.amazonaws.com/uploads/" +
        userid +
        "/video/" +
        fileName;

      const workspace = await prisma.workspace.create({
        data: {
          title: "adsklfj",
          description: "asdlk",
          status: "PENDING",
          aws_s3_url: aws_video_url,
          videoName: fileName,
          uploadedBy: {
            connect: { id: userid },
          },
        },
      });
      return res.sendStatus(200);
    } catch (error) {
      console.log("Error in uploadVideo", error);
      return res.status(501).json({ msg: "Internal Server Error" });
    }
  }
}

export default WorkspaceService;
