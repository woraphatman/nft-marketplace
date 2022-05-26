
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Column, PrimaryColumn } from 'typeorm';
export type UserDocument = User & Document;

@Schema()
export class User {
  @PrimaryColumn('uuid')
  id: string;

  @Column()
  username: string;

  @Column()
  password: string;
}
export const UserSchema = SchemaFactory.createForClass(User);