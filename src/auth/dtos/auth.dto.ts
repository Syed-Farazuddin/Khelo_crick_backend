import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';

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
  otp: string;

  @IsString()
  deviceId: string;

  @IsString()
  device: string;

  @IsBoolean()
  isNewPlayer: boolean;
}

export class updateFireBaseTokenDto {
  @IsString()
  @IsOptional()
  token?: string;

  @IsString()
  @IsOptional()
  deviceId?: string;
}

export class createNewUserAndAddInTeam {
  teamId: number;
  mobile: string;
  name: string;
}
