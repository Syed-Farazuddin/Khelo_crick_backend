import { Type } from 'class-transformer';
import {
  ArrayNotEmpty,
  IsArray,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

export class createTeamDto {
  @IsString()
  teamA: string; // Team A Name

  @IsString()
  teamB: string; // Team B Name
}

export class updateTeamDto {
  @IsString()
  @IsOptional()
  imageUrl?: string; // For updating Team Profile

  @IsString()
  @IsOptional()
  teamName?: string; // For updating Team Name
}

export class addPlayerDto {
  @IsString()
  @IsOptional()
  mobile?: string;
}

export class createPlayerDto {
  @IsString()
  @IsOptional()
  name?: string;
}

export class selectPlayersDto {
  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => Player)
  players: Player[]; // Takes Players ID and store them after scheduling a match
}

class Player {
  @IsNumber()
  id: number;
}
