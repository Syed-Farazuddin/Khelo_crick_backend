import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ProfileService } from './profile.service';
import { ProfileDto } from './dto/profile.dto';
import { AuthGuard } from 'src/common/guards/auth.guard';

@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get('')
  @UseGuards(AuthGuard)
  getProfileDetails(@Request() request) {
    return this.profileService.getProfileDetails(request.user.id);
  }
  @Post('/:id/update')
  updateProfile(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProfileDto: ProfileDto,
  ) {
    return this.profileService.updateProfile(id, updateProfileDto);
  }
}
