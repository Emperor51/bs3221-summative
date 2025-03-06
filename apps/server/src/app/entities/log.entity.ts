import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Log {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: string;

  @Column()
  entryTime: Date;

  @Column()
  exitTime: Date;

  @Column()
  location: string;

}