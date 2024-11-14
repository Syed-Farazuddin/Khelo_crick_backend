import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class sendOtpDto {
  @IsString()
  mobile: string;

  @IsString()
  deviceId: string;

  @IsString()
  device: string;
}

export class verifyOtpDto {
  @IsString()
  mobile: string;

  @IsNumber()
  otp: number;

  @IsString()
  deviceId: string;

  @IsString()
  device: string;
}

export class updateFireBaseTokenDto {
  @IsString()
  @IsOptional()
  token?: string;

  @IsString()
  @IsOptional()
  deviceId?: string;
}
