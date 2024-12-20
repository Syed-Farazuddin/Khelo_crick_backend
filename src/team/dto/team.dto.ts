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
  @IsOptional()
  imageUrl?: string; // For updating Team Profile

  @IsString()
  @IsOptional()
  teamName?: string; // For updating Team Name
}

export class addPlayerDto {
  @IsString()
  mobile: string;
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
