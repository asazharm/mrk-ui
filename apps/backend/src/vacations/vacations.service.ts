import { message } from 'antd';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateVacationDto } from './dto/vacation.create.dto';
import { ResponeStatus } from './interfaces/responseStatus.interface';
import { UsersService } from '../users/users.service';
import { VacationModel } from './models/vacation.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UpdateVacationDto } from './dto/vacation.update.dto';

@Injectable()
export class VacationsService {
  constructor(
    private readonly usersService: UsersService,
    @InjectModel(VacationModel.name)
    private readonly vacationModel: Model<VacationModel>
  ) {}
  async createVacation(
    createVacationDto: CreateVacationDto
  ): Promise<ResponeStatus> {
    let status: ResponeStatus = {
      success: true,
      message: 'vacation added',
    };

    try {
      const { username } = createVacationDto;
      const user = await this.usersService.getUser({ username });
      if (!user) {
        throw new HttpException('User doesnt exist', HttpStatus.BAD_REQUEST);
      }
      const vacation: VacationModel = await new this.vacationModel(
        createVacationDto
      );
      await vacation.save(); // Сохраняем в БД
    } catch (err) {
      status = {
        success: false,
        message: err,
      };
    }
    return status;
  }

  async updateVacation(
    updateVacationDto: UpdateVacationDto
  ): Promise<ResponeStatus> {
    let status: ResponeStatus = {
      success: true,
      message: 'vacation updated',
    };

    try {
      const { username, orderNumber, data } = updateVacationDto;
      const user = await this.usersService.getUser({ username });
      if (!user) {
        throw new HttpException('User doesn`t exist', HttpStatus.BAD_REQUEST);
      }
      const vacation = await this.vacationModel
        .findOne({
          orderNumber,
          username,
        })
        .exec();
      if (!vacation)
        throw new HttpException(
          'Vacation doesn`t exist',
          HttpStatus.BAD_REQUEST
        );

      await vacation.updateOne(JSON.parse(data)).exec();
      await vacation.save();
    } catch (err) {
      status = {
        success: false,
        message: err.message,
      };
    }
    return status;
  }
}
