/*
  Warnings:

  - The values [in_progress,finished] on the enum `FocusSessionStatus` will be removed. If these variants are still used in the database, this will fail.
  - The values [paused] on the enum `RoutineStatus` will be removed. If these variants are still used in the database, this will fail.

*/

-- AlterEnum for FocusSessionStatus
BEGIN;
CREATE TYPE "FocusSessionStatus_new" AS ENUM ('active', 'completed', 'canceled');

-- Update data using CASE statement
ALTER TABLE "focus_sessions" ALTER COLUMN "status" TYPE "FocusSessionStatus_new" 
USING (
  CASE 
    WHEN "status"::text = 'in_progress' THEN 'active'
    WHEN "status"::text = 'finished' THEN 'completed'
    WHEN "status"::text = 'canceled' THEN 'canceled'
  END::"FocusSessionStatus_new"
);

ALTER TYPE "FocusSessionStatus" RENAME TO "FocusSessionStatus_old";
ALTER TYPE "FocusSessionStatus_new" RENAME TO "FocusSessionStatus";
DROP TYPE "FocusSessionStatus_old";
COMMIT;

-- AlterEnum for RoutineStatus
BEGIN;
CREATE TYPE "RoutineStatus_new" AS ENUM ('active', 'completed', 'canceled');
ALTER TABLE "routines" ALTER COLUMN "status" DROP DEFAULT;

-- Update data using CASE statement
ALTER TABLE "routines" ALTER COLUMN "status" TYPE "RoutineStatus_new" 
USING (
  CASE 
    WHEN "status"::text = 'paused' THEN 'active'
    WHEN "status"::text = 'active' THEN 'active'
    WHEN "status"::text = 'completed' THEN 'completed'
    WHEN "status"::text = 'canceled' THEN 'canceled'
  END::"RoutineStatus_new"
);

ALTER TYPE "RoutineStatus" RENAME TO "RoutineStatus_old";
ALTER TYPE "RoutineStatus_new" RENAME TO "RoutineStatus";
DROP TYPE "RoutineStatus_old";
ALTER TABLE "routines" ALTER COLUMN "status" SET DEFAULT 'active';
COMMIT;
