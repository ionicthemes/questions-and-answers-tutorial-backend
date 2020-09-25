import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { TerminusModule } from '@nestjs/terminus';

import { QuestionsModule } from './questions/questions.module';
import { CategoriesModule } from './categories/categories.module';
import { AnswersModule } from './answers/answers.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true //https://docs.nestjs.com/techniques/configuration#use-module-globally
    }),
    MongooseModule.forRoot(process.env.DB_CONNECTION_STRING, {
      useNewUrlParser: true,
      useCreateIndex: true
    }),
    TerminusModule,
    QuestionsModule,
    AnswersModule,
    CategoriesModule
  ]
})
export class AppModule {}
