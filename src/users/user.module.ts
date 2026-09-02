import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { User } from './user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthServiceService } from './auth-service.service';
@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [UserService, AuthServiceService],
  exports: [UserService],
})
export class UserModule {}
