import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import multer from "multer";

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
