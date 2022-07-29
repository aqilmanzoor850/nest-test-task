import { Exclude } from 'class-transformer';
import { User } from 'src/auth/user.entity';
import { Category } from 'src/category/category.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TaskStatus } from './task-status.enum';

@Entity()
export class Task {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  status: TaskStatus;

  @ManyToOne(() => User, (user) => user.task, { eager: false })
  @Exclude({ toPlainOnly: true })
  user: User;

  @ManyToMany(() => Category, (category) => category.tasks)
  @JoinTable()
  category: Category[];
}
