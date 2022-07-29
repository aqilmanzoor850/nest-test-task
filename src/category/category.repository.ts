import { EntityRepository, Repository } from 'typeorm';
import { CategoryDto } from './category.dto';
import { Category } from './category.entity';

@EntityRepository(Category)
export class CategoryRepository extends Repository<Category> {
  async createCategory(categoryDto: CategoryDto): Promise<Category> {
    const { name } = categoryDto;
    const category = this.create({ name });
    await this.save(category);
    return category;
  }
}
