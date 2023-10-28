import {
  Controller,
  Body,
  Post,
  HttpStatus,
  Get,
  Request,
  UseGuards,
  UsePipes,
  ValidationPipe,
  HttpCode,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginStatus } from './interfaces/login-status.interface';
import { LoginUserDto } from '../users/dto/user.login.dto';
import { JwtPayload } from './interfaces/payload.interface';
import { AuthGuard } from '../guards/auth.guard';

@Controller('auth') // Указываем необязательный префикс
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @UsePipes(new ValidationPipe())
  @Post('login') // метод логина
  async login(@Body() loginUserDto: LoginUserDto): Promise<LoginStatus> {
    return await this.authService.login(loginUserDto);
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  async getProfile(@Request() req: any): Promise<JwtPayload> {
    return await this.authService.getProfile({ username: req.user.username });
  }
}
