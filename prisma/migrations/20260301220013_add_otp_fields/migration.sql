-- AlterTable
ALTER TABLE "public"."User" ADD COLUMN     "otp" TEXT,
ADD COLUMN     "otpExpiry" TIMESTAMP(3);
