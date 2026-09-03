import { UserService } from './user.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';
const scrypt = promisify(_scrypt);
@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}
  // signup
  async signup(email: string, password: string) {
    // check if email is in use
    const users = await this.userService.find(email);
    if (users.length) throw new NotFoundException('Email already in use');
    // encrypt the password
    // 1) create the salt
    const salt = randomBytes(8).toString('hex');
    // 2) hash the password and salt together
    const hash = (await scrypt(password, salt, 32)) as Buffer;
    // 3) join the hash and salt together
    const result = salt + '.' + hash.toString('hex');
    // create a new user and save it
    const user = await this.userService.create(email, result);
    return user;
  }
  // signin
  async signin(email: string, password: string) {
    // get user based on login email
    const [user] = await this.userService.find(email);
    if (!user) throw new NotFoundException('user not found');
  }
}
