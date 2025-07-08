import { IsEmail, IsNotEmpty, MinLength, Matches } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;

  @MinLength(8)
  @Matches(/[^A-Za-z0-9]/, { message: 'password must contain at least one special character' })
  password: string;
}
