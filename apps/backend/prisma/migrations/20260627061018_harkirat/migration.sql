/*
  Warnings:

  - You are about to drop the column `githubMetaData` on the `Interview` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Interview" DROP COLUMN "githubMetaData",
ADD COLUMN     "feedback" TEXT,
ADD COLUMN     "githubMetadata" JSONB;

-- AlterTable
ALTER TABLE "Message" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
