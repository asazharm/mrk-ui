import { Schema, Prop } from '@nestjs/mongoose';
import { IUserJob } from '../interfaces/job.interface';
import { Document } from 'mongoose';

@Schema()
export class Job extends Document implements IUserJob {
  @Prop()
  jobAcceptedDate: string;
  @Prop()
  jobReleaseDate: string;
  @Prop()
  division: string;
  @Prop()
  position: string;
  @Prop()
  profession: string;
  @Prop()
  workBrochureNumber: string;
  @Prop()
  civilServantCode: string;
  @Prop()
  admissionOrderNumber: string;
  @Prop()
  receivedOrderDate: string;
  @Prop()
  releaseOrderNumber: string;
  @Prop()
  releaseOrderDate: string;
  @Prop()
  contractNumber: string;
  @Prop()
  contractStartDate: string;
  @Prop()
  contractEndDate: string;
  @Prop()
  contractName: string;
}
