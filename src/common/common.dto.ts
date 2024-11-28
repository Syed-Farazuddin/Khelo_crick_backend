import { IsNumber, IsOptional } from 'class-validator';

export class User {
  @IsNumber()
  @IsOptional()
  id?: number;
}
