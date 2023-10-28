import { IsNotEmpty } from 'class-validator';

export class UpdateVacationDto {
  @IsNotEmpty()
  orderNumber: string;

  @IsNotEmpty()
  username: string;

  data: string;
  // {
  //   orderNumber: string;

  //   orderDate: string;

  //   vacationType: string;

  //   workingYear: string;

  //   vacationPeriod: string;
  // };
}
