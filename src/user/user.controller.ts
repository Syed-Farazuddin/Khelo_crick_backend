import { Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private prismaService: PrismaService,
  ) {}

  @Post()
  async createUser() {
    return this.userService.createUser;
  }
}
