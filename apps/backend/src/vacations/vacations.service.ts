import { Injectable } from '@nestjs/common';
import { CreateVacationDto } from './dto/vacation.create.dto';
import { ResponeStatus } from './interfaces/responseStatus.interface';

@Injectable()
export class VacationsService {
  async createVacation(
    createVacationDto: CreateVacationDto
  ): Promise<ResponeStatus> {
    let status: ResponeStatus = {
      success: true,
      message: 'user registered',
    };

    try {
      // const { username, firstname, lastname } = userDto;
      // const userInDb = await this.userModel.findOne({ username }).exec();
      // if (userInDb) {
      //   // Если такой пользователь есть выводим ошибку
      //   throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
      // }
      // const salt = await genSalt(10); // С помощью библиотеки bycrypt создаём соль
      // const hashPassword = await hash(
      //   // "pass",
      //   Math.random().toString(36).slice(-8),
      //   salt
      // ); // bycrypt создаёт хеш пароля
      // const user: UserModel = await new this.userModel({
      //   password: hashPassword,
      //   biometrics: {
      //     firstname,
      //     lastname,
      //   },
      //   ...userDto,
      // });
      // await user.save(); // Сохраняем в БД
    } catch (err) {
      status = {
        success: false,
        message: err,
      };
    }
    return status;
  }
}
