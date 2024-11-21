import { ConflictException, Injectable } from '@nestjs/common';
import { addPlayerDto, createTeamDto } from './dto/team.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TeamService {
  constructor(private prismaService: PrismaService) {}

  async getYourTeams(request: any) {
    const userId = request.user.id;

    const { teams } = await this.prismaService.player.findUnique({
      where: {
        userId: userId,
      },
      select: {
        teams: {
          select: {
            id: true,
            players: {
              select: {
                id: true,
                battingStyle: true,
                bowlingStyle: true,
                imageUrl: true,
                user: {
                  select: {
                    name: true,
                  },
                },
              },
            },
            imageUrl: true,
            name: true,
          },
        },
      },
    });
    return teams;
  }

  async createTeam(createTeamDto: createTeamDto, request: any) {
    const team = await this.prismaService.team.findUnique({
      where: {
        name: createTeamDto.teamName,
      },
    });
    if (!team) {
      const team = await this.prismaService.team.create({
        data: {
          name: createTeamDto.teamName,
          imageUrl: createTeamDto.imageUrl,
        },
      });
      await this.prismaService.player.update({
        where: {
          userId: request.user.id,
        },
        data: {
          teams: {
            connect: {
              id: team.id,
            },
          },
        },
      });
    }
    throw new ConflictException('A Team Already exists with this name');
  }

  async deleteTeam() {}

  async addPlayer(addPlayerDto: addPlayerDto, teamId: number) {
    let { player } = await this.prismaService.user.findUnique({
      where: {
        mobile: addPlayerDto.mobile,
      },
      select: {
        player: {
          select: {
            id: true,
          },
        },
      },
    });

    await this.prismaService.team.update({
      where: {
        id: teamId,
      },
      data: {
        players: {
          connect: {
            id: player.id,
          },
        },
      },
    });

    await this.prismaService.player.update({
      where: {
        id: teamId,
      },
      data: {
        teams: {
          connect: {
            id: teamId,
          },
        },
      },
    });
  }

  async deletePlayer() {}
}
