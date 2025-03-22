import { IsNumber, IsString } from 'class-validator';

export class UpdatePasswordDto {
  @IsNumber()
  userId: number;

  @IsString()
  password: string;
}