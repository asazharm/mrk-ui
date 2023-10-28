import { Module } from '@nestjs/common';

import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { VacationsController } from './vacations.controller';
import { VacationsService } from './vacations.service';
import { VacationModel, VacationSchema } from './models/vacation.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      // Импортируем MongooseModule
      {
        name: VacationModel.name,
        schema: VacationSchema,
      },
    ]),
    JwtModule,
  ],
  providers: [VacationsService],
  controllers: [VacationsController],
})
export class VacationsModule {}
