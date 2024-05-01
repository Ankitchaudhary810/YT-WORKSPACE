/*
  Warnings:

  - Added the required column `name` to the `Video_Editor` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Video_Editor" ADD COLUMN     "name" TEXT NOT NULL;
