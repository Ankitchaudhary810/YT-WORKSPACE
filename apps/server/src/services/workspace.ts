import { NextFunction, Request, Response } from "express";
import { prisma } from "../prisma";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import axios from "axios";
import { getSignedUrlForAws, youtube } from "../utility";
import fs from "fs";
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

  public static async uploadVideoToYoutube(req: Request, res: Response) {
    const videoDetails = {
      title: "Video Title",
      description: "Video Description",
      tags: ["tag1", "tag2", "tag3"],
      categoryId: "22",
      privacyStatus: "private",
    };

    const response = await axios.get(process.env.AWS_S3_VIDEO_URL!, {
      responseType: "stream",
    });

    const upldateStatus = await youtube.videos.insert({
      part: ["snippet", "status"],
      requestBody: {
        snippet: {
          title: videoDetails.title,
          description: videoDetails.description,
          tags: videoDetails.tags,
          categoryId: videoDetails.categoryId,
        },
        status: {
          privacyStatus: videoDetails.privacyStatus,
        },
      },
      media: {
        mimeType: "video/*",
        body: response.data,
      },
    });

    console.log("Video uploaded to YouTube:", upldateStatus.data);
  }
}

export default WorkspaceService;
