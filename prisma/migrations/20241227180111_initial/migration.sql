-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "mobile" TEXT NOT NULL,
    "otp" INTEGER,
    "age" INTEGER,
    "dob" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserToken" (
    "id" SERIAL NOT NULL,
    "token" TEXT,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "UserToken_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Player" (
    "id" SERIAL NOT NULL,
    "bowlingStyle" TEXT,
    "battingStyle" TEXT,
    "imageUrl" TEXT,
    "wicketKeeper" BOOLEAN,
    "allrounder" BOOLEAN,
    "userId" INTEGER NOT NULL,
    "statsId" INTEGER NOT NULL,

    CONSTRAINT "Player_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Stats" (
    "id" SERIAL NOT NULL,
    "matches" INTEGER NOT NULL DEFAULT 0,
    "bowlStatsId" INTEGER NOT NULL,
    "fieldStatsId" INTEGER NOT NULL,
    "batStatsId" INTEGER NOT NULL,

    CONSTRAINT "Stats_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BowlingStats" (
    "id" SERIAL NOT NULL,
    "matches" INTEGER NOT NULL DEFAULT 0,
    "innings" INTEGER NOT NULL DEFAULT 0,
    "wickets" INTEGER NOT NULL DEFAULT 0,
    "totalBowls" INTEGER NOT NULL DEFAULT 0,
    "noBalls" INTEGER NOT NULL DEFAULT 0,
    "wides" INTEGER NOT NULL DEFAULT 0,
    "three_for" INTEGER NOT NULL DEFAULT 0,
    "fifer" INTEGER NOT NULL DEFAULT 0,
    "best" TEXT,

    CONSTRAINT "BowlingStats_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BattingStats" (
    "id" SERIAL NOT NULL,
    "matches" INTEGER NOT NULL DEFAULT 0,
    "innings" INTEGER NOT NULL DEFAULT 0,
    "ballsPlayed" INTEGER NOT NULL DEFAULT 0,
    "runs" INTEGER NOT NULL DEFAULT 0,
    "notOuts" INTEGER NOT NULL DEFAULT 0,
    "average" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "strikeRate" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "sixes" INTEGER NOT NULL DEFAULT 0,
    "fours" INTEGER NOT NULL DEFAULT 0,
    "ones" INTEGER NOT NULL DEFAULT 0,
    "twos" INTEGER NOT NULL DEFAULT 0,
    "threes" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "BattingStats_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FieldingStats" (
    "id" SERIAL NOT NULL,
    "catches" INTEGER NOT NULL DEFAULT 0,
    "mostCatches" INTEGER NOT NULL DEFAULT 0,
    "runOuts" INTEGER NOT NULL DEFAULT 0,
    "mostRunOuts" INTEGER NOT NULL DEFAULT 0,
    "stump" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "FieldingStats_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Team" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "imageUrl" TEXT,
    "createdBy" INTEGER,
    "totalMatches" INTEGER NOT NULL DEFAULT 0,
    "wins" INTEGER NOT NULL DEFAULT 0,
    "losses" INTEGER NOT NULL DEFAULT 0,
    "draws" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Team_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Match" (
    "id" SERIAL NOT NULL,
    "state" TEXT NOT NULL,
    "ground" TEXT NOT NULL,
    "date" TIMESTAMP(3),
    "ballType" TEXT NOT NULL,
    "tossWonTeamId" INTEGER,
    "chooseToBat" BOOLEAN NOT NULL DEFAULT false,
    "chooseToBall" BOOLEAN NOT NULL DEFAULT false,
    "bowlingLimit" INTEGER NOT NULL,
    "overs" INTEGER NOT NULL,
    "createdById" INTEGER,
    "inningsA" INTEGER,
    "inningsB" INTEGER,

    CONSTRAINT "Match_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Innings" (
    "id" SERIAL NOT NULL,
    "totalRuns" INTEGER NOT NULL DEFAULT 0,
    "extras" INTEGER NOT NULL DEFAULT 0,
    "totalWides" INTEGER NOT NULL DEFAULT 0,
    "totalNoBalls" INTEGER NOT NULL DEFAULT 0,
    "bytes" INTEGER NOT NULL DEFAULT 0,
    "oversPlayed" INTEGER NOT NULL DEFAULT 0,
    "isCompleted" BOOLEAN NOT NULL DEFAULT false,
    "nonStrikerId" INTEGER,
    "strikerId" INTEGER,
    "bowlerId" INTEGER,

    CONSTRAINT "Innings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BattingTeam" (
    "id" SERIAL NOT NULL,
    "teamId" INTEGER NOT NULL,
    "inningsId" INTEGER,

    CONSTRAINT "BattingTeam_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BowlingTeam" (
    "id" SERIAL NOT NULL,
    "teamId" INTEGER NOT NULL,
    "inningsId" INTEGER,

    CONSTRAINT "BowlingTeam_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BattingSchema" (
    "id" SERIAL NOT NULL,
    "playerName" TEXT,
    "playerId" INTEGER,
    "inningsId" INTEGER,
    "runsScores" INTEGER[],
    "totalRuns" INTEGER NOT NULL DEFAULT 0,
    "fours" INTEGER NOT NULL DEFAULT 0,
    "sixes" INTEGER NOT NULL DEFAULT 0,
    "isOut" BOOLEAN NOT NULL DEFAULT false,
    "battingTeamId" INTEGER,
    "caughtByName" TEXT,
    "bowlerName" TEXT,

    CONSTRAINT "BattingSchema_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BowlingSchema" (
    "id" SERIAL NOT NULL,
    "playerId" INTEGER,
    "inningsId" INTEGER,
    "oversBowled" INTEGER NOT NULL DEFAULT 0,
    "order" INTEGER NOT NULL DEFAULT 0,
    "isCompleted" BOOLEAN NOT NULL DEFAULT false,
    "bowlingTeamId" INTEGER,
    "overLeft" INTEGER NOT NULL,

    CONSTRAINT "BowlingSchema_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Ball" (
    "id" SERIAL NOT NULL,
    "isWide" BOOLEAN NOT NULL DEFAULT false,
    "isNoBall" BOOLEAN NOT NULL DEFAULT false,
    "isBye" BOOLEAN NOT NULL DEFAULT false,
    "isWicket" BOOLEAN NOT NULL DEFAULT false,
    "isRunOut" BOOLEAN NOT NULL DEFAULT false,
    "runs" INTEGER NOT NULL,
    "playedById" INTEGER NOT NULL,
    "order" INTEGER NOT NULL,
    "overId" INTEGER,

    CONSTRAINT "Ball_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Over" (
    "id" SERIAL NOT NULL,
    "bowlerId" INTEGER,
    "order" INTEGER NOT NULL,
    "playerId" INTEGER,

    CONSTRAINT "Over_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tournament" (
    "id" SERIAL NOT NULL,

    CONSTRAINT "Tournament_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_PlayerTeams" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_PlayerTeams_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_TeamToTournament" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_TeamToTournament_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_players" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_players_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_MatchToTeam" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_MatchToTeam_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_name_key" ON "User"("name");

-- CreateIndex
CREATE UNIQUE INDEX "User_mobile_key" ON "User"("mobile");

-- CreateIndex
CREATE UNIQUE INDEX "UserToken_userId_key" ON "UserToken"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Player_userId_key" ON "Player"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Player_statsId_key" ON "Player"("statsId");

-- CreateIndex
CREATE UNIQUE INDEX "Stats_bowlStatsId_key" ON "Stats"("bowlStatsId");

-- CreateIndex
CREATE UNIQUE INDEX "Stats_fieldStatsId_key" ON "Stats"("fieldStatsId");

-- CreateIndex
CREATE UNIQUE INDEX "Stats_batStatsId_key" ON "Stats"("batStatsId");

-- CreateIndex
CREATE UNIQUE INDEX "Team_name_key" ON "Team"("name");

-- CreateIndex
CREATE INDEX "_PlayerTeams_B_index" ON "_PlayerTeams"("B");

-- CreateIndex
CREATE INDEX "_TeamToTournament_B_index" ON "_TeamToTournament"("B");

-- CreateIndex
CREATE INDEX "_players_B_index" ON "_players"("B");

-- CreateIndex
CREATE INDEX "_MatchToTeam_B_index" ON "_MatchToTeam"("B");

-- AddForeignKey
ALTER TABLE "UserToken" ADD CONSTRAINT "UserToken_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Player" ADD CONSTRAINT "Player_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Player" ADD CONSTRAINT "Player_statsId_fkey" FOREIGN KEY ("statsId") REFERENCES "Stats"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Stats" ADD CONSTRAINT "Stats_bowlStatsId_fkey" FOREIGN KEY ("bowlStatsId") REFERENCES "BowlingStats"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Stats" ADD CONSTRAINT "Stats_fieldStatsId_fkey" FOREIGN KEY ("fieldStatsId") REFERENCES "FieldingStats"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Stats" ADD CONSTRAINT "Stats_batStatsId_fkey" FOREIGN KEY ("batStatsId") REFERENCES "BattingStats"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Team" ADD CONSTRAINT "Team_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Match" ADD CONSTRAINT "Match_tossWonTeamId_fkey" FOREIGN KEY ("tossWonTeamId") REFERENCES "Team"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Match" ADD CONSTRAINT "Match_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "Player"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Match" ADD CONSTRAINT "Match_inningsA_fkey" FOREIGN KEY ("inningsA") REFERENCES "Innings"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Match" ADD CONSTRAINT "Match_inningsB_fkey" FOREIGN KEY ("inningsB") REFERENCES "Innings"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Innings" ADD CONSTRAINT "Innings_strikerId_fkey" FOREIGN KEY ("strikerId") REFERENCES "Player"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Innings" ADD CONSTRAINT "Innings_nonStrikerId_fkey" FOREIGN KEY ("nonStrikerId") REFERENCES "Player"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Innings" ADD CONSTRAINT "Innings_bowlerId_fkey" FOREIGN KEY ("bowlerId") REFERENCES "Player"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BattingTeam" ADD CONSTRAINT "BattingTeam_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BattingTeam" ADD CONSTRAINT "BattingTeam_inningsId_fkey" FOREIGN KEY ("inningsId") REFERENCES "Innings"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BowlingTeam" ADD CONSTRAINT "BowlingTeam_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BowlingTeam" ADD CONSTRAINT "BowlingTeam_inningsId_fkey" FOREIGN KEY ("inningsId") REFERENCES "Innings"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BattingSchema" ADD CONSTRAINT "BattingSchema_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "Player"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BattingSchema" ADD CONSTRAINT "BattingSchema_battingTeamId_fkey" FOREIGN KEY ("battingTeamId") REFERENCES "BattingTeam"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BowlingSchema" ADD CONSTRAINT "BowlingSchema_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "Player"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BowlingSchema" ADD CONSTRAINT "BowlingSchema_bowlingTeamId_fkey" FOREIGN KEY ("bowlingTeamId") REFERENCES "BowlingTeam"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ball" ADD CONSTRAINT "Ball_playedById_fkey" FOREIGN KEY ("playedById") REFERENCES "Player"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ball" ADD CONSTRAINT "Ball_overId_fkey" FOREIGN KEY ("overId") REFERENCES "Over"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Over" ADD CONSTRAINT "Over_bowlerId_fkey" FOREIGN KEY ("bowlerId") REFERENCES "BowlingSchema"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Over" ADD CONSTRAINT "Over_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "Player"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PlayerTeams" ADD CONSTRAINT "_PlayerTeams_A_fkey" FOREIGN KEY ("A") REFERENCES "Player"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PlayerTeams" ADD CONSTRAINT "_PlayerTeams_B_fkey" FOREIGN KEY ("B") REFERENCES "Team"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TeamToTournament" ADD CONSTRAINT "_TeamToTournament_A_fkey" FOREIGN KEY ("A") REFERENCES "Team"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TeamToTournament" ADD CONSTRAINT "_TeamToTournament_B_fkey" FOREIGN KEY ("B") REFERENCES "Tournament"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_players" ADD CONSTRAINT "_players_A_fkey" FOREIGN KEY ("A") REFERENCES "Match"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_players" ADD CONSTRAINT "_players_B_fkey" FOREIGN KEY ("B") REFERENCES "Player"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MatchToTeam" ADD CONSTRAINT "_MatchToTeam_A_fkey" FOREIGN KEY ("A") REFERENCES "Match"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MatchToTeam" ADD CONSTRAINT "_MatchToTeam_B_fkey" FOREIGN KEY ("B") REFERENCES "Team"("id") ON DELETE CASCADE ON UPDATE CASCADE;
