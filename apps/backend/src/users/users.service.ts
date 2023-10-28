import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateUserDto } from './dto/user.create.dto';
import { InjectModel } from '@nestjs/mongoose';
import { UserModel } from './models/user.model';
import { Model } from 'mongoose';
import { compare, genSalt, hash } from 'bcrypt';
import { ResponeStatus } from './interfaces/responeStatus.interface';
import { GetUsersDto } from './dto/users.get.dto';
import { LoginUserDto } from './dto/user.login.dto';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(UserModel.name)
    private readonly userModel: Model<UserModel> // Внедряем модель БД в сервис для дальнейшего использования
  ) {}

  // async findOne(options?: object): Promise<UserDto> {
  //   // Метод поиска одного пользователя
  //   const user = await this.userModel.findOne(options).exec(); // Модель предоставляет нам методы для работы с БД
  //   return toUserDto(user); // Готовим данные к передаче пользователю
  // }

  async findByLogin({ username, password }: LoginUserDto): Promise<any> {
    // Метод проверки пользователя по имени и паролю
    const user = await this.userModel.findOne({ username }).exec();

    if (!user) {
      // Если пользователя нет, выводим ошибку 'User not found'
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    const areEqual = await compare(password, user.password); // С помощью библиотеки bcrypt вставляем оригинальный пароль и хеш; если они равны, то вернётся true

    if (!areEqual) {
      // Если пароли не равны, то выводим ошибку 'Invalid credentials'
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }

    return user;
  }

  async findByPayload({ username }: any): Promise<UserDto> {
    // Поиск пользователя по имени
    return await this.userModel.findOne({ username });
  }

  async create(createUserDto: CreateUserDto): Promise<ResponeStatus> {
    let status: ResponeStatus = {
      success: true,
      message: 'user registered',
    };

    try {
      const { username, firstname, lastname, email } = createUserDto;

      const userInDb = await this.userModel.findOne({ username }).exec();
      const emailInDb = await this.userModel
        .findOne({ 'biometrics.email': email })
        .exec();
      if (userInDb) {
        // Если такой пользователь есть выводим ошибку
        throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
      }
      if (emailInDb) {
        // Если такой пользователь есть выводим ошибку
        throw new HttpException('Email already exists', HttpStatus.BAD_REQUEST);
      }

      const salt = await genSalt(10); // С помощью библиотеки bycrypt создаём соль
      const hashPassword = await hash(
        // "pass",
        Math.random().toString(36).slice(-8),
        salt
      ); // bycrypt создаёт хеш пароля

      const user: UserModel = await new this.userModel({
        password: hashPassword,
        biometrics: {
          firstname,
          lastname,
          email,
        },
        ...createUserDto,
      });

      await user.save(); // Сохраняем в БД
    } catch (err) {
      status = {
        success: false,
        message: err,
      };
    }
    return status;
  }

  async getUsers({
    page,
    pageSize,
    sortField,
    sortOrder,
  }: GetUsersDto): Promise<any> {
    const fields = [
      'username',
      'firstname',
      'lastname',
      'position',
      'status',
      'role',
      'biometrics',
      'education',
      'military',
      'job',
    ];

    if (page && pageSize) {
      const users = this.userModel.find(null, fields, {
        skip: pageSize * (page - 1),
        limit: pageSize,
      });
      if (sortField && sortOrder)
        users.sort({
          [sortField as keyof UserModel]: sortOrder === 'ascend' ? 1 : -1,
        });
      const result = await users.exec();
      const count = await this.userModel.count().exec();

      return {
        users: result,
        page: page,
        pages: Math.ceil(count / pageSize),
        count: count,
      };
    } else {
      return await this.userModel.find();
    }
  }

  async getUser({ username }): Promise<any> {
    const user = await this.userModel.find({ username }).exec();
    return user;
  }

  async updateUser({ username, data }): Promise<ResponeStatus> {
    let status: ResponeStatus = {
      success: true,
      message: 'user registered',
    };
    try {
      await this.userModel.updateOne({ username }, data).exec();
    } catch (err) {
      status = {
        success: false,
        message: err,
      };
    }
    return status;
  }

  private _sanitizeUser(user: UserModel) {
    delete user.password;
    return user;
  }
}
