import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { IUser } from '../interfaces/user.interface';
import { IUserBiometrics } from '../interfaces/biometrics.interface';
import { Job } from './job.model';
import { Biometrics } from './biometrics.model';
import { Military } from './military.model';
import { Education } from './education.model';

@Schema({ collection: 'users', timestamps: true }) // Указываем имя коллекции и свойство для автоматической записи времени в базу
export class UserModel extends Document implements IUser {
  @Prop({ required: true })
  username: string;

  @Prop({ required: true })
  status: string;

  @Prop({ required: true })
  role: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  biometrics: Biometrics;

  @Prop({})
  education: Education;

  @Prop({})
  military: Military;

  @Prop({})
  job: Job;
}
export const UserSchema = SchemaFactory.createForClass(UserModel); // Создаём схему.
