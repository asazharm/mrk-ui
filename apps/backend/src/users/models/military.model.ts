import { Schema, Prop } from '@nestjs/mongoose';
import { IUserMilitary } from '../interfaces/military.interface';
import { Document } from 'mongoose';

@Schema()
export class Military extends Document implements IUserMilitary {
  @Prop()
  militaryBrochure: string;
  @Prop()
  disarmamentState: string;
  @Prop()
  militaryServiceDate: string;
  @Prop()
  militaryEmploymentDate: string;
}
