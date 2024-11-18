import { Injectable } from '@nestjs/common';
import { addPlayerDto, createTeamDto } from './dto/team.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TeamService {
  constructor(private prismaService: PrismaService) {}

  async createTeam(createTeamDto: createTeamDto, request: any) {
    const team = await this.prismaService.team.findUnique({
      where: {
        name: createTeamDto.teamName,
      },
    });
    if (!team) {
      return await this.prismaService.team.create({
        data: {
          ...createTeamDto,
        },
      });
    }
    return await this.prismaService.team.update({
      where: {
        name: createTeamDto.teamName,
      },
      data: {
        ...createTeamDto,
      },
    });
  }

  async deleteTeam() {}

  async addPlayer(addPlayerDto: addPlayerDto, teamId: number) {
    let { id } = await this.prismaService.user.findUnique({
      where: {
        mobile: addPlayerDto.mobile,
      },
    });

    let player = await this.prismaService.player.findUnique({
      where: {
        userId: id,
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
