import { IsNotEmpty, IsString } from 'class-validator';

export class CategoryDto {
  id?: string;
  @IsNotEmpty()
  @IsString()
  name?: string;
}
