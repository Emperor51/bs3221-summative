import { Entity, Column, PrimaryColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { Role } from './role.entity';
import { IsBoolean, IsEmail, IsNumber, IsOptional, IsString } from 'class-validator';
import { RefreshToken } from './refresh_token.entity';
import { Log } from './log.entity';

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

  @OneToMany(() => RefreshToken, (refreshToken) => refreshToken.user)
  refreshTokens: RefreshToken[];

  @OneToMany(() => Log, (log) => log.user)
  logs: Log[];
}
