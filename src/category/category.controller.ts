import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CategoryDto } from './category.dto';
import { CategoryService } from './category.service';

@UseGuards(AuthGuard())
@Controller('category')
export class CategoryController {
  constructor(private categorySerice: CategoryService) {}

  @Post()
  createCategory(@Body() categoryDto: CategoryDto) {
    this.categorySerice.createCategory(categoryDto);
  }

  @Get()
  getCategory() {
    return this.categorySerice.getCategory();
  }
}
