import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const s3Client = new S3Client({
  credentials: {
    accessKeyId: process.env.AWS_USER_ACCESS_KEY as string,
    secretAccessKey: process.env.AWS_USER_SECRET_KEY as string,
  },
  region: "ap-south-1",
});

export async function getSignedUrlForAws(userid: string) {
  const fileName = Date.now().toString();

  const pubtobjectCommand = new PutObjectCommand({
    Bucket: process.env.BUCKET_NAME,
    Key: `uploads/${userid}/video/${fileName}`,
  });
  const signedUrl = getSignedUrl(s3Client, pubtobjectCommand);

  return { getSignedUrl: signedUrl, fileName };
}
