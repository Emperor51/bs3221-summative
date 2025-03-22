import { IsEmail, IsNumber, IsOptional, IsString } from 'class-validator';
import { Role } from '../entities/role.entity';

export class UpdateUserReqDto {
  @IsString()
  @IsOptional()
  firstName: string;
  @IsString()
  @IsOptional()
  lastName: string;
  @IsEmail()
  @IsOptional()
  email: string;
  @IsNumber()
  @IsOptional()
  roleId: number;

  role: Role;
}