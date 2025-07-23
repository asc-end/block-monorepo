-- CreateEnum
CREATE TYPE "TimeMode" AS ENUM ('blocking', 'limit');

-- CreateEnum
CREATE TYPE "RoutineStatus" AS ENUM ('active', 'paused', 'completed', 'canceled');

-- CreateTable
CREATE TABLE "routines" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "emoji" TEXT NOT NULL DEFAULT '🚀',
    "timeMode" "TimeMode" NOT NULL,
    "selectedDays" TEXT[],
    "startTime" TEXT,
    "endTime" TEXT,
    "dailyLimit" INTEGER,
    "endDate" TIMESTAMP(3),
    "stakeAmount" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "status" "RoutineStatus" NOT NULL DEFAULT 'active',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "routines_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "apps" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "icon" TEXT,
    "domains" TEXT[],
    "androidPackageName" TEXT,
    "iosBundleId" TEXT,
    "category" TEXT,
    "isUserSubmitted" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "apps_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "routine_apps" (
    "routineId" TEXT NOT NULL,
    "appId" TEXT NOT NULL,

    CONSTRAINT "routine_apps_pkey" PRIMARY KEY ("routineId","appId")
);

-- CreateIndex
CREATE INDEX "routines_userId_idx" ON "routines"("userId");

-- CreateIndex
CREATE INDEX "routines_status_idx" ON "routines"("status");

-- CreateIndex
CREATE INDEX "apps_category_idx" ON "apps"("category");

-- CreateIndex
CREATE INDEX "apps_isUserSubmitted_idx" ON "apps"("isUserSubmitted");

-- CreateIndex
CREATE UNIQUE INDEX "apps_androidPackageName_key" ON "apps"("androidPackageName");

-- CreateIndex
CREATE UNIQUE INDEX "apps_iosBundleId_key" ON "apps"("iosBundleId");

-- AddForeignKey
ALTER TABLE "routines" ADD CONSTRAINT "routines_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "routine_apps" ADD CONSTRAINT "routine_apps_routineId_fkey" FOREIGN KEY ("routineId") REFERENCES "routines"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "routine_apps" ADD CONSTRAINT "routine_apps_appId_fkey" FOREIGN KEY ("appId") REFERENCES "apps"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
