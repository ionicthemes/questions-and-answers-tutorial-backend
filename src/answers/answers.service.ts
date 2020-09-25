import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Model } from 'mongoose';
import { Answer } from './answer.schema';
import { InjectModel } from '@nestjs/mongoose';
import { VoteAnswerDto } from './dtos/voteAnswer.dto';

@Injectable()
export class AnswersService {

  constructor(
    @InjectModel(Answer.name) private answerModel: Model<Answer>
  ) {}

  async getAnswers(): Promise<Answer[]> {
    return await this.answerModel.find();
  }

  async getAnswersByQuestion(questionId: string): Promise<Answer[]> {
    return await this.answerModel.find({ questionId: questionId });
  }

  async getAnswersCountByQuestion(questionId: string): Promise<number> {
    return await this.answerModel.countDocuments({ questionId: questionId });
  }

  async createAnswer(answer: Answer): Promise<Answer> {
    return await this.answerModel.create(answer);
  }

  async updateAnswer(answer: Answer): Promise<Answer> {
    return await this.answerModel.updateOne({ _id: answer._id}, answer);
  }

  async deleteAnswer(answerId: string) {
    return await this.answerModel.deleteOne({ _id: answerId});
  }

  async vote(voteDto: VoteAnswerDto) {
    const answer = await this.answerModel.findById(voteDto.answerId);
    if (answer) {
      if (voteDto.vote == 1) {
        answer.positiveVotes ++;
      } else if (voteDto.vote == -1) {
        answer.negativeVotes ++;
      }
      await this.answerModel.updateOne({ _id: answer._id}, answer);
      return { status: HttpStatus.OK, message: "Answer voted successfully" };
    } else {
      throw new HttpException('Answer does not exist', HttpStatus.BAD_REQUEST);
    }
  }
}
