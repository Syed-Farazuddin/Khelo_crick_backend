import { ConflictException, Injectable } from '@nestjs/common';
import {
  ScheduleMatchDto,
  selectBatsmanDto,
  selectBowlerDto,
  startMatchDto,
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
            id: bowlingTeam.id,
          },
        },
        bowling: {
          connect: {
            id: battingTeam.id,
          },
        },
      },
    });
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
    });
    return createMatch;
  }

  async scoring(scoring: any, user: any, id: number) {
    const myInnings = await this.prismaService.innings.findUnique({
      where: {
        id: id,
      },
    });
    let over: any = await this.prismaService.over.findUnique({
      where: {
        id: scoring.overId,
      },
    });

    const delivery = await this.prismaService.ball.create({
      data: {
        order: scoring.ball,
        runs: scoring.runs,
        isWide: scoring.isWide,
        isBye: scoring.isBye,
        isNoBall: scoring.isNoBall,
        isRunOut: scoring.isRunOut,
        isWicket: scoring.isWicket,
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

    let bowlsBowled = over.balls.filter(
      (ball) => !ball.isWide || !ball.isNoBall,
    ).length;

    let runsScored: number = scoring.runs;
    let isExtra: boolean = false;
    if (scoring.isWide || scoring.isNoBall) {
      runsScored += 1;
      isExtra = true;
    }

    if ((isExtra && runsScored % 2 == 0) || runsScored % 2 != 0) {
      await this.prismaService.innings.update({
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
      await this.prismaService.innings.update({
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
      myInnings,
      battingTeam,
      bowlingTeam,
    };
  }

  async findInnings(inningsId: number) {
    return await this.prismaService.innings.findUnique({
      where: {
        id: inningsId,
      },
    });
  }

  async findMatch(inningsId: number) {
    let match = await this.prismaService.match.findFirst({
      where: {
        inningsA: inningsId,
      },
    });
    if (!match) {
      match = await this.prismaService.match.findFirst({
        where: {
          inningsA: inningsId,
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
        nonStrikerId: scoring.strikerId,
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
        playerId: selectBowlerDto.playerId,
      },
    });

    if (!bowler) {
      bowler = await this.prismaService.bowlingSchema.create({
        data: {
          overLeft: match.bowlingLimit,
          order: selectBowlerDto.order,
          inningsId: inningsId,
          playerId: selectBowlerDto.playerId,
        },
      });
    }

    if (bowler.overLeft <= 0) {
      return {
        success: false,
        message:
          "Bowler's overlimit has completed! Please select other bowler to continue",
      };
    }

    const over = await this.prismaService.over.create({
      data: {
        bowlerId: bowler.id,
        order: selectBowlerDto.order,
      },
    });

    return { bowler, over };
  }

  async updateBowler(body: selectBowlerDto, request: any) {
    return this.prismaService.over.update({
      where: {
        id: body.overId,
      },
      data: {
        bowlerId: body.playerId,
      },
    });
  }
}
