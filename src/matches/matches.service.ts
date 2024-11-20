import { Injectable } from '@nestjs/common';
import { ScheduleMatchDto } from './dto/matches.dto';
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
        date: scheduleMatchDto.date,
        teams: {
          connect: scheduleMatchDto.teams.map((teamId) => ({
            id: teamId,
          })),
        },
        createdById: user.id,
        ground: scheduleMatchDto.ground,
        overs: scheduleMatchDto.overs,
        state: scheduleMatchDto.state,
        players: {
          connect: scheduleMatchDto.players.map((playerId) => ({
            id: playerId,
          })),
        },
      },
    });

    return {
      success: true,
      message: 'Match Scheduled Successfully',
      createMatch,
    };
  }
}
