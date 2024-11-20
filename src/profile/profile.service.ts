import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ProfileDto } from './dto/profile.dto';

@Injectable()
export class ProfileService {
  constructor(private prismaService: PrismaService) {}

  async getProfileDetails(id: number) {
    const data = await this.prismaService.user.findUnique({
      where: {
        id: id,
      },
      select: {
        mobile: true,
        name: true,
        age: true,
        dob: true,
        player: {
          select: {
            allrounder: true,
            battingStyle: true,
            bowlingStyle: true,
            stats: {
              select: {
                bowlingStats: true,
                batStats: true,
                fieldStats: true,
              },
            },
          },
        },
      },
    });
    const stats = data.player.stats;
    const result = {
      name: data.name,
      age: data.age,
      dob: data.dob,
      mobile: data.mobile,
      allrounder: data.player.allrounder,
      battingStyle: data.player.battingStyle,
      bowlingStyle: data.player.bowlingStyle,
      battingStats: [
        {
          name: 'Matches',
          value: stats.batStats.matches,
        },
        {
          name: 'Innings',
          value: stats.batStats.innings,
        },
        {
          name: 'Balls Played',
          value: stats.batStats.ballsPlayed,
        },
        {
          name: 'Runs',
          value: stats.batStats.runs,
        },
        {
          name: 'Not Outs',
          value: stats.batStats.notOuts,
        },
        {
          name: 'Strike Rate',
          value: stats.batStats.strikeRate,
        },
        {
          name: 'Average',
          value: stats.batStats.average,
        },
        {
          name: 'Ones',
          value: stats.batStats.ones,
        },
        {
          name: 'Twos',
          value: stats.batStats.twos,
        },
        {
          name: 'Threes',
          value: stats.batStats.threes,
        },
        {
          name: 'Fours',
          value: stats.batStats.fours,
        },
        {
          name: 'Sixes',
          value: stats.batStats.sixes,
        },
      ],
      bowlingStats: [
        {
          name: 'Matches',
          value: stats.bowlingStats.matches,
        },
        {
          name: 'Innings',
          value: stats.bowlingStats.innings,
        },
        {
          name: 'Balls Bowled',
          value: stats.bowlingStats.totalBowls,
        },
        {
          name: 'Wickets',
          value: stats.bowlingStats.wickets,
        },
        {
          name: 'Best',
          value: stats.bowlingStats.best,
        },
        {
          name: '5 Wickets',
          value: stats.bowlingStats.fifer,
        },
        {
          name: '3 Wickets',
          value: stats.bowlingStats.three_for,
        },
        {
          name: 'Wides',
          value: stats.bowlingStats.wides,
        },
        {
          name: 'No Balls',
          value: stats.bowlingStats.noBalls,
        },
      ],
      fieldingStats: [
        {
          name: 'Catches',
          value: stats.fieldStats.catches,
        },
        {
          name: 'Most catches',
          value: stats.fieldStats.mostCatches,
        },
        {
          name: 'Run Outs',
          value: stats.fieldStats.runOuts,
        },
        {
          name: 'Most Run Outs',
          value: stats.fieldStats.mostRunOuts,
        },
      ],
    };
    return result;
  }

  async updateProfile(id: number, updateProfieDto: ProfileDto) {
    return await this.prismaService.user.update({
      where: {
        id: id,
      },
      data: {
        ...updateProfieDto,
      },
    });
  }
}
