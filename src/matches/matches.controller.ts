import {
  Body,
  Controller,
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
}
