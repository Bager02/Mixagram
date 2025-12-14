/*
  Warnings:

  - You are about to drop the column `post_image` on the `post` table. All the data in the column will be lost.
  - You are about to drop the column `post_image_mime` on the `post` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `post` DROP COLUMN `post_image`,
    DROP COLUMN `post_image_mime`,
    ADD COLUMN `post_image_url` VARCHAR(191) NULL;
