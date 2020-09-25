import { Module } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';
import { CategorySchema, Category } from './category.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forFeature([
    { name: Category.name, schema: CategorySchema }
  ])],
  controllers: [CategoriesController],
  providers: [CategoriesService]
})
export class CategoriesModule {}
