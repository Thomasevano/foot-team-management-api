-- CreateTable
CREATE TABLE "players" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "dateOfBirth" DATE NOT NULL,
    "nationality" TEXT NOT NULL,

    CONSTRAINT "players_pkey" PRIMARY KEY ("id")
);
