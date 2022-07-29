import { Category } from 'src/category/category.entity';
import { Task } from 'src/tasks/tasks.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ unique: true })
  username: string;
  @Column()
  password: string;
  @OneToMany(() => Task, (task) => task.user, { eager: true })
  task: Task[];
  // @OneToMany(() => Category, (caterory) => caterory.user, { eager: true })
  // caterory: Category[];
}
