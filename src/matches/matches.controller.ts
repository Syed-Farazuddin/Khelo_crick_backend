import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { MatchesService } from './matches.service';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { ScheduleMatchDto } from './dto/matches.dto';

@Controller('matches')
export class MatchesController {
  constructor(private readonly matchesService: MatchesService) {}

  @Post('schedule_match')
  @UseGuards(AuthGuard)
  scheduleMatch(
    @Body() scheduleMatchDto: ScheduleMatchDto,
    @Request() request: any,
  ) {
    return this.matchesService.scheduleMatch(scheduleMatchDto, request);
  }
}
