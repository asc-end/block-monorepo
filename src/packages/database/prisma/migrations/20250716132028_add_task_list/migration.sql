-- CreateEnum
CREATE TYPE "TaskState" AS ENUM ('checked', 'unchecked', 'archived');

-- CreateTable
CREATE TABLE "task_lists" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "task" TEXT NOT NULL,
    "state" "TaskState" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "index" INTEGER,
    "tags" TEXT[],
    "scheduledDate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "task_lists_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "task_lists_userId_idx" ON "task_lists"("userId");

-- AddForeignKey
ALTER TABLE "task_lists" ADD CONSTRAINT "task_lists_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
