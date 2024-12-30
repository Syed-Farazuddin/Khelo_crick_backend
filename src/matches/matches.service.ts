import { ConflictException, Injectable } from '@nestjs/common';
import {
  ScheduleMatchDto,
  selectBatsmanDto,
  selectBowlerDto,
  startMatchDto,
  StartNewInningsDto,
} from './dto/matches.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class MatchesService {
  constructor(private prismaService: PrismaService) {}

  async scheduleMatch(scheduleMatchDto: ScheduleMatchDto, request: any) {
    const user = request.user;
    const createMatch = await this.prismaService.match.create({
      data: {
        ballType: scheduleMatchDto.ballType,
        bowlingLimit: scheduleMatchDto.bowlingLimit,
        ground: scheduleMatchDto.ground,
        overs: scheduleMatchDto.overs,
        state: scheduleMatchDto.state,
        tossTeam: {
          connect: { id: 1 },
        },
      },
    });

    return {
      success: true,
      message: 'Match Scheduled Successfully',
      createMatch,
    };
  }

  async startmatch(startMatchDto: startMatchDto, request: any) {
    const user = request.user;
    const tossWonTeamId = startMatchDto.tossWonTeamId;
    const teamA = startMatchDto.teams[0];
    const teamB = startMatchDto.teams[1];
    let batTeam: number;
    let bowlTeam: number;
    if (tossWonTeamId == teamA) {
      if (startMatchDto.chooseToBall) {
        bowlTeam = teamA;
        batTeam = teamB;
      } else {
        batTeam = teamA;
        bowlTeam = teamB;
      }
    } else {
      if (startMatchDto.chooseToBall) {
        bowlTeam = teamB;
        batTeam = teamA;
      } else {
        batTeam = teamB;
        bowlTeam = teamA;
      }
    }
    const battingTeam = await this.prismaService.battingTeam.create({
      data: {
        teamId: batTeam,
      },
    });
    const bowlingTeam = await this.prismaService.bowlingTeam.create({
      data: {
        teamId: bowlTeam,
      },
    });

    const battingTeam2 = await this.prismaService.battingTeam.create({
      data: {
        teamId: bowlTeam,
      },
    });
    const bowlingTeam2 = await this.prismaService.bowlingTeam.create({
      data: {
        teamId: batTeam,
      },
    });

    const firstInnigns = await this.prismaService.innings.create({
      data: {
        batting: {
          connect: {
            id: battingTeam.id,
          },
        },
        bowling: {
          connect: {
            id: bowlingTeam.id,
          },
        },
      },
    });
    const secondInnings = await this.prismaService.innings.create({
      data: {
        batting: {
          connect: {
            id: battingTeam2.id,
          },
        },
        bowling: {
          connect: {
            id: bowlingTeam2.id,
          },
        },
      },
    });
    let teamAPlayers = startMatchDto.teamAPlayers;
    let teamBPlayers = startMatchDto.teamBPlayers;
    let players = [...teamAPlayers, ...teamBPlayers];

    const createMatch = await this.prismaService.match.create({
      data: {
        ballType: startMatchDto.ballType,
        bowlingLimit: startMatchDto.bowlingLimit,
        ground: startMatchDto.ground,
        chooseToBall: startMatchDto.chooseToBall,
        chooseToBat: startMatchDto.chooseToBat,
        overs: startMatchDto.overs,
        tossTeam: {
          connect: {
            id: startMatchDto.tossWonTeamId,
          },
        },
        players: {
          connect: players.map((id) => ({ id })),
        },
        state: startMatchDto.state,
        firstInnings: {
          connect: {
            id: firstInnigns.id,
          },
        },
        secondInnings: {
          connect: {
            id: secondInnings.id,
          },
        },
      },
      select: {
        ballType: true,
        bowlingLimit: true,
        chooseToBall: true,
        chooseToBat: true,
        createdById: true,
        createdByPlayer: true,
        date: true,
        firstInnings: {
          select: {
            batting: {
              select: {
                team: {
                  select: {
                    name: true,
                    id: true,
                  },
                },
              },
            },
            bowling: {
              select: {
                team: {
                  select: {
                    name: true,
                    id: true,
                  },
                },
              },
            },
            oversPlayed: true,
            id: true,
            bytes: true,
            extras: true,
            isCompleted: true,
            nonStriker: true,
            striker: true,
            totalNoBalls: true,
            totalRuns: true,
            totalWides: true,
          },
        },
        secondInnings: {
          select: {
            batting: {
              select: {
                team: {
                  select: {
                    name: true,
                    id: true,
                  },
                },
              },
            },
            bowling: {
              select: {
                team: {
                  select: {
                    name: true,
                    id: true,
                  },
                },
              },
            },
            oversPlayed: true,
            id: true,
            bytes: true,
            extras: true,
            isCompleted: true,
            nonStriker: true,
            striker: true,
            totalNoBalls: true,
            totalRuns: true,
            totalWides: true,
          },
        },
        ground: true,
        id: true,
        inningsA: true,
        inningsB: true,
        overs: true,
        state: true,
        tossTeam: true,
        tossWonTeamId: true,
      },
    });

    return createMatch;
  }

  async scoring(scoring: any, user: any, id: number) {
    let myInnings = await this.prismaService.innings.findUnique({
      where: {
        id: id,
      },
    });
    const match = await this.findMatch(myInnings.id);

    if (myInnings.oversPlayed >= match.overs) {
      return {
        endInnings: true,
        success: false,
        selectNewBowler: false,
      };
    }

    if (match.firstInnings.isCompleted && match.secondInnings.isCompleted) {
      return {
        endMatch: true,
        success: false,
      };
    }

    let over: any = await this.prismaService.over.findUnique({
      where: {
        id: scoring.overId,
      },
      select: {
        balls: true,
        id: true,
        bowlerId: true,
        BowlingSchema: true,
      },
    });

    if (!over) {
      return {
        success: false,
        myInnings,
        message: 'Select New Bowler',
        selectNewBowler: true,
      };
    }

    let bowlsBowled = over.balls.filter(
      (ball) => !ball.isWide || !ball.isNoBall,
    ).length;

    if (bowlsBowled >= 6) {
      return {
        success: false,
        myInnings,
        message: 'Over is Completed! Please select other bowler',
        selectNewBowler: true,
      };
    }

    const delivery = await this.prismaService.ball.create({
      data: {
        order: scoring.ball,
        runs: scoring.runs,
        isWide: scoring.isWide ?? false,
        isBye: scoring.isBye ?? false,
        isNoBall: scoring.isNoBall ?? false,
        isRunOut: scoring.isRunOut ?? false,
        isWicket: scoring.isWicket ?? false,
        playedById: myInnings.strikerId,
      },
    });

    over = await this.prismaService.over.update({
      where: {
        id: scoring.overId,
      },
      data: {
        balls: {
          connect: {
            id: delivery.id,
          },
        },
      },
      select: {
        balls: true,
        id: true,
        bowlerId: true,
        BowlingSchema: true,
      },
    });

    let bowler = await this.prismaService.bowlingSchema.update({
      where: {
        id: scoring.bowlerId,
      },
      data: {
        over: {
          connect: {
            id: over.id,
          },
        },
      },
    });

    bowlsBowled = over.balls.filter(
      (ball) => !ball.isWide || !ball.isNoBall,
    ).length;

    let runsScored: number = scoring.runs;
    let isExtra: boolean = false;
    if (scoring.isWide || scoring.isNoBall) {
      runsScored += 1;
      isExtra = true;
    }

    if (!isExtra) {
      const bowler = await this.prismaService.player.findUnique({
        where: {
          id: scoring.bowlerId,
        },
        select: {
          user: {
            select: {
              name: true,
            },
          },
        },
      });

      await this.prismaService.battingSchema.updateMany({
        where: {
          playerId: myInnings.strikerId,
          inningsId: myInnings.id,
        },
        data: {
          runsScores: {
            push: runsScored,
          },
          bowlerName: bowler?.user?.name,
          totalRuns: {
            increment: runsScored,
          },
        },
      });
    }

    if ((isExtra && runsScored % 2 == 0) || runsScored % 2 != 0) {
      myInnings = await this.prismaService.innings.update({
        where: {
          id: myInnings.id,
        },
        data: {
          strikerId: myInnings.nonStrikerId,
          nonStrikerId: myInnings.strikerId,
          totalRuns: myInnings.totalRuns + runsScored,
          extras: isExtra ? myInnings.extras + runsScored : myInnings.extras,
          totalNoBalls: scoring.isNoBall
            ? myInnings.totalNoBalls + 1
            : myInnings.totalNoBalls,
          totalWides: scoring.isWide
            ? myInnings.totalWides + runsScored
            : myInnings.totalWides,
        },
      });
    } else {
      myInnings = await this.prismaService.innings.update({
        where: {
          id: myInnings.id,
        },
        data: {
          totalRuns: myInnings.totalRuns + runsScored,
          extras: isExtra ? myInnings.extras + runsScored : myInnings.extras,
          totalNoBalls: scoring.isNoBall
            ? myInnings.totalNoBalls + 1
            : myInnings.totalNoBalls,
          totalWides: scoring.isWide
            ? myInnings.totalWides + runsScored
            : myInnings.totalWides,
        },
      });
    }

    const battingTeam = await this.prismaService.battingTeam.findFirst({
      where: {
        inningsId: id,
      },
    });

    const bowlingTeam = await this.prismaService.bowlingTeam.findFirst({
      where: {
        inningsId: id,
      },
    });

    return {
      success: true,
      message: 'Synced',
      myInnings,
      battingTeam,
      bowlingTeam,
      selectNewBowler: bowlsBowled >= 6 ? true : false,
    };
  }

  async startNewInnings(startNewInningsDto: StartNewInningsDto) {
    await this.prismaService.innings.update({
      where: {
        id: startNewInningsDto.inningsId,
      },
      data: {
        isCompleted: true,
      },
    });

    return await this.prismaService.match.findFirst({
      where: {
        inningsA: startNewInningsDto.inningsId,
      },
      select: {
        ballType: true,
        bowlingLimit: true,
        chooseToBall: true,
        chooseToBat: true,
        createdById: true,
        createdByPlayer: true,
        date: true,
        firstInnings: {
          select: {
            batting: {
              select: {
                team: {
                  select: {
                    name: true,
                    id: true,
                  },
                },
              },
            },
            bowling: {
              select: {
                team: {
                  select: {
                    name: true,
                    id: true,
                  },
                },
              },
            },
            oversPlayed: true,
            id: true,
            bytes: true,
            extras: true,
            isCompleted: true,
            nonStriker: true,
            striker: true,
            totalNoBalls: true,
            totalRuns: true,
            totalWides: true,
          },
        },
        secondInnings: {
          select: {
            batting: {
              select: {
                team: {
                  select: {
                    name: true,
                    id: true,
                  },
                },
              },
            },
            bowling: {
              select: {
                team: {
                  select: {
                    name: true,
                    id: true,
                  },
                },
              },
            },
            oversPlayed: true,
            id: true,
            bytes: true,
            extras: true,
            isCompleted: true,
            nonStriker: true,
            striker: true,
            totalNoBalls: true,
            totalRuns: true,
            totalWides: true,
          },
        },
        ground: true,
        id: true,
        inningsA: true,
        inningsB: true,
        overs: true,
        state: true,
        tossTeam: true,
        tossWonTeamId: true,
      },
    });
  }

  async findInnings(inningsId: number) {
    const innings = await this.prismaService.innings.findUnique({
      where: {
        id: inningsId,
      },
      select: {
        totalRuns: true,
        extras: true,
        id: true,
        striker: {
          select: {
            user: {
              select: {
                name: true,
                player: true,
              },
            },
          },
        },
        nonStriker: {
          select: {
            user: {
              select: {
                name: true,
                mobile: true,
                age: true,
                dob: true,
                player: true,
              },
            },
          },
        },
        bowler: {
          select: {
            user: {
              select: {
                name: true,
                player: true,
              },
            },
          },
        },
        bowlerId: true,
        bowling: {
          select: {
            team: true,
          },
        },
        batting: {
          select: {
            team: true,
          },
        },
        bytes: true,
        isCompleted: true,
        nonStrikerId: true,
        oversPlayed: true,
        strikerId: true,
        totalNoBalls: true,
        totalWides: true,
      },
    });

    const strikerScore = await this.prismaService.battingSchema.findFirst({
      where: {
        inningsId: innings.id,
        playerId: innings.strikerId,
      },
    });

    const bowler = await this.prismaService.bowlingSchema.findFirst({
      where: {
        inningsId: innings.id,
        playerId: innings?.bowlerId,
      },
      select: {
        over: {
          select: { balls: true },
        },
        isCompleted: true,
        order: true,
        playerId: true,
      },
    });

    const nonStrikerScore = await this.prismaService.battingSchema.findFirst({
      where: {
        inningsId: innings.id,
        playerId: innings.nonStrikerId,
      },
    });

    const MappedInnings = {
      totalRuns: innings.totalRuns,
      extras: innings.extras,
      bowling: innings.bowling,
      batting: innings.batting,
      isCompleted: innings.isCompleted,
      oversPlayed: innings.oversPlayed,
      strikerId: innings.strikerId,
      nonStrikerId: innings.nonStrikerId,
      totalNoBalls: innings.totalNoBalls,
      totalWides: innings.totalWides,
      bytes: innings.bytes,
      id: innings.id,
      bowlerId: innings.bowlerId,
      striker: {
        user: innings.striker.user,
        score: strikerScore,
      },
      nonStriker: {
        user: innings.nonStriker.user,
        score: nonStrikerScore,
      },
      bowler: {
        user: innings?.bowler?.user,
        score: bowler,
      },
    };

    return MappedInnings;
  }

  async yourMatches(id: number) {
    return await this.prismaService.match.findMany({
      where: {
        players: {
          some: {
            id: id,
          },
        },
      },
      select: {
        chooseToBall: true,
        chooseToBat: true,
        ballType: true,
        bowlingLimit: true,
        createdById: true,
        createdByPlayer: true,
        firstInnings: {
          select: {
            batting: {
              select: {
                team: {
                  select: {
                    name: true,
                    id: true,
                  },
                },
              },
            },
            bowling: {
              select: {
                team: {
                  select: {
                    name: true,
                    id: true,
                  },
                },
              },
            },
            oversPlayed: true,
            id: true,
            bytes: true,
            extras: true,
            isCompleted: true,
            nonStriker: true,
            striker: true,
            totalNoBalls: true,
            totalRuns: true,
            totalWides: true,
          },
        },
        secondInnings: {
          select: {
            batting: {
              select: {
                team: {
                  select: {
                    name: true,
                    id: true,
                  },
                },
              },
            },
            bowling: {
              select: {
                team: {
                  select: {
                    name: true,
                    id: true,
                  },
                },
              },
            },
            oversPlayed: true,
            id: true,
            bytes: true,
            extras: true,
            isCompleted: true,
            nonStriker: true,
            striker: true,
            totalNoBalls: true,
            totalRuns: true,
            totalWides: true,
          },
        },
        state: true,
        ground: true,
        date: true,
        id: true,
        inningsA: true,
        inningsB: true,
        teams: true,
        overs: true,
        tossWonTeamId: true,
      },
    });
  }

  async findMatch(inningsId: number) {
    let match = await this.prismaService.match.findFirst({
      where: {
        inningsA: inningsId,
      },
      include: {
        firstInnings: true,
        secondInnings: true,
      },
    });
    if (!match) {
      match = await this.prismaService.match.findFirst({
        where: {
          inningsB: inningsId,
        },
        include: {
          firstInnings: true,
          secondInnings: true,
        },
      });
    }
    return match;
  }

  async selectBatsman(
    scoring: selectBatsmanDto,
    request: any,
    inningsId: number,
  ) {
    let striker = await this.prismaService.battingSchema.findFirst({
      where: {
        inningsId: inningsId,
        playerId: scoring.strikerId,
      },
    });

    if (!striker) {
      striker = await this.prismaService.battingSchema.create({
        data: {
          fours: 0,
          totalRuns: 0,
          sixes: 0,
          playerId: scoring.strikerId,
          inningsId: inningsId,
        },
      });
    }

    if (striker.isOut) {
      return {
        success: false,
        message: 'Cannot select striker who is already out',
      };
    }

    let nonStriker = await this.prismaService.battingSchema.findFirst({
      where: {
        inningsId: inningsId,
        playerId: scoring.nonStrikerId,
      },
    });

    if (!nonStriker) {
      nonStriker = await this.prismaService.battingSchema.create({
        data: {
          fours: 0,
          totalRuns: 0,
          sixes: 0,
          playerId: scoring.nonStrikerId,
          inningsId: inningsId,
        },
      });
    }

    if (nonStriker.isOut) {
      return {
        success: false,
        message: 'Cannot select non Striker who is already out',
      };
    }

    const innings = await this.prismaService.innings.update({
      where: {
        id: inningsId,
      },
      data: {
        strikerId: scoring.strikerId,
        nonStrikerId: scoring.nonStrikerId,
      },
    });
    return innings;
  }

  async selectBolwer(
    selectBowlerDto: selectBowlerDto,
    request: any,
    inningsId: number,
  ) {
    const match = await this.findMatch(inningsId);
    if (!match) {
      return new ConflictException('No Matches exists for this innings!');
    }
    const innings = await this.findInnings(inningsId);

    let bowler = await this.prismaService.bowlingSchema.findFirst({
      where: {
        inningsId: inningsId,
        playerId: selectBowlerDto.bowlerId,
      },
    });

    if (!bowler) {
      bowler = await this.prismaService.bowlingSchema.create({
        data: {
          overLeft: match.bowlingLimit,
          order: selectBowlerDto.order,
          inningsId: inningsId,
          playerId: selectBowlerDto.bowlerId,
        },
      });
    }

    if (innings.bowlerId != null) {
      const bowlingData = await this.prismaService.bowlingSchema.findFirst({
        where: {
          inningsId: innings.id,
          playerId: innings.bowlerId,
        },
        select: {
          over: {
            orderBy: {
              order: 'desc',
            },
            select: {
              balls: true,
              order: true,
            },
          },
          overLeft: true,
        },
      });

      if (bowler.overLeft <= 0) {
        return {
          success: false,
          message:
            "Bowler's overlimit has completed! Please select other bowler to continue",
        };
      }

      if (innings.bowlerId == selectBowlerDto.bowlerId) {
        return {
          success: false,
          selectNewBowler: true,
          message: 'Please select different bowler',
        };
      }

      const lastover = bowlingData.over[bowlingData.over.length - 1];
      if (lastover.balls.length >= 6) {
        let previousBowlerUpdate =
          await this.prismaService.bowlingSchema.updateMany({
            where: {
              inningsId: innings.id,
              playerId: innings.bowlerId,
            },
            data: {
              oversBowled: {
                increment: 1,
              },
              overLeft: {
                decrement: 1,
              },
              isCompleted: bowlingData.overLeft - 1 <= 0 ? true : false,
            },
          });
        await this.prismaService.innings.update({
          where: {
            id: innings.id,
          },
          data: {
            oversPlayed: {
              increment: 1,
            },
          },
        });
        console.log(previousBowlerUpdate);
      }
    }

    const over = await this.prismaService.over.create({
      data: {
        bowlerId: bowler.id,
        order: selectBowlerDto.order,
      },
    });

    const bowlerDetails = {
      id: bowler.id,
      inningsId: bowler.inningsId,
      oversBowled: bowler.oversBowled,
      order: over.order,
      isCompleted: bowler.overLeft <= 0,
      bowlingTeamId: bowler.bowlingTeamId,
      overleft: bowler.overLeft,
    };

    const overDetails = {
      id: over.id,
      order: over.order,
      bowlerId: over.bowlerId,
    };

    await this.prismaService.innings.update({
      where: {
        id: inningsId,
      },
      data: {
        bowlerId: selectBowlerDto.bowlerId,
      },
    });

    return {
      bowler: bowlerDetails,
      over: overDetails,
    };
  }

  async updateBowler(body: selectBowlerDto, request: any) {
    // await this.prismaService.innings.
    return await this.prismaService.over.update({
      where: {
        id: body.overId,
      },
      data: {
        bowlerId: body.bowlerId,
      },
    });
  }
}
