import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getTaskFilterDto } from './dto/get-task-filter.dto';
import { CreateTaskDTO } from './dto/task.dto';
import { TaskStatus } from './task-status.enum';
import { Task } from './tasks.entity';
import { TasksRepository } from './task.repository';
import { User } from 'src/auth/user.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TasksRepository)
    private readonly taskRepository: TasksRepository,
  ) {}

  async getTaskById(id: string, user: User): Promise<Task> {
    // const found = await this.taskRepository.findOne({ id });
    const found = await this.taskRepository.findOne({ id, user });
    if (!found) {
      throw new NotFoundException();
    }
    return found;
  }

  getTasks(filterDto: getTaskFilterDto, user: User): Promise<Task[]> {
    return this.taskRepository.getTasks(filterDto, user);
  }
  createTask(createTaskDTO: CreateTaskDTO, user: User): Promise<Task> {
    return this.taskRepository.createTask(createTaskDTO, user);
  }
  async deleteTask(id: string, user: User): Promise<void> {
    const result = await this.taskRepository.delete({ id, user });
    if (result.affected === 0) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
  }
  async updateTask(id: string, status: TaskStatus, user: User): Promise<Task> {
    const task = await this.getTaskById(id, user);
    task.status = status;
    await this.taskRepository.save(task);
    return task;
  }
}
