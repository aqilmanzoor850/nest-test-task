import { IsNotEmpty } from 'class-validator';
import { CategoryDto } from 'src/category/category.dto';

export class CreateTaskDTO {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  category: CategoryDto;
}
