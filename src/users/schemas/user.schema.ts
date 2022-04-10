import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({immutable: true, required: true})
  username: string;

  @Prop({required: true})
  password: string;

  @Prop({required: true})
  email: string;

  @Prop({immutable: true})
  id: string;

  @Prop()
  first_name: string;

  @Prop()
  last_name: string;

  @Prop()
  phone: string;
}

export const UserSchema = SchemaFactory.createForClass(User);