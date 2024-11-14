import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  sendOtpDto,
  updateFireBaseTokenDto,
  verifyOtpDto,
} from './dtos/auth.dto';

@Injectable()
export class AuthService {
  constructor(private prismaService: PrismaService) {}
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
    const { otp } = await this.prismaService.user.findFirst({
      where: {
        mobile: verifyOtp.mobile,
      },
      select: {
        otp: true,
      },
    });
    if (otp == verifyOtp.otp) {
      return {
        success: true,
        message: 'Successfully Verified OTP',
      };
    }
    return {
      status: false,
    };
  }

  async updateToken(updateFireBaseTokenDto: updateFireBaseTokenDto) {
    await this.prismaService.userToken.upsert({
      where: {
        userId: 1,
      },
      update: {
        token: updateFireBaseTokenDto.token,
      },
      create: {
        token: updateFireBaseTokenDto.token,
        userId: 1,
      },
    });
  }

  async deleteAccount() {}
}
