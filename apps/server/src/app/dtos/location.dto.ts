import { IsNumber, IsOptional, IsString } from 'class-validator';

export class LocationDto {

  @IsNumber()
  location: number

  @IsString()
  entryTime: Date

  @IsString()
  @IsOptional()
  exitTime: Date
}