import { IsAlpha, IsEmail, IsNotEmpty, IsNumberString } from 'class-validator';

export class CreateUserDto {
  @IsAlpha()
  first_name: string;

  @IsAlpha()
  last_name: string;

  @IsNumberString()
  phone: string;

  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  password: string;

  @IsEmail()
  email: string;
}