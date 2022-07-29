import { TaskStatus } from '../task-status.enum';
import { IsNotEmpty, IsEnum } from 'class-validator';

export class getTaskFilterDto {
  @IsEnum(TaskStatus)
  status?: TaskStatus;
  @IsNotEmpty()
  search?: string;
}
