import { Body, Controller, Param, ParseIntPipe, Post } from '@nestjs/common';
import { TeamService } from './team.service';
import { addPlayerDto } from './dto/team.dto';

@Controller('team')
export class TeamController {
  constructor(private readonly teamService: TeamService) {}

  @Post(':id/player')
  addPlayer(
    @Body() addPlayerDto: addPlayerDto,
    @Param('id', ParseIntPipe) teamId: number,
  ) {
    return this.teamService.addPlayer(addPlayerDto, teamId);
  }

  @Post(':id/deletePlayer')
  deletePlayer() {
    return this.teamService.deletePlayer();
  }
}
