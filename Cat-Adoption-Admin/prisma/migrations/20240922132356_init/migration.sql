-- AlterTable
ALTER TABLE "Cat" ADD COLUMN     "isAdopted" BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE "Adopt" (
    "id" SERIAL NOT NULL,
    "fullname" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "telephone" TEXT NOT NULL,
    "reason" TEXT NOT NULL,
    "catID" INTEGER NOT NULL,
    "actived" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Adopt_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Adopt" ADD CONSTRAINT "Adopt_catID_fkey" FOREIGN KEY ("catID") REFERENCES "Cat"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
