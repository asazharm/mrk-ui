import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { LoginStatus } from './interfaces/login-status.interface';
import { LoginUserDto } from '../users/dto/user.login.dto';
import { JwtPayload } from './interfaces/payload.interface';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../users/dto/user.create.dto';
import { UserDto } from '../users/dto/user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService
  ) {}

  async login(loginUserDto: LoginUserDto): Promise<LoginStatus> {
    // Метод логина
    const user = await this.usersService.findByLogin(loginUserDto); // Ищем пользователя по соответствию
    const token = await this._createToken(user); // Генерируем токен
    // throw token;
    return {
      // Возвращаем данные
      username: user.username,
      ...token,
    };
  }

  async validateUser(payload: JwtPayload): Promise<UserDto> {
    // Проверка наличия пользователя
    const user = await this.usersService.findByPayload(payload);
    if (!user) {
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
    }
    return user;
  }

  async getProfile(payload: JwtPayload): Promise<UserDto> {
    // Проверка наличия пользователя
    const user = await this.usersService.findByPayload(payload);
    console.log(user)
    if (!user) {
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
    }
    return user;
  }

  private async _createToken({ username }: UserDto): Promise<any> {
    const user: JwtPayload = { username };

    return {
      accessToken: await this.jwtService.signAsync(user),
    };
  }
}
