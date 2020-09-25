import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Question extends Document {
  @Prop()
  slug: string;

  @Prop()
  title: string;

  @Prop()
  description: string;

  @Prop()
  categoryId: string;

  @Prop({default: 0})
  positiveVotes: number;

  @Prop({default: 0})
  negativeVotes: number;

  @Prop({default: Date.now})
  createdDate: Date;
}

export const QuestionSchema = SchemaFactory.createForClass(Question);
