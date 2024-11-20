import { Type } from 'class-transformer';
import {
  ArrayNotEmpty,
  IsArray,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';

export class ScheduleMatchDto {
  @IsArray()
  teams: number[];

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

  @IsString()
  date: string;

  @IsArray()
  @ValidateNested({ each: true })
  players: number[];
}
