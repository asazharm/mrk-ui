import {
  Body,
  Controller,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '../guards/auth.guard';
import { CreateVacationDto } from './dto/vacation.create.dto';
import { VacationsService } from './vacations.service';
import { ResponeStatus } from './interfaces/responseStatus.interface';
import { UpdateVacationDto } from './dto/vacation.update.dto';

@Controller('vacations')
export class VacationsController {
  constructor(private readonly vacationsService: VacationsService) {}

  @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe())
  @Post('create')
  public async createVacation(
    @Body() createVacationDto: CreateVacationDto
  ): Promise<ResponeStatus> {
    const result = await this.vacationsService.createVacation(
      createVacationDto
    );

    return result;
  }

  // @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe())
  @Post('update')
  public async updateVacation(
    @Body() updateVacationDto: UpdateVacationDto
  ): Promise<ResponeStatus> {
    const result = await this.vacationsService.updateVacation(
      updateVacationDto
    );

    return result;
  }
}
