import { UserService } from './user.service';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}
  // signup
  async signup(email: string, password: string) {
    // check if email is in use
    const users = await this.userService.find(email);
    if (users.length) throw new NotFoundException('Email already in use');
  }
}
