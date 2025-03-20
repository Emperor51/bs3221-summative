import { PrimaryGeneratedColumn, Column, Entity, OneToMany } from 'typeorm';
import { IsOptional, IsString } from 'class-validator';
import { Log } from './log.entity';

@Entity()
export class Location {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  @IsString()
  name: string;

  @Column({ nullable: true })
  @IsString()
  @IsOptional()
  building: string;

  @OneToMany(() => Log, (log) => log.location)
  logs: Log[];
}
