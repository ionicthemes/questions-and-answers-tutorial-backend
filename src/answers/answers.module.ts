import { Module } from '@nestjs/common';
import { AnswersController } from './answers.controller';
import { AnswersService } from './answers.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Answer, AnswerSchema } from './answer.schema';

@Module({
  imports: [MongooseModule.forFeature([
    { name: Answer.name, schema: AnswerSchema },
  ])],
  exports: [
    AnswersService
  ],
  controllers: [AnswersController],
  providers: [AnswersService]
})
export class AnswersModule {}
