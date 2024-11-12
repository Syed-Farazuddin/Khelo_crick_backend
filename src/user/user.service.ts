import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  async createUser() {
    return 'Create a new user maybe he enters a number';
  }
}
