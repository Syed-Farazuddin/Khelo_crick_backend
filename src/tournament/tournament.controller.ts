import { Controller } from '@nestjs/common';
import { TournamentService } from './tournament.service';

@Controller('tournament')
export class TournamentController {
  constructor(private readonly tournamentService: TournamentService) {}
}
