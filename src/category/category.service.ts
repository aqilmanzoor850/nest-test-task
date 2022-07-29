import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryDto } from './category.dto';
import { Category } from './category.entity';
import { CategoryRepository } from './category.repository';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(CategoryRepository)
    private categoryRepository: CategoryRepository,
  ) {}

  createCategory(categoryDto: CategoryDto): Promise<Category> {
    return this.categoryRepository.createCategory(categoryDto);
  }
  async getCategory(): Promise<Category[]> {
    return await this.categoryRepository
      .createQueryBuilder('category')
      .innerJoinAndSelect('category.tasks', 'tasks')
      .getMany();
  }
}
