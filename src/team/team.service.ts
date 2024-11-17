import { Injectable } from '@nestjs/common';
import { addPlayerDto } from './dto/team.dto';

@Injectable()
export class TeamService {
  async addPlayer(addPlayerDto: addPlayerDto, teamId: number) {}

  async deletePlayer() {}
}
