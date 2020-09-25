import { Module } from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { QuestionsController } from './questions.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { QuestionSchema, Question } from './question.schema';
import { CategorySchema, Category } from 'src/categories/category.schema';
import { AnswersModule } from 'src/answers/answers.module';

@Module({
  imports: [
    MongooseModule.forFeature([
    { name: Question.name, schema: QuestionSchema },
    { name: Category.name, schema: CategorySchema },
    ]),
    AnswersModule
  ],
  controllers: [QuestionsController],
  providers: [QuestionsService]
})
export class QuestionsModule {}
