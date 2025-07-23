-- CreateEnum
CREATE TYPE "FocusSessionStatus" AS ENUM ('in_progress', 'canceled', 'finished');

-- CreateEnum
CREATE TYPE "Platform" AS ENUM ('mobile', 'web');

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "walletAddress" TEXT NOT NULL,
    "theme" TEXT NOT NULL DEFAULT 'system',
    "timezone" TEXT NOT NULL DEFAULT 'UTC',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "focus_sessions" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "startTime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "duration" INTEGER NOT NULL,
    "status" "FocusSessionStatus" NOT NULL,

    CONSTRAINT "focus_sessions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "app_usage" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "appName" TEXT NOT NULL,
    "timeSpent" INTEGER NOT NULL,
    "platform" "Platform" NOT NULL,
    "hourStart" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "app_usage_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_walletAddress_key" ON "users"("walletAddress");

-- CreateIndex
CREATE INDEX "focus_sessions_userId_idx" ON "focus_sessions"("userId");

-- CreateIndex
CREATE INDEX "focus_sessions_startTime_idx" ON "focus_sessions"("startTime");

-- CreateIndex
CREATE INDEX "focus_sessions_status_idx" ON "focus_sessions"("status");

-- CreateIndex
CREATE INDEX "focus_sessions_userId_status_idx" ON "focus_sessions"("userId", "status");

-- CreateIndex
CREATE INDEX "app_usage_userId_hourStart_idx" ON "app_usage"("userId", "hourStart");

-- CreateIndex
CREATE INDEX "app_usage_appName_idx" ON "app_usage"("appName");

-- CreateIndex
CREATE INDEX "app_usage_platform_idx" ON "app_usage"("platform");

-- CreateIndex
CREATE UNIQUE INDEX "app_usage_userId_appName_platform_hourStart_key" ON "app_usage"("userId", "appName", "platform", "hourStart");

-- AddForeignKey
ALTER TABLE "focus_sessions" ADD CONSTRAINT "focus_sessions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "app_usage" ADD CONSTRAINT "app_usage_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

