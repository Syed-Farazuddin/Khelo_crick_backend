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

      return {
        success: true,
        message: 'Team Created!',
      };
    }
    throw new ConflictException('A Team Already exists with this name');
  }

  async deleteTeam() {}

  async addPlayer(addPlayerDto: addPlayerDto, teamId: number) {
    if (addPlayerDto.mobile == '' || addPlayerDto.mobile.length != 10) {
      throw new ConflictException('Please Enter a valid mobile Number');
    }
    let user = await this.prismaService.user.findFirst({
      where: {
        mobile: addPlayerDto.mobile,
      },
      select: {
        player: {
          select: {
            id: true,
            teams: {
              select: {
                id: true,
              },
            },
          },
        },
      },
    });

    if (!user) {
      return {
        playerExists: false,
        success: false,
        message: 'Enter player Name and Try again',
      };
    }

    const playerTeams = user.player.teams.filter((team) => team.id == teamId);

    if (playerTeams.length != 0) {
      throw new ConflictException('Player Already Exists in the current team');
    }

    await this.prismaService.team.update({
      where: {
        id: teamId,
      },
      data: {
        players: {
          connect: {
            id: user.player.id,
          },
        },
      },
    });

    // await this.prismaService.player.update({
    //   where: {
    //     id: teamId,
    //   },
    //   data: {
    //     teams: {
    //       connect: {
    //         id: teamId,
    //       },
    //     },
    //   },
    // });

    return {
      success: true,
      playerExists: true,
      message: 'Player Added Successfully',
    };
  }

  async deletePlayer() {}
}
