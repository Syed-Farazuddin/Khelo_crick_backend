import { IsNumber, IsString } from 'class-validator';

export class ScheduleMatchDto {
  @IsNumber()
  teamA: number;

  @IsNumber()
  teamB: number;

  @IsString()
  ballType: string;

  @IsNumber()
  overs: number;

  @IsNumber()
  bowlingLimit: number;

  @IsString()
  ground: string;

  @IsNumber()
  state: string;
}
