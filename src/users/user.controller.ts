import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
  Query,
  Session,
  UseInterceptors,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UserService } from './user.service';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UserDto } from './dtos/user.dto';
import { serialize } from '../interceptors/serialize.interceptor';
import { AuthService } from './auth.service';
import { CurrentUser } from './decorators/current-user.decorator';
import { User } from './user.entity';
import { CurrentUserInterceptor } from './interceptors/current-user.interceptor';
@Controller('auth')
@UseInterceptors(CurrentUserInterceptor)
@serialize(UserDto)
export class UserController {
  constructor(
    private userService: UserService,
    private authService: AuthService,
  ) {}
  @Post('/signup')
  async createUser(@Body() body: CreateUserDto, @Session() session: any) {
    const user = await this.authService.signup(body.email, body.password);
    session.userId = user.id;
    return user;
  }
  @Post('/signin')
  async signin(@Body() body: CreateUserDto, @Session() session: any) {
    const user = await this.authService.signin(body.email, body.password);
    session.userId = user.id;
    return user;
  }
  @Post('/signout')
  signout(@Session() session: any) {
    session.userId = null;
  }
  @Get('/whoami')
  whoami(@CurrentUser() user: User) {
    return user;
  }
  @Get()
  findAll(@Query('email') query: string) {
    return this.userService.find(query);
  }
  @Get('/:id')
  findUser(@Param('id') id: string) {
    return this.userService.findOne(parseInt(id));
  }
  @Patch('/:id')
  updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
    return this.userService.update(parseInt(id), body);
  }
  @Delete('/:id')
  removeUSer(@Param('id') id: string) {
    return this.userService.remove(parseInt(id));
  }
}
