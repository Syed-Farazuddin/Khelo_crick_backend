import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ProfileDto } from './dto/profile.dto';

@Injectable()
export class ProfileService {
  constructor(private prismaService: PrismaService) {}

  async getProfileDetails(id: number) {
    const userDetails = await this.prismaService.user.findUnique({
      where: {
        id: id,
      },
    });
  }

  async updateProfile(id: number, updateProfieDto: ProfileDto) {
    return await this.prismaService.user.update({
      where: {
        id: id,
      },
      data: {
        ...updateProfieDto,
      },
    });
  }
}
