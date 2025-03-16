import { PrimaryGeneratedColumn, Column, Entity } from "typeorm";
import { IsOptional, IsString } from 'class-validator';

@Entity()
export class Location {
  @PrimaryGeneratedColumn()
  id: number

  @Column({
    unique: true
  })
  @IsString()
  name: string

  @Column({
    nullable: true
  })
  @IsString()
  @IsOptional()
  building: string

}
