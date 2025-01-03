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
import { TeamService } from './team.service';
import { addPlayerDto, createTeamDto } from './dto/team.dto';
import { AuthGuard } from 'src/common/guards/auth.guard';

@Controller('team')
export class TeamController {
  constructor(private readonly teamService: TeamService) {}

  @Post('create_team')
  @UseGuards(AuthGuard)
  createTeam(@Body() createTeamDto: createTeamDto, @Request() request: any) {
    return this.teamService.createTeam(createTeamDto, request);
  }

  @Post(':id/add_player')
  addPlayer(
    @Body() addPlayerDto: addPlayerDto,
    @Param('id', ParseIntPipe) teamId: number,
  ) {
    return this.teamService.addPlayer(addPlayerDto, teamId);
  }

  @Post(':id/delete_player')
  deletePlayer() {
    return this.teamService.deletePlayer();
  }

  @Get('get_your_teams')
  @UseGuards(AuthGuard)
  fetchYourTeams(@Request() request: any) {
    return this.teamService.getYourTeams(request);
  }
}
