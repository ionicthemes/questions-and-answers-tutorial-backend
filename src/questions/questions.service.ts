import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Question } from './question.schema';
import { Category } from '../categories/category.schema';
import { AnswersService } from '../answers/answers.service';
import { forkJoin } from 'rxjs';
import { QuestionByCategoryDto } from './dtos/questionByCategory.dto';
import { VoteQuestionDto } from './dtos/voteQuestion.dto';

@Injectable()
export class QuestionsService {

  constructor(
    @InjectModel(Question.name) private questionModel: Model<Question>,
    @InjectModel(Category.name) private categoryModel: Model<Category>,
    private answersService: AnswersService
  ) {}

  async getQuestions(): Promise<Question[]> {
    return await this.questionModel.find();
  }

  async getQuestionById(id: string): Promise<Question> {
    return await this.questionModel.findOne({_id: id});
  }

  async getQuestionsByCategory(categorySlug: string): Promise<QuestionByCategoryDto[]> {
    const category = await this.categoryModel.findOne({ slug: categorySlug });
    const questions = await this.questionModel.find({ categoryId: category._id.toString() });

    const res = questions.map(async question => {
      const answersCount = await this.answersService.getAnswersCountByQuestion(question._id.toString());
      return new QuestionByCategoryDto(question, answersCount);
    });

    return forkJoin(res).toPromise();
  }

  async createQuestion(question: Question): Promise<Question> {
    return await this.questionModel.create(question);
  }

  async deleteQuestion(questionId: string) {
    return await this.questionModel.deleteOne({ _id: questionId});
  }

  async updateQuestion(question: Question) {
    return await this.questionModel.updateOne(question._id, question);
  }

  async vote(voteDto: VoteQuestionDto) {
    const question = await this.questionModel.findById(voteDto.questionId);

    if (question) {
      if (voteDto.vote == 1) {
        question.positiveVotes ++;
      } else if (voteDto.vote == -1) {
        question.negativeVotes ++;
      }
      await this.questionModel.updateOne({ _id: question._id}, question);
      return { status: HttpStatus.OK, message: "Question voted successfully" };
    } else {
      throw new HttpException('Qestion does not exist', HttpStatus.BAD_REQUEST);
    }
  }
}
