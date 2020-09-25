import { Question } from "../question.schema";

export class QuestionByCategoryDto {
  _id: string;
  slug: string;
  title: string;
  description: string;
  positiveVotes: number;
  negativeVotes: number;
  createdDate: Date;
  answersCount: number;

  constructor(question: Question, answersCount: number) {
    this._id = question._id;
    this.slug = question.slug;
    this.title = question.title;
    this.description = question.description;
    this.positiveVotes = question.positiveVotes;
    this.negativeVotes = question.negativeVotes;
    this.createdDate = question.createdDate;
    this.answersCount = answersCount;
  }
}
