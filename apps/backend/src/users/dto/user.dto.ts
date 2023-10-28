import { IsNotEmpty, IsEmail } from 'class-validator';
import { IUserBiometrics } from '../interfaces/biometrics.interface';
import { IUserEducation } from '../interfaces/education.interface';
import { IUserMilitary } from '../interfaces/military.interface';
import { IUserJob } from '../interfaces/job.interface';

export class UserDto {
  @IsNotEmpty() // Значение не может быть пустым
  id: string;

  @IsNotEmpty()
  username: string;

  status: string;

  role: string;

  biometrics: IUserBiometrics;

  education: IUserEducation;

  military: IUserMilitary;

  job: IUserJob;
}
