import { Body, Controller, Param, ParseIntPipe, Post } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { ProfileDto } from './dto/profile.dto';

@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Post('/:id/update')
  updateProfile(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProfileDto: ProfileDto,
  ) {
    return this.profileService.updateProfile(id, updateProfileDto);
  }
}
