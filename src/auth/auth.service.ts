import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  sendOtpDto,
  updateFireBaseTokenDto,
  verifyOtpDto,
} from './dtos/auth.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private prismaService: PrismaService,
    private jwtService: JwtService,
  ) {}
  async sendOtp(sendOtpDto: sendOtpDto) {
    const newOtp = this.makeOTP();
    const user = await this.prismaService.user.findFirst({
      where: {
        mobile: sendOtpDto.mobile,
      },
      select: {
        name: true,
      },
    });
    if (!user) {
      await this.prismaService.user.create({
        data: {
          mobile: sendOtpDto.mobile,
          otp: newOtp,
        },
      });
      return {
        success: true,
        newUser: true,
        message: 'Successfully sent OTP',
      };
    }
    await this.prismaService.user.update({
      where: {
        mobile: sendOtpDto.mobile,
      },
      data: {
        otp: newOtp,
      },
    });
    return {
      success: true,
      message: 'Successfully sent OTP',
    };
  }

  makeOTP() {
    let otp: number = 0;
    for (let i = 0; i < 4; i++) {
      let pow = this.pow(i);
      otp += (Math.floor(Math.random() * 9) + 1) * pow;
    }
    return otp;
  }

  pow(k: number): number {
    let pow: number = 1;
    for (let i = 0; i < k; i++) {
      pow = pow * 10;
    }
    return pow;
  }

  async verifyOtp(verifyOtp: verifyOtpDto) {
    const { otp, id } = await this.prismaService.user.findFirst({
      where: {
        mobile: verifyOtp.mobile,
      },
      select: {
        otp: true,
        id: true,
      },
    });
    if (otp != Number.parseInt(verifyOtp.otp)) {
      throw new UnauthorizedException('Invalid Credentials');
    }
    if (verifyOtp.isNewPlayer) {
      const bowlingStatsId = await this.prismaService.bowlingStats.create({
        data: {},
        select: {
          id: true,
        },
      });
      const batStatsId = await this.prismaService.battingStats.create({
        data: {},
        select: {
          id: true,
        },
      });
      const fieldStatsId = await this.prismaService.fieldingStats.create({
        data: {},
        select: {
          id: true,
        },
      });
      const StatsId = await this.prismaService.stats.create({
        data: {
          batStatsId: batStatsId.id,
          bowlStatsId: bowlingStatsId.id,
          fieldStatsId: fieldStatsId.id,
        },
      });
      await this.prismaService.player.create({
        data: {
          userId: id,
          statsId: StatsId.id,
        },
      });
    }
    const payload = JSON.stringify({
      mobile: verifyOtp.mobile,
      id: id,
    });
    const token = await this.jwtService.signAsync(payload);
    return {
      success: true,
      token: token,
      message: 'Successfully Verified OTP',
    };
  }

  async updateToken(
    updateFireBaseTokenDto: updateFireBaseTokenDto,
    request: any,
  ) {
    await this.prismaService.userToken.upsert({
      where: {
        userId: request.user.id,
      },
      update: {
        token: updateFireBaseTokenDto.token,
      },
      create: {
        token: updateFireBaseTokenDto.token,
        userId: request.user.id,
      },
    });
    return request.user;
  }

  async deleteAccount() {}
}
