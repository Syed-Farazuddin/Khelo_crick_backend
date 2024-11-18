import {
  Body,
  Controller,
  Param,
  ParseIntPipe,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { TeamService } from './team.service';
import { addPlayerDto, createTeamDto } from './dto/team.dto';
import { AuthGuard } from 'src/common/guards/auth.guard';

@Controller('team')
export class TeamController {
  constructor(private readonly teamService: TeamService) {}

  @Post('createTeam')
  @UseGuards(AuthGuard)
  createTeam(@Body() createTeamDto: createTeamDto, @Request() request: any) {
    return this.teamService.createTeam(createTeamDto, request);
  }

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
