import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { MatchesService } from './matches.service';
import { AuthGuard } from 'src/common/guards/auth.guard';
import {
  ScheduleMatchDto,
  selectBatsmanDto,
  selectBowlerDto,
  startMatchDto,
} from './dto/matches.dto';

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

  @Post('start_match')
  @UseGuards(AuthGuard)
  startMatch(@Body() startMatchDto: startMatchDto, @Request() request: any) {
    return this.matchesService.startmatch(startMatchDto, request);
  }

  @Post(':id/scoring')
  @UseGuards(AuthGuard)
  scoring(
    @Body() scoring: any,
    @Request() request: any,
    @Param('id', ParseIntPipe) inningsId: number,
  ) {
    return this.matchesService.scoring(scoring, request, inningsId);
  }

  @Post('your_matches')
  @UseGuards(AuthGuard)
  getYourMatches(@Request() request: any) {
    return this.matchesService.yourMatches(request.user.id);
  }

  @Post(':id/scoring/select_bowler')
  @UseGuards(AuthGuard)
  selectBowler(
    @Body() selectBowlerDto: selectBowlerDto,
    @Request() request: any,
    @Param('id', ParseIntPipe) inningsId: number,
  ) {
    return this.matchesService.selectBolwer(
      selectBowlerDto,
      request,
      inningsId,
    );
  }

  @Post(':id/scoring/update_bowler')
  @UseGuards(AuthGuard)
  updateBowler(
    @Body() selectBowlerDto: selectBowlerDto,
    @Request() request: any,
  ) {
    return this.matchesService.updateBowler(selectBowlerDto, request);
  }

  @Post(':id/scoring/select_batsman')
  @UseGuards(AuthGuard)
  selectBatsman(
    @Body() selectBatsmanDto: selectBatsmanDto,
    @Request() request: any,
    @Param('id', ParseIntPipe) inningsId: number,
  ) {
    return this.matchesService.selectBatsman(
      selectBatsmanDto,
      request,
      inningsId,
    );
  }

  @Get('innings/:id')
  @UseGuards(AuthGuard)
  getInningsData(@Param('id', ParseIntPipe) inningsId: number) {
    return this.matchesService.findInnings(inningsId);
  }
}
