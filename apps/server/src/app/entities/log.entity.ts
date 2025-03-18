import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import { Location } from './location.entity';
import { User } from './user.entity';

@Entity()
export class Log {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.logs, { eager: true }) // ✅ Establish user relationship
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column({ type: 'timestamp' })
  @IsString()
  entryTime: Date;

  @Column({ type: 'timestamp', nullable: true })
  @IsString()
  @IsOptional()
  exitTime: Date;

  // ✅ Correct Many-to-One Relationship
  @ManyToOne(() => Location, (location) => location.logs, { eager: true })
  @JoinColumn({ name: 'locationId' })
  @IsNumber()
  location: Location;
}
