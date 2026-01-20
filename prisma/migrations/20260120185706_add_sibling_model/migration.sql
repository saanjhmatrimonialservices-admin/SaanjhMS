-- AlterTable
ALTER TABLE "public"."Client" ADD COLUMN     "homeAddress" TEXT,
ADD COLUMN     "homeCity" TEXT,
ADD COLUMN     "homeCountry" TEXT,
ADD COLUMN     "homeOwnership" TEXT,
ADD COLUMN     "homeState" TEXT,
ADD COLUMN     "homeType" TEXT,
ALTER COLUMN "maritalStatus" DROP NOT NULL,
ALTER COLUMN "diet" DROP NOT NULL,
ALTER COLUMN "religion" DROP NOT NULL;

-- CreateTable
CREATE TABLE "public"."Sibling" (
    "id" TEXT NOT NULL,
    "clientId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "gender" "public"."Gender" NOT NULL,
    "profession" TEXT,
    "maritalStatus" "public"."MaritalStatus",

    CONSTRAINT "Sibling_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."Sibling" ADD CONSTRAINT "Sibling_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "public"."Client"("id") ON DELETE CASCADE ON UPDATE CASCADE;
