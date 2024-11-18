import { Injectable } from '@nestjs/common';
import { ScheduleMatchDto } from './dto/matches.dto';

@Injectable()
export class MatchesService {
  async scheduleMatch(scheduleMatchDto: ScheduleMatchDto, request: any) {}
}
