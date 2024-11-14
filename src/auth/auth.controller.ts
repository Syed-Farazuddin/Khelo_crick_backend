import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  sendOtpDto,
  updateFireBaseToken,
  updateFireBaseTokenDto,
  verifyOtpDto,
} from './dtos/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private prismaService: PrismaService,
  ) {}

  @Post('sendOtp')
  sendOtp(@Body() sendOtpDto: sendOtpDto) {
    return this.authService.sendOtp(sendOtpDto);
  }

  @Post('verifyotp')
  verifyOtp(@Body() verifyOtpDto: verifyOtpDto) {
    return this.authService.verifyOtp(verifyOtpDto);
  }

  @Post('firebase_token')
  updateFireBaseToken(@Body() body: updateFireBaseTokenDto) {
    return this.authService.updateToken(body);
  }
}
