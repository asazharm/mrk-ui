import { IsNotEmpty, IsEmail } from 'class-validator';


export class CreateUserDto {
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  firstname: string;

  @IsNotEmpty()
  lastname: string;

  @IsNotEmpty()
  status: string;

  @IsNotEmpty()
  role: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

}
