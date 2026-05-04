-- AlterTable
ALTER TABLE "session" ADD COLUMN     "impersonatedBy" TEXT;

-- AlterTable
ALTER TABLE "user" ADD COLUMN     "banExpires" TIMESTAMP(3),
ADD COLUMN     "banReason" TEXT,
ADD COLUMN     "banned" BOOLEAN DEFAULT false,
ADD COLUMN     "role" TEXT DEFAULT 'admin';

-- CreateTable
CREATE TABLE "sponsor" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "label" TEXT NOT NULL DEFAULT '',
    "year" TEXT NOT NULL DEFAULT '',
    "imageUrl" TEXT NOT NULL,
    "websiteUrl" TEXT,
    "description" TEXT,
    "order" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "sponsor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "who_we_are" (
    "id" TEXT NOT NULL DEFAULT 'default',
    "eyebrow" TEXT NOT NULL DEFAULT 'Who We Are',
    "countWord" TEXT NOT NULL DEFAULT 'Six',
    "titleSuffix" TEXT NOT NULL DEFAULT 'Committees.
One Voice.',
    "description" TEXT NOT NULL,
    "ctaLabel" TEXT NOT NULL DEFAULT 'Meet the Board',
    "ctaLink" TEXT NOT NULL DEFAULT '/about',
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "who_we_are_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "stat" (
    "id" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "stat_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "about_hero" (
    "id" TEXT NOT NULL DEFAULT 'default',
    "eyebrow" TEXT NOT NULL DEFAULT 'Nile University Student Union',
    "title" TEXT NOT NULL DEFAULT 'About
The Union',
    "description" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "about_hero_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "about_cta" (
    "id" TEXT NOT NULL DEFAULT 'default',
    "enabled" BOOLEAN NOT NULL DEFAULT true,
    "eyebrow" TEXT NOT NULL DEFAULT 'Recruitment opens every spring',
    "title" TEXT NOT NULL DEFAULT 'Want a seat
at this table?',
    "description" TEXT NOT NULL DEFAULT 'Applications go out each March. Every committee runs its own intake — open positions are posted to our channels first.',
    "buttonText" TEXT NOT NULL DEFAULT 'Get In Touch',
    "buttonLink" TEXT NOT NULL DEFAULT '/contact',
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "about_cta_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "committee" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "tagline" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "committee_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "board_member" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "committeeId" TEXT NOT NULL,
    "major" TEXT NOT NULL,
    "year" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "bio" TEXT NOT NULL,
    "cvDescription" TEXT NOT NULL DEFAULT '',
    "inSu" TEXT[],
    "collaborations" TEXT[],
    "achievements" TEXT[],
    "email" TEXT,
    "linkedin" TEXT,
    "order" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "board_member_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "event_status" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "event_status_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "event" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "startAt" TIMESTAMP(3) NOT NULL,
    "endAt" TIMESTAMP(3) NOT NULL,
    "statusId" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "tags" TEXT[],
    "image" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "event_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "footer" (
    "id" TEXT NOT NULL DEFAULT 'default',
    "description" TEXT NOT NULL DEFAULT 'Nile University Student Union — representing every student, running every year. Six committees. One voice.',
    "copyrightSuffix" TEXT NOT NULL DEFAULT 'Nile University Student Union. All rights reserved.',
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "footer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "social_link" (
    "id" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "href" TEXT NOT NULL,
    "icon" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "social_link_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "contact_info" (
    "id" TEXT NOT NULL DEFAULT 'default',
    "email" TEXT NOT NULL DEFAULT 'hello@nusu.edu',
    "phone" TEXT NOT NULL DEFAULT '+20 100 000 0000',
    "address" TEXT NOT NULL DEFAULT 'Student Centre · Nile University, Sheikh Zayed',
    "mapUrl" TEXT,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "contact_info_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "office_hours" (
    "id" TEXT NOT NULL DEFAULT 'default',
    "dayRange" TEXT NOT NULL DEFAULT 'Sunday – Thursday',
    "hours" TEXT NOT NULL DEFAULT '10:00 – 16:00',
    "note" TEXT,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "office_hours_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "contact_submission" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "subject" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "isRead" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "contact_submission_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "committee_slug_key" ON "committee"("slug");

-- CreateIndex
CREATE INDEX "board_member_committeeId_idx" ON "board_member"("committeeId");

-- CreateIndex
CREATE UNIQUE INDEX "event_status_slug_key" ON "event_status"("slug");

-- CreateIndex
CREATE INDEX "event_statusId_idx" ON "event"("statusId");

-- CreateIndex
CREATE INDEX "event_startAt_idx" ON "event"("startAt");

-- CreateIndex
CREATE INDEX "contact_submission_isRead_idx" ON "contact_submission"("isRead");

-- CreateIndex
CREATE INDEX "contact_submission_createdAt_idx" ON "contact_submission"("createdAt");

-- AddForeignKey
ALTER TABLE "board_member" ADD CONSTRAINT "board_member_committeeId_fkey" FOREIGN KEY ("committeeId") REFERENCES "committee"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "event" ADD CONSTRAINT "event_statusId_fkey" FOREIGN KEY ("statusId") REFERENCES "event_status"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
