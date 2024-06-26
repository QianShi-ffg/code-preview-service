import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { User } from '../../user/entities/user.entity';

@Entity()
export class Demo {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column()
  name: string;

  @Column({ type: 'longtext', nullable: true })
  html: string;

  @Column({ type: 'longtext', nullable: true })
  css: string;

  @Column({ type: 'longtext', nullable: true })
  javascript: string;

  @Column({ nullable: true })
  htmlLanguage: string;

  @Column({ nullable: true })
  cssLanguage: string;

  @Column({ nullable: true })
  jsLanguage: string;

  @Column({ nullable: true })
  description: string;

  @CreateDateColumn({ type: 'timestamp', nullable: true })
  createTime: Date;

  @UpdateDateColumn({ type: 'timestamp', nullable: true })
  updataTime: Date;

  @ManyToOne(() => User, (user) => user.id)
  user: User;
}
