import { IsNotEmpty } from 'class-validator';

export class CreateVacationDto {
  orderDate: string;

  orderNumber: string;

  @IsNotEmpty()
  vacationType: string;

  @IsNotEmpty()
  workingYear: string;

  @IsNotEmpty()
  vacationPeriod: string;
}
