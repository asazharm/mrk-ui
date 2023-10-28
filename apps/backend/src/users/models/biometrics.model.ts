import { Prop, Schema } from '@nestjs/mongoose';
import { IUserBiometrics } from '../interfaces/biometrics.interface';
import { Document } from 'mongoose';

@Schema()
export class Biometrics extends Document implements IUserBiometrics {
  @Prop()
  phone: number;
  @Prop()
  firstname: string;
  @Prop()
  lastname: string;
  @Prop()
  surname: string;
  @Prop()
  birthDate: string;
  @Prop()
  familyStatus: string;
  @Prop()
  familyMembers: number;
  @Prop()
  VAT: string;
  @Prop()
  childrenNumber: number;
  @Prop()
  documentName: string;
  @Prop()
  documentNumber: string;
  @Prop()
  givenBy: string;
  @Prop()
  givenWas: string;
  @Prop()
  validUntil: string;
  @Prop()
  socialCardNumber: string;
  @Prop()
  residentialCommunity: string;
  @Prop()
  city: string;
  @Prop()
  street: string;
  @Prop()
  apartment: string;
  @Prop()
  phoneNumber: number;
  @Prop()
  email: string;
}
