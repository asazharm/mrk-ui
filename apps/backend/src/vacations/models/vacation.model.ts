import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { IVacation } from '../interfaces/vacation.interface';

@Schema({ collection: 'vacations', timestamps: true })
export class VacationModel extends Document implements IVacation {
  @Prop()
  orderDate: string;
  @Prop()
  orderNumber: string;
  @Prop({ required: true })
  vacationType: string;
  @Prop({ required: true })
  workingYear: string;
  @Prop({ required: true })
  vacationPeriod: string;
  @Prop({ required: true })
  username: string;
}
export const VacationSchema = SchemaFactory.createForClass(VacationModel);
