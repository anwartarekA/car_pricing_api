import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}
  create(email: string, password: string) {
    const user = this.repo.create({ email, password });
    return this.repo.save(user);
  }
  async find(email: string) {
    const users = await this.repo.find({ where: { email } });
    if (!users) throw new NotFoundException('no users found');
    return users;
  }
  async findOne(id: number) {
    if (!id) return null;
    const user = await this.repo.findOne({ where: { id } });
    if (!user) throw new NotFoundException('no user found');
    return user;
  }
  async update(id: number, attrs: Partial<User>) {
    const user = await this.findOne(id);
    if (!user) throw new NotFoundException('no user found');
    Object.assign(user, attrs);
    return this.repo.save(user);
  }
  async remove(id: number) {
    const user = await this.findOne(id);
    if (!user) throw new NotFoundException('no user found');
    return this.repo.remove(user);
  }
}
