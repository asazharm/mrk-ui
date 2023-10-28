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

@Controller('vacations')
export class VacationsController {
  constructor(private readonly vacationsService: VacationsService) {}

  @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe())
  @Post('create')
  public async createVacation(
    @Body() createVacationDto: CreateVacationDto
  ): Promise<any> {
    const result = await this.vacationsService.createVacation(
      createVacationDto
    );

    return result;
  }
}
