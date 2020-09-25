import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { Category } from './category.schema';

@Controller('categories')
export class CategoriesController {

  constructor(private categoriesService: CategoriesService) {}

  @Get()
  getCategories(): Promise<Category[]> {
    return this.categoriesService.getCategories();
  }

  @Get(':slug')
  getCategoryBySlug(@Param('slug') slug: string): Promise<Category> {
    return this.categoriesService.getCategoryBySlug(slug);
  }

  @Post('insert')
  async createCategory(@Body() category: Category): Promise<Category> {
    return this.categoriesService.createCategory(category);
  }
}
