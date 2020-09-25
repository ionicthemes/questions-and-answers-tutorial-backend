import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Answer extends Document {
  @Prop()
  answer: string;

  @Prop()
  questionId: string;

  @Prop({default: 0})
  positiveVotes: number;

  @Prop({default: 0})
  negativeVotes: number;

  @Prop({default: Date.now})
  createdDate: Date;
}

export const AnswerSchema = SchemaFactory.createForClass(Answer);
