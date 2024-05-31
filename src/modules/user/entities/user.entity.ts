import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { Demo } from '../../demo/entities/demo.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column()
  userName: string;

  @Column()
  passWord: string;

  @CreateDateColumn({ type: 'timestamp', nullable: true })
  createTime: Date;

  @UpdateDateColumn({ type: 'timestamp', nullable: true })
  updataTime: Date;

  @OneToMany(() => Demo, (demo) => demo.id)
  demos: Demo[];
}
