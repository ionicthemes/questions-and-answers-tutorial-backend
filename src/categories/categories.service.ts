import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Category } from './category.schema';
import { Model } from 'mongoose';

@Injectable()
export class CategoriesService {

  constructor(
    @InjectModel(Category.name) private categoryModel: Model<Category>
  ) {}

  async getCategories(): Promise<Category[]> {
    return await this.categoryModel.find();
  }

  async getCategoryBySlug(slug: string): Promise<Category> {
    return await this.categoryModel.findOne({ slug: slug });
  }

  async createCategory(category: Category): Promise<Category> {
    return await this.categoryModel.create(category);
  }

}
