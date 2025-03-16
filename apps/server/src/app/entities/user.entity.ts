import { Entity, Column, PrimaryColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Role } from './role.entity';
import { IsBoolean, IsEmail, IsNumber, IsOptional, IsString } from 'class-validator';

@Entity()
export class User {
  @PrimaryColumn()
  @IsNumber()
  id: number;

  @Column({ unique: true })
  @IsEmail()
  email: string;

  @Column()
  @IsString()
  firstName: string;

  @Column()
  @IsString()
  lastName: string;

  @Column({ default: true })
  @IsBoolean()
  @IsOptional()
  active: boolean;

  @Column()
  @IsString()
  password: string;

  @ManyToOne(() => Role, { eager: true }) // Automatically fetch role when querying users
  @JoinColumn({ name: 'roleId' })
  @IsNumber()
  role: Role;
}
