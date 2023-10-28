import { Prop, Schema } from '@nestjs/mongoose';
import { IUserEducation } from '../interfaces/education.interface';
import { Document } from 'mongoose';

@Schema()
export class Education extends Document implements IUserEducation {
  @Prop()
  institute: string;
  @Prop()
  startDate: string;
  @Prop()
  endDate: string;
  @Prop()
  profession: string;
  @Prop()
  faculty: string;
  @Prop()
  fiplomaNumber: string;
  @Prop()
  issueDate: string;
}
