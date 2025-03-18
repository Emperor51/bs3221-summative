import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class RefreshToken {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  hashedToken: string; // Store hashed refresh token

  @ManyToOne(() => User, (user) => user.refreshTokens, { onDelete: 'CASCADE' })
  user: User;

  @Column()
  ipAddress: string; // Store IP address of login

  @Column()
  userAgent: string; // Store device information

  @CreateDateColumn()
  createdAt: Date;

  @Column()
  expiresAt: Date; // Expiration timestamp
}
