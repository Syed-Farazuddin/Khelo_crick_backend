import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  createNewUserAndAddInTeam,
  sendOtpDto,
  updateFireBaseTokenDto,
  verifyOtpDto,
} from './dtos/auth.dto';
import { AuthGuard } from 'src/common/guards/auth.guard';

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

  @Post('create_player_and_add_in_team')
  createPlayerAndAddInTeam(
    @Body() createPlayerAndAddInTeam: createNewUserAndAddInTeam,
  ) {
    return this.authService.createNewUserAndAddInTeam(createPlayerAndAddInTeam);
  }

  @UseGuards(AuthGuard)
  @Post('firebase_token')
  updateFireBaseToken(
    @Body() body: updateFireBaseTokenDto,
    @Request() req: any,
  ) {
    return this.authService.updateToken(body, req);
  }
}
