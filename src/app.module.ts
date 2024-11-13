import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { MatchesModule } from './matches/matches.module';
import { TournamentModule } from './tournament/tournament.module';
import { ProfileModule } from './profile/profile.module';
import { StoreModule } from './store/store.module';

@Module({
  imports: [UserModule, PrismaModule, AuthModule, MatchesModule, TournamentModule, ProfileModule, StoreModule], // Import modules only
  controllers: [AppController], // Only include AppController here
  providers: [AppService],
})
export class AppModule {}
