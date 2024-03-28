/*
  Warnings:

  - Added the required column `aws_s3_url` to the `Workspace` table without a default value. This is not possible if the table is not empty.
  - Added the required column `videoName` to the `Workspace` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Workspace" ADD COLUMN     "aws_s3_url" TEXT NOT NULL,
ADD COLUMN     "videoName" TEXT NOT NULL;
