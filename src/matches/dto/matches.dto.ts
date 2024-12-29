import {
  IsArray,
  IsBoolean,
  isNumber,
  IsNumber,
  IsOptional,
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
  teamAPlayers: number[];

  @IsArray()
  @ValidateNested({ each: true })
  teamBPlayers: number[];
}

export class startMatchDto {
  @IsNumber()
  tossWonTeamId: number;

  @IsBoolean()
  @IsOptional()
  chooseToBat?: boolean;

  @IsBoolean()
  @IsOptional()
  chooseToBall?: boolean;

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
  teamAPlayers: number[];

  @IsArray()
  @ValidateNested({ each: true })
  teamBPlayers: number[];
}

export class ScoringDto {
  @IsBoolean()
  @IsOptional()
  isWide: boolean;

  @IsBoolean()
  @IsOptional()
  isNoBall: boolean;

  @IsBoolean()
  @IsOptional()
  isBye: boolean;

  @IsNumber()
  runs: number;

  @IsBoolean()
  isWicket: number;

  @IsNumber()
  @IsOptional()
  playedBy: number;

  @IsNumber()
  order: number;
}

export class selectBatsmanDto {
  @IsNumber()
  strikerId: number;
  @IsNumber()
  nonStrikerId: number;
}

export class StartNewInningsDto {
  @IsNumber()
  inningsid: number;

  @IsNumber()
  newInningsId: number;
}

export class selectBowlerDto {
  @IsNumber()
  bowlerId: number;

  @IsNumber()
  @IsOptional()
  order?: number;

  @IsNumber()
  @IsOptional()
  overId?: number;
}
