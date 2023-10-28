import { IUserBiometrics } from './biometrics.interface';
import { IUserEducation } from './education.interface';
import { IUserJob } from './job.interface';
import { IUserMilitary } from './military.interface';

export interface IUser {
  username: string;

  status: string;

  role: string;

  password: string;

  biometrics?: IUserBiometrics;

  education?: IUserEducation;

  military?: IUserMilitary;

  job?: IUserJob;
}
