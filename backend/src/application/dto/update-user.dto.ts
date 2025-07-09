import { IsEmail, IsOptional, MinLength } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @MinLength(1)
  name?: string;

  @IsOptional()
  @IsEmail()
  email?: string;
}
