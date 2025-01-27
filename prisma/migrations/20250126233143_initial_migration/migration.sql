-- CreateEnum
CREATE TYPE "SupportBanner" AS ENUM ('NONE', 'LGBTQ_RIGHTS', 'ANTI_RACISM', 'MENTAL_HEALTH', 'CLIMATE_ACTION');

-- CreateTable
CREATE TABLE "Account" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL,
    "sessionToken" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT,
    "emailVerified" TIMESTAMP(3),
    "image" TEXT,
    "description" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserLink" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "clicks" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserLink_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserButton" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "platform" TEXT NOT NULL,
    "icon" TEXT NOT NULL,
    "clicks" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserButton_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserSettings" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "backgroundColor" TEXT NOT NULL DEFAULT '#e7e5e5',
    "slugTextColor" TEXT NOT NULL DEFAULT '#1e1e1e',
    "slugTextWeight" TEXT NOT NULL DEFAULT '500',
    "slugTextSize" TEXT NOT NULL DEFAULT '1rem',
    "headerTextColor" TEXT NOT NULL DEFAULT '#1e1e1e',
    "linkBackgroundColor" TEXT NOT NULL DEFAULT '#ffffff',
    "linkTextColor" TEXT NOT NULL DEFAULT '#1e1e1e',
    "linkShadowColor" TEXT NOT NULL DEFAULT '#e7e5e5',
    "isLinkShadow" BOOLEAN NOT NULL DEFAULT false,
    "linkHoverBackgroundColor" TEXT NOT NULL DEFAULT '#eeeeee',
    "linkBorderRadius" TEXT NOT NULL DEFAULT '0.5rem',
    "linkPadding" TEXT NOT NULL DEFAULT '0.5rem',
    "buttonBackgroundColor" TEXT NOT NULL DEFAULT '#ffffff',
    "buttonShadowColor" TEXT NOT NULL DEFAULT '#e7e5e5',
    "isButtonShadow" BOOLEAN NOT NULL DEFAULT false,
    "buttonIconColor" TEXT NOT NULL DEFAULT '#1e1e1e',
    "buttonHoverBackgroundColor" TEXT NOT NULL DEFAULT '#eeeeee',
    "supportBanner" "SupportBanner" NOT NULL DEFAULT 'NONE',

    CONSTRAINT "UserSettings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserStats" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "views" INTEGER NOT NULL DEFAULT 0,
    "linkClicks" INTEGER NOT NULL DEFAULT 0,
    "buttonClicks" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "UserStats_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LinkClick" (
    "id" SERIAL NOT NULL,
    "userLinkId" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "LinkClick_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ButtonClick" (
    "id" SERIAL NOT NULL,
    "userButtonId" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ButtonClick_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Account_provider_providerAccountId_key" ON "Account"("provider", "providerAccountId");

-- CreateIndex
CREATE UNIQUE INDEX "Session_sessionToken_key" ON "Session"("sessionToken");

-- CreateIndex
CREATE UNIQUE INDEX "User_slug_key" ON "User"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "UserSettings_userId_key" ON "UserSettings"("userId");

-- CreateIndex
CREATE INDEX "UserStats_userId_date_idx" ON "UserStats"("userId", "date");

-- CreateIndex
CREATE UNIQUE INDEX "UserStats_userId_date_key" ON "UserStats"("userId", "date");

-- CreateIndex
CREATE INDEX "LinkClick_userLinkId_date_idx" ON "LinkClick"("userLinkId", "date");

-- CreateIndex
CREATE INDEX "ButtonClick_userButtonId_date_idx" ON "ButtonClick"("userButtonId", "date");

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserLink" ADD CONSTRAINT "UserLink_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserButton" ADD CONSTRAINT "UserButton_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserSettings" ADD CONSTRAINT "UserSettings_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserStats" ADD CONSTRAINT "UserStats_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LinkClick" ADD CONSTRAINT "LinkClick_userLinkId_fkey" FOREIGN KEY ("userLinkId") REFERENCES "UserLink"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ButtonClick" ADD CONSTRAINT "ButtonClick_userButtonId_fkey" FOREIGN KEY ("userButtonId") REFERENCES "UserButton"("id") ON DELETE CASCADE ON UPDATE CASCADE;
