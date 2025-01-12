/*
  Warnings:

  - You are about to drop the column `age` on the `BloodSugarRecord` table. All the data in the column will be lost.
  - You are about to drop the column `condition` on the `BloodSugarRecord` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `BloodSugarRecord` table. All the data in the column will be lost.
  - You are about to drop the column `time` on the `BloodSugarRecord` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `BloodSugarRecord` table. All the data in the column will be lost.
  - You are about to alter the column `date` on the `BloodSugarRecord` table. The data in that column could be lost. The data in that column will be cast from `String` to `DateTime`.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_BloodSugarRecord" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "bloodSugar" REAL NOT NULL,
    "date" DATETIME NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "BloodSugarRecord_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_BloodSugarRecord" ("bloodSugar", "createdAt", "date", "id", "updatedAt", "userId") SELECT "bloodSugar", "createdAt", "date", "id", "updatedAt", "userId" FROM "BloodSugarRecord";
DROP TABLE "BloodSugarRecord";
ALTER TABLE "new_BloodSugarRecord" RENAME TO "BloodSugarRecord";
CREATE INDEX "BloodSugarRecord_userId_idx" ON "BloodSugarRecord"("userId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
