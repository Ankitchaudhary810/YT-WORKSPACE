import { NextFunction, Request, Response } from "express";
import { prisma } from "../prisma";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const s3Client = new S3Client({
  credentials: {
    accessKeyId: process.env.AWS_USER_ACCESS_KEY as string,
    secretAccessKey: process.env.AWS_USER_SECRET_KEY as string,
  },
  region: "ap-south-1",
});

class WorkspaceService {
  public static async uploadVideo(req: Request, res: Response) {
    try {
    } catch (error) {}
  }

  public static async GetSignedUrlForVideo(req: Request, res: Response) {
    try {
      const acutalUserId = "12345677"; // put actual user id
      const pubtobjectCommand = new PutObjectCommand({
        Bucket: process.env.BUCKET_NAME,
        Key: `uploads/${acutalUserId}/video/${Date.now().toString()}`,
      });
      const signedUrl = await getSignedUrl(s3Client, pubtobjectCommand);
      return res.json(signedUrl);
    } catch (error) {
      console.log("Error in GetSignedUrlForVideo", error);
      return res.status(501).json({ msg: "Internal Server Error" });
    }
  }
}

export default WorkspaceService;
