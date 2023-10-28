import { UsersService } from './users.service';
import {
  Controller,
  ValidationPipe,
  UsePipes,
  Post,
  Body,
  HttpException,
  HttpStatus,
  UseGuards,
  Get,
  Req,
  Param,
  Query,
} from '@nestjs/common';
import { CreateUserDto } from './dto/user.create.dto';
import { ResponeStatus } from './interfaces/responeStatus.interface';
import { AuthGuard } from '../guards/auth.guard';
import { UpdateUserDto } from './dto/user.update.dto';
import { GetUsersDto } from './dto/users.get.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe())
  @Post('create')
  public async create(
    @Body() createUserDto: CreateUserDto
  ): Promise<ResponeStatus> {
    const result: ResponeStatus = await this.usersService.create(createUserDto);

    if (!result.success) {
      throw new HttpException(result.message, HttpStatus.BAD_REQUEST);
    }

    return result;
  }

  @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe())
  @Get('all')
  public async getUsers(@Query() query: GetUsersDto): Promise<any> {
    const result = await this.usersService.getUsers(query);

    return result;
  }

  @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe())
  @Get('find')
  public async getUser(@Query() query: any): Promise<any> {
    const result = await this.usersService.getUser(query);

    if (!result[0]) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return result.pop();
  }

  @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe())
  @Post('update')
  public async updateUser(
    @Body() updateUserDto: UpdateUserDto
  ): Promise<ResponeStatus> {
    const result: ResponeStatus = await this.usersService.updateUser(
      updateUserDto
    );

    if (!result.success) {
      throw new HttpException(result.message, HttpStatus.BAD_REQUEST);
    }

    return result;
  }
}
