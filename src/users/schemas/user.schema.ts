import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ required: true })
  nome: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop()
  rua: string;

  @Prop()
  bairro: string;

  @Prop()
  numero: string;

  @Prop()
  cidade: string;

  @Prop()
  estado: string;

  @Prop()
  cep: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
