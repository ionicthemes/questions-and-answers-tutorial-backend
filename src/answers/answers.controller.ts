import { Controller, Body, Post, Get, Delete, Put, Param } from '@nestjs/common';
import { AnswersService } from './answers.service';
import { Answer } from './answer.schema';
import { VoteAnswerDto } from './dtos/voteAnswer.dto';

@Controller('answers')
export class AnswersController {

  constructor(private answersService: AnswersService) {}

  @Get()
  getAnswers(): Promise<Answer[]> {
    return this.answersService.getAnswers();
  }

  @Get(':questionId')
  getAnswersByQuestion(@Param('questionId') questionId: string): Promise<Answer[]> {
    return this.answersService.getAnswersByQuestion(questionId);
  }

  @Post('insert')
  createAnswer(@Body() answer: Answer): Promise<Answer> {
    return this.answersService.createAnswer(answer);
  }

  @Post('update')
  updateAnswer(@Body() answer: Answer): Promise<Answer> {
    return this.answersService.updateAnswer(answer);
  }

  @Post('vote')
  vote(@Body() voteDto: VoteAnswerDto) {
    return this.answersService.vote(voteDto);
  }

  @Delete(':answerId')
  deleteQuestion(@Param('answerId') answerId: string) {
    return this.answersService.deleteAnswer(answerId);
  }
}
