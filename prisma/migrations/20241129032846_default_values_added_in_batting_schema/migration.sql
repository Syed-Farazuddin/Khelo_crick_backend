-- AlterTable
ALTER TABLE "BattingSchema" ALTER COLUMN "totalRuns" SET DEFAULT 0,
ALTER COLUMN "fours" SET DEFAULT 0,
ALTER COLUMN "sixes" SET DEFAULT 0;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "_MatchToTeam" ADD CONSTRAINT "_MatchToTeam_AB_pkey" PRIMARY KEY ("A", "B");

-- DropIndex
DROP INDEX "_MatchToTeam_AB_unique";

-- AlterTable
ALTER TABLE "_PlayerTeams" ADD CONSTRAINT "_PlayerTeams_AB_pkey" PRIMARY KEY ("A", "B");

-- DropIndex
DROP INDEX "_PlayerTeams_AB_unique";

-- AlterTable
ALTER TABLE "_TeamToTournament" ADD CONSTRAINT "_TeamToTournament_AB_pkey" PRIMARY KEY ("A", "B");

-- DropIndex
DROP INDEX "_TeamToTournament_AB_unique";

-- AlterTable
ALTER TABLE "_teamAPlayers" ADD CONSTRAINT "_teamAPlayers_AB_pkey" PRIMARY KEY ("A", "B");

-- DropIndex
DROP INDEX "_teamAPlayers_AB_unique";

-- AlterTable
ALTER TABLE "_teamBPlayers" ADD CONSTRAINT "_teamBPlayers_AB_pkey" PRIMARY KEY ("A", "B");

-- DropIndex
DROP INDEX "_teamBPlayers_AB_unique";
