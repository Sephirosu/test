-- CreateTable
CREATE TABLE "EmailSend" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "count" INTEGER NOT NULL DEFAULT 1
);

-- CreateIndex
CREATE UNIQUE INDEX "EmailSend_email_key" ON "EmailSend"("email");
