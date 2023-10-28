import { IsNotEmpty } from 'class-validator';

export class CreateVacationDto {
  @IsNotEmpty()
  orderDate: string;

  @IsNotEmpty()
  orderNumber: string;

  @IsNotEmpty()
  vacationType: string;

  @IsNotEmpty()
  workingYear: string;

  @IsNotEmpty()
  vacationPeriod: string;

  @IsNotEmpty()
  username: string;
}
