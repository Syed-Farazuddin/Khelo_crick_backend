import { IsOptional, IsString } from 'class-validator';

export class ProfileDto {
  @IsString()
  name?: string;

  @IsString()
  @IsOptional()
  mobile?: string;

  @IsString()
  @IsOptional()
  age?: number;

  @IsString()
  @IsOptional()
  dob?: string;

  @IsString()
  @IsOptional()
  imageUrl?: string;
}
