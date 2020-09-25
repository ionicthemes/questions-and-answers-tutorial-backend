import { Controller, Post, Body, Get, Delete, Param, Put } from "@nestjs/common";
import { QuestionsService } from "./questions.service";
import { Question } from "./question.schema";
import { QuestionByCategoryDto } from "./dtos/questionByCategory.dto";
import { VoteQuestionDto } from "./dtos/voteQuestion.dto";

@Controller('questions')
export class QuestionsController {

  constructor(
    private questionsService: QuestionsService
  ) {}

  @Get()
  getQuestions(): Promise<Question[]> {
    return this.questionsService.getQuestions();
  }

  @Get(':id')
  getQuestionById(@Param('id') id: string): Promise<Question> {
    return this.questionsService.getQuestionById(id);
  }

  @Get('by-category/:categorySlug')
  getQuestionsByCategory(@Param('categorySlug') categorySlug: string): Promise<QuestionByCategoryDto[]> {
    return this.questionsService.getQuestionsByCategory(categorySlug);
  }

  @Put('update')
  updateAnswer(@Body() question: Question) {
    return this.questionsService.updateQuestion(question);
  }

  @Post('insert')
  createQuestion(@Body() question: Question): Promise<Question> {
    return this.questionsService.createQuestion(question);
  }
  
  @Delete(':questionId')
  deleteQuestion(@Param('questionId') questionId: string) {
    return this.questionsService.deleteQuestion(questionId);
  }

  @Post('vote')
  vote(@Body() voteDto: VoteQuestionDto){
    return this.questionsService.vote(voteDto);
  }
}
